"use client";

import { useEffect, useRef } from "react";

/**
 * Void Field — Predictive Arc, at full brightness on true black.
 * Authored raw-WebGL pass: 100-cell dot matrix, barrel curvature, radial
 * pulse, scanlines, row flicker. Pointer parallax is disabled.
 */
const VERT = `
attribute vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  iResolution;
uniform float iTime;
uniform vec3  uTint;
uniform float uAlpha;

vec2 barrel(vec2 uv, float amt){
  vec2 cc = uv - 0.5;
  float r = dot(cc, cc);
  return uv + cc * r * amt;
}
float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(){
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  uv = barrel(uv, 0.2);

  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 gridCount = vec2(100.0, 100.0 * (iResolution.y / iResolution.x));
  vec2 gridUv = fract(uv * gridCount);
  vec2 id = floor(uv * gridCount);

  vec2 cc = id / gridCount - 0.5;
  float dist = length(cc);

  float pulse = sin(iTime * 1.5 - dist * 10.0) * 0.5 + 0.5;
  float dotSize = 0.38 * pulse;
  float circle = smoothstep(dotSize, dotSize - 0.05, length(gridUv - 0.5));

  float scanline = sin(uv.y * 800.0) * 0.03;
  float flicker = rand(vec2(iTime, id.y)) > 0.98 ? 0.4 : 1.0;

  float m = circle * pulse * flicker;
  m -= scanline;
  m *= smoothstep(0.85, 0.18, dist);
  m = clamp(m, 0.0, 1.0) * uAlpha;

  gl_FragColor = vec4(uTint * m, m);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

/** Authored violet at brightness 1.0, slightly lifted so it reads neon on black. */
const TINT = [1.0, 0.38, 1.0] as const;
const ALPHA = 1;

export function VoidField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "display:block;width:100%;height:100%";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      host.removeChild(canvas);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(prog, "iResolution"),
      time: gl.getUniformLocation(prog, "iTime"),
      tint: gl.getUniformLocation(prog, "uTint"),
      alpha: gl.getUniformLocation(prog, "uAlpha"),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 0);

    const dprCap = Math.min(2, window.devicePixelRatio || 1);
    function resize() {
      const dpr = dprCap;
      const w = Math.max(1, Math.round(host!.clientWidth * dpr));
      const h = Math.max(1, Math.round(host!.clientHeight * dpr));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl!.viewport(0, 0, w, h);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let hidden = document.hidden;
    const t0 = performance.now();

    function paint(now: number) {
      gl!.uniform2f(U.res, canvas.width, canvas.height);
      gl!.uniform1f(U.time, reduce ? 0.85 : (now - t0) / 1000);
      gl!.uniform3f(U.tint, TINT[0], TINT[1], TINT[2]);
      gl!.uniform1f(U.alpha, ALPHA);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (hidden) return;
      paint(now);
    }
    function onVis() {
      hidden = document.hidden;
    }
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      paint(t0);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <div ref={hostRef} className="absolute inset-0 mix-blend-screen" />
    </div>
  );
}
