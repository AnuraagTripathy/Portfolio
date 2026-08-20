#!/usr/bin/env node
'use strict';
const fs = require('fs');

function main() {
  const inPath = process.argv[2];
  const outPath = process.argv[3];
  if (!inPath || !outPath) throw new Error('usage: node ua-arch-analyze.js <input.json> <output.json>');
  const input = JSON.parse(fs.readFileSync(inPath, 'utf8'));
  const fileNodes = input.fileNodes || [];
  const importEdges = input.importEdges || [];
  const allEdges = input.allEdges || [];

  const byId = new Map(fileNodes.map(n => [n.id, n]));
  const pathOf = n => (n.filePath || n.name || n.id.split(':').slice(1).join(':')).replace(/\\/g, '/');

  // ---- A. Directory grouping (common prefix aware) ----
  const paths = fileNodes.map(pathOf);
  const dirLists = paths.map(p => p.split('/').slice(0, -1));
  let prefix = [];
  if (dirLists.length) {
    const first = dirLists[0];
    outer: for (let i = 0; i < first.length; i++) {
      for (const d of dirLists) { if (d[i] !== first[i]) break outer; }
      prefix.push(first[i]);
    }
  }
  const prefixLen = prefix.length;
  const directoryGroups = {};
  const groupOf = {};
  for (const n of fileNodes) {
    const p = pathOf(n);
    const segs = p.split('/');
    const dirs = segs.slice(prefixLen, -1);
    let g;
    if (dirs.length === 0) g = '(root)';
    else if (dirs.length === 1) g = dirs[0];
    else g = dirs.slice(0, 2).join('/'); // keep one level of nesting detail
    // collapse deep nesting under first segment as well, tracked separately
    (directoryGroups[g] = directoryGroups[g] || []).push(n.id);
    groupOf[n.id] = g;
  }

  // ---- B. Node type grouping ----
  const nodeTypeGroups = {};
  for (const n of fileNodes) (nodeTypeGroups[n.type] = nodeTypeGroups[n.type] || []).push(n.id);

  // ---- C. Import adjacency ----
  const fileFanIn = {}, fileFanOut = {};
  for (const n of fileNodes) { fileFanIn[n.id] = 0; fileFanOut[n.id] = 0; }
  for (const e of importEdges) {
    if (fileFanOut[e.source] !== undefined) fileFanOut[e.source]++;
    if (fileFanIn[e.target] !== undefined) fileFanIn[e.target]++;
  }

  // ---- D. Cross-category dependency analysis ----
  const ccKey = {};
  for (const e of allEdges) {
    const s = byId.get(e.source), t = byId.get(e.target);
    if (!s || !t) continue;
    if (s.type === t.type) continue;
    const k = `${s.type}|${t.type}|${e.type}`;
    ccKey[k] = (ccKey[k] || 0) + 1;
  }
  const crossCategoryEdges = Object.entries(ccKey).map(([k, count]) => {
    const [fromType, toType, edgeType] = k.split('|');
    return { fromType, toType, edgeType, count };
  }).sort((a, b) => b.count - a.count);

  // ---- E. Inter-group import frequency ----
  const igKey = {};
  const groupTouch = {};
  for (const e of importEdges) {
    const a = groupOf[e.source], b = groupOf[e.target];
    if (!a || !b) continue;
    groupTouch[a] = (groupTouch[a] || 0) + 1;
    if (b !== a) groupTouch[b] = (groupTouch[b] || 0) + 1;
    if (a === b) continue;
    igKey[`${a}|${b}`] = (igKey[`${a}|${b}`] || 0) + 1;
  }
  const interGroupImports = Object.entries(igKey).map(([k, count]) => {
    const [from, to] = k.split('|');
    return { from, to, count };
  }).sort((a, b) => b.count - a.count);

  // ---- F. Intra-group density ----
  const intraGroupDensity = {};
  for (const g of Object.keys(directoryGroups)) {
    let internal = 0, total = 0;
    for (const e of importEdges) {
      const a = groupOf[e.source], b = groupOf[e.target];
      if (a === g && b === g) { internal++; total++; }
      else if (a === g || b === g) total++;
    }
    intraGroupDensity[g] = { internalEdges: internal, totalEdges: total, density: total ? +(internal / total).toFixed(3) : 0 };
  }

  // ---- G. Pattern matching ----
  const DIR_PATTERNS = [
    [['routes', 'api', 'controllers', 'endpoints', 'handlers', 'serializers', 'routers', 'blueprints', 'controller'], 'api'],
    [['services', 'core', 'lib', 'domain', 'logic', 'signals', 'composables', 'mailers', 'jobs', 'channels', 'internal'], 'service'],
    [['models', 'db', 'data', 'persistence', 'repository', 'entities', 'migrations', 'entity'], 'data'],
    [['components', 'views', 'pages', 'ui', 'layouts', 'screens'], 'ui'],
    [['middleware', 'plugins', 'interceptors', 'guards'], 'middleware'],
    [['utils', 'helpers', 'common', 'shared', 'tools', 'templatetags', 'pkg'], 'utility'],
    [['config', 'constants', 'env', 'settings', 'management', 'commands'], 'config'],
    [['__tests__', 'test', 'tests', 'spec', 'specs'], 'test'],
    [['types', 'interfaces', 'schemas', 'contracts', 'dtos', 'dto', 'request', 'response'], 'types'],
    [['hooks'], 'hooks'],
    [['store', 'state', 'reducers', 'actions', 'slices'], 'state'],
    [['assets', 'static', 'public'], 'assets'],
    [['cmd', 'bin'], 'entry'],
    [['docs', 'documentation', 'wiki'], 'documentation'],
    [['deploy', 'deployment', 'infra', 'infrastructure', 'k8s', 'kubernetes', 'helm', 'charts', 'terraform', 'tf', 'docker'], 'infrastructure'],
    [['.github', '.gitlab', '.circleci'], 'ci-cd'],
    [['sql', 'database', 'schema'], 'data'],
    [['content'], 'data'],
    [['motion', 'animations'], 'ui'],
    [['app'], 'ui'],
  ];
  function matchDir(name) {
    const last = name.split('/').pop().toLowerCase();
    for (const [names, label] of DIR_PATTERNS) if (names.includes(last)) return label;
    const first = name.split('/')[0].toLowerCase();
    for (const [names, label] of DIR_PATTERNS) if (names.includes(first)) return label;
    return null;
  }
  const patternMatches = {};
  for (const g of Object.keys(directoryGroups)) patternMatches[g] = matchDir(g);

  // file-level patterns
  const filePatterns = {};
  for (const n of fileNodes) {
    const p = pathOf(n);
    const base = p.split('/').pop();
    let label = null;
    if (/\.(test|spec)\.[jt]sx?$/.test(base) || /^test_.*\.py$/.test(base) || /_test\.go$/.test(base) || /Test\.java$/.test(base) || /_spec\.rb$/.test(base) || /Tests?\.(php|cs)$/.test(base)) label = 'test';
    else if (/\.d\.ts$/.test(base)) label = 'types';
    else if (/^(next|tailwind|postcss|vite|webpack|jest|eslint|babel)\..*config\..*$/.test(base) || /^\.eslintrc/.test(base)) label = 'config';
    else if (['package.json', 'tsconfig.json', 'Cargo.toml', 'go.mod', 'Gemfile', 'pom.xml', 'build.gradle', 'composer.json'].includes(base)) label = 'config';
    else if (/^(Dockerfile|docker-compose)/.test(base) || /\.tf(vars)?$/.test(base) || base === 'Makefile') label = 'infrastructure';
    else if (/^(\.gitlab-ci\.yml|Jenkinsfile)$/.test(base) || /^\.github\/workflows\//.test(p)) label = 'ci-cd';
    else if (/\.sql$/.test(base)) label = 'data';
    else if (/\.(graphql|gql|proto)$/.test(base)) label = 'types';
    else if (/\.(md|rst)$/.test(base)) label = 'documentation';
    else if (/\.(css|scss|sass|less)$/.test(base)) label = 'styling';
    else if (/^(layout|template)\.[jt]sx$/.test(base)) label = 'shell';
    else if (/^page\.[jt]sx$/.test(base)) label = 'route-page';
    else if (['index.ts', 'index.js', '__init__.py'].includes(base)) label = 'entry';
    if (label) filePatterns[n.id] = label;
  }

  // ---- H. Deployment topology ----
  const infraFiles = [];
  let hasDockerfile = false, hasCompose = false, hasK8s = false, hasTerraform = false, hasCI = false;
  for (const n of fileNodes) {
    const p = pathOf(n), b = p.split('/').pop();
    if (/^Dockerfile/.test(b)) { hasDockerfile = true; infraFiles.push(p); }
    else if (/^docker-compose/.test(b)) { hasCompose = true; infraFiles.push(p); }
    else if (/\.tf(vars)?$/.test(b)) { hasTerraform = true; infraFiles.push(p); }
    else if (/(^|\/)(k8s|kubernetes|helm|charts)\//.test(p)) { hasK8s = true; infraFiles.push(p); }
    else if (/^\.github\/workflows\//.test(p) || /^(\.gitlab-ci\.yml|Jenkinsfile)$/.test(b)) { hasCI = true; infraFiles.push(p); }
  }

  // ---- I. Data pipeline ----
  const dataPipeline = { schemaFiles: [], migrationFiles: [], dataModelFiles: [], apiHandlerFiles: [] };
  for (const n of fileNodes) {
    const p = pathOf(n);
    const tags = (n.tags || []).map(t => t.toLowerCase());
    if (/\.(sql|graphql|gql|proto|prisma)$/.test(p)) dataPipeline.schemaFiles.push(p);
    if (/migrations?\//.test(p)) dataPipeline.migrationFiles.push(p);
    if (tags.includes('data-model') || tags.includes('static-data') || /(^|\/)(models|content|data)\//.test(p)) dataPipeline.dataModelFiles.push(p);
    if (tags.includes('api-handler') || /(^|\/)(routes|api)\//.test(p) || /route\.[jt]s$/.test(p)) dataPipeline.apiHandlerFiles.push(p);
  }

  // ---- J. Documentation coverage ----
  const docFiles = fileNodes.filter(n => /\.(md|rst)$/i.test(pathOf(n))).map(pathOf);
  const groupsWithDocs = new Set();
  for (const d of docFiles) {
    const segs = d.split('/');
    const dirs = segs.slice(prefixLen, -1);
    groupsWithDocs.add(dirs.length ? dirs.slice(0, 2).join('/') : '(root)');
  }
  const totalGroups = Object.keys(directoryGroups).length;
  const docCoverage = {
    groupsWithDocs: groupsWithDocs.size,
    totalGroups,
    coverageRatio: totalGroups ? +(groupsWithDocs.size / totalGroups).toFixed(2) : 0,
    undocumentedGroups: Object.keys(directoryGroups).filter(g => !groupsWithDocs.has(g)),
  };

  // ---- K. Dependency direction ----
  const seen = new Set();
  const dependencyDirection = [];
  for (const { from, to, count } of interGroupImports) {
    const key = [from, to].sort().join('|');
    if (seen.has(key)) continue;
    seen.add(key);
    const rev = igKey[`${to}|${from}`] || 0;
    if (count > rev) dependencyDirection.push({ dependent: from, dependsOn: to, count, reverseCount: rev });
    else if (rev > count) dependencyDirection.push({ dependent: to, dependsOn: from, count: rev, reverseCount: count });
    else dependencyDirection.push({ dependent: from, dependsOn: to, count, reverseCount: rev, bidirectional: true });
  }

  const filesPerGroup = {}, nodeTypeCounts = {};
  for (const [g, arr] of Object.entries(directoryGroups)) filesPerGroup[g] = arr.length;
  for (const [t, arr] of Object.entries(nodeTypeGroups)) nodeTypeCounts[t] = arr.length;

  const out = {
    scriptCompleted: true,
    commonPrefix: prefix.join('/'),
    directoryGroups,
    nodeTypeGroups,
    crossCategoryEdges,
    interGroupImports,
    intraGroupDensity,
    patternMatches,
    filePatterns,
    deploymentTopology: { hasDockerfile, hasCompose, hasK8s, hasTerraform, hasCI, infraFiles },
    dataPipeline,
    docCoverage,
    dependencyDirection,
    fileStats: { totalFileNodes: fileNodes.length, filesPerGroup, nodeTypeCounts },
    fileFanIn,
    fileFanOut,
  };
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log('wrote', outPath, 'totalFileNodes', fileNodes.length);
}

try { main(); } catch (err) { console.error(err && err.stack || String(err)); process.exit(1); }
