#!/usr/bin/env node
'use strict';
const fs = require('fs');

function main() {
  const inPath = process.argv[2];
  const outPath = process.argv[3];
  if (!inPath || !outPath) throw new Error('usage: analyze.js <input.json> <output.json>');
  const data = JSON.parse(fs.readFileSync(inPath, 'utf8'));
  const nodes = data.nodes || [];
  const edges = data.edges || [];
  const layers = data.layers || [];

  const byId = new Map(nodes.map(n => [n.id, n]));
  const known = e => byId.has(e.source) && byId.has(e.target);

  const fanIn = new Map(), fanOut = new Map();
  nodes.forEach(n => { fanIn.set(n.id, 0); fanOut.set(n.id, 0); });
  edges.filter(known).forEach(e => {
    fanIn.set(e.target, fanIn.get(e.target) + 1);
    fanOut.set(e.source, fanOut.get(e.source) + 1);
  });

  const rank = (m, key) => nodes.map(n => ({ id: n.id, [key]: m.get(n.id), name: n.name }))
    .sort((a, b) => b[key] - a[key]).slice(0, 20);
  const fanInRanking = rank(fanIn, 'fanIn');
  const fanOutRanking = rank(fanOut, 'fanOut');

  // C. Entry point candidates
  const ENTRY = new Set(['index.ts','index.js','main.ts','main.js','app.ts','app.js','server.ts','server.js','mod.rs','main.go','main.py','main.rs','manage.py','app.py','wsgi.py','asgi.py','run.py','__main__.py','Application.java','Main.java','Program.cs','config.ru','index.php','App.swift','Application.kt','main.cpp','main.c',
    // Next.js App Router equivalents
    'page.tsx','layout.tsx','page.ts','layout.ts']);
  const foSorted = [...fanOut.values()].sort((a, b) => b - a);
  const fiSorted = [...fanIn.values()].sort((a, b) => a - b);
  const foTop10 = foSorted[Math.max(0, Math.floor(foSorted.length * 0.1) - 1)] || 0;
  const fiBot25 = fiSorted[Math.max(0, Math.floor(fiSorted.length * 0.25) - 1)] || 0;

  const candidates = nodes.map(n => {
    const p = (n.filePath || '').replace(/\\/g, '/');
    const depth = p.split('/').length;
    let score = 0;
    if (n.type === 'document') {
      if (/^README\.md$/i.test(p)) score += 5;
      else if (/^[^/]+\.md$/i.test(p)) score += 2;
    } else {
      if (ENTRY.has(n.name)) score += 3;
      if (depth <= 2) score += 1;
      // App Router: src/app/page.tsx is the real home entry
      if (/^src\/app\/page\.(tsx|ts|jsx|js)$/.test(p)) score += 3;
      if (/^src\/app\/layout\.(tsx|ts|jsx|js)$/.test(p)) score += 2;
      if (fanOut.get(n.id) >= foTop10) score += 1;
      if (fanIn.get(n.id) <= fiBot25) score += 1;
    }
    return { id: n.id, score, name: n.name, type: n.type, summary: n.summary };
  }).filter(c => c.score > 0).sort((a, b) => b.score - a.score);
  const entryPointCandidates = candidates.slice(0, 5);

  // D. BFS from top code entry point
  const adj = new Map(nodes.map(n => [n.id, []]));
  edges.filter(known).filter(e => e.type === 'imports' || e.type === 'calls').forEach(e => {
    adj.get(e.source).push(e.target);
  });
  const startNode = (candidates.find(c => c.type !== 'document') || candidates[0] || nodes[0]).id;
  const depthMap = { [startNode]: 0 };
  const order = [startNode];
  const queue = [startNode];
  while (queue.length) {
    const cur = queue.shift();
    for (const nx of adj.get(cur) || []) {
      if (!(nx in depthMap)) {
        depthMap[nx] = depthMap[cur] + 1;
        order.push(nx);
        queue.push(nx);
      }
    }
  }
  const byDepth = {};
  for (const [id, d] of Object.entries(depthMap)) (byDepth[d] = byDepth[d] || []).push(id);
  const unreached = nodes.map(n => n.id).filter(id => !(id in depthMap));

  // E. Non-code inventory
  const bucket = { documentation: ['document'], infrastructure: ['service','pipeline','resource'], data: ['table','schema','endpoint'], config: ['config'] };
  const nonCodeFiles = {};
  for (const [k, types] of Object.entries(bucket)) {
    nonCodeFiles[k] = nodes.filter(n => types.includes(n.type))
      .map(n => ({ id: n.id, name: n.name, type: n.type, summary: n.summary }));
  }
  // Non-code-ish files by extension (css/config/mjs) — useful extra signal
  nonCodeFiles.stylingAndBuild = nodes.filter(n => /\.(css|mjs|json)$|tailwind\.config|tsconfig|next-env/.test(n.filePath || ''))
    .map(n => ({ id: n.id, name: n.name, type: n.type, summary: n.summary }));

  // F. Clusters
  const pairKey = (a, b) => [a, b].sort().join('||');
  const pairCount = new Map();
  edges.filter(known).filter(e => e.source !== e.target).forEach(e => {
    const k = pairKey(e.source, e.target);
    pairCount.set(k, (pairCount.get(k) || 0) + 1);
  });
  const undirected = new Map(nodes.map(n => [n.id, new Set()]));
  edges.filter(known).forEach(e => {
    if (e.source === e.target) return;
    undirected.get(e.source).add(e.target);
    undirected.get(e.target).add(e.source);
  });
  const seeds = [...pairCount.entries()].filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1]).map(([k]) => k.split('||'));
  const clusters = [];
  const used = new Set();
  for (const seed of seeds) {
    if (seed.some(id => used.has(id))) continue;
    const cl = new Set(seed);
    let grew = true;
    while (grew && cl.size < 5) {
      grew = false;
      for (const n of nodes) {
        if (cl.has(n.id) || cl.size >= 5) continue;
        let links = 0;
        for (const m of cl) if (undirected.get(n.id).has(m)) links++;
        if (links >= 2) { cl.add(n.id); grew = true; }
      }
    }
    const ids = [...cl];
    let edgeCount = 0;
    edges.filter(known).forEach(e => { if (cl.has(e.source) && cl.has(e.target)) edgeCount++; });
    ids.forEach(id => used.add(id));
    clusters.push({ nodes: ids, edgeCount });
    if (clusters.length >= 10) break;
  }
  clusters.sort((a, b) => b.edgeCount - a.edgeCount);

  // H. summary index
  const nodeSummaryIndex = {};
  nodes.forEach(n => { nodeSummaryIndex[n.id] = { name: n.name, type: n.type, filePath: n.filePath, summary: n.summary }; });

  const edgeTypeCounts = {};
  edges.forEach(e => { edgeTypeCounts[e.type] = (edgeTypeCounts[e.type] || 0) + 1; });

  const out = {
    scriptCompleted: true,
    entryPointCandidates,
    fanInRanking,
    fanOutRanking,
    bfsTraversal: { startNode, order, depthMap, byDepth, unreached },
    nonCodeFiles,
    clusters,
    layers: { count: layers.length, list: layers },
    nodeSummaryIndex,
    edgeTypeCounts,
    totalNodes: nodes.length,
    totalEdges: edges.length
  };
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('OK nodes=' + nodes.length + ' edges=' + edges.length + ' start=' + startNode);
}

try { main(); } catch (err) { console.error(err.stack || String(err)); process.exit(1); }
