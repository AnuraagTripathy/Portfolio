"use client";

import Link from "next/link";
import { ArrowUpRight, Minus, Plus, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";

/* =====================================================================
   Sketchbook — the projects as plates in a bound book.

   Each project is one spread: the screenshot mounted on paper. The leaf
   that turns is a real curved surface — a chain of nested strips whose
   tangent sweeps through an arc — so the page bends the way paper bends
   instead of pivoting like a flat door. A loupe lies on the desk; pick it
   up and drag it across the plate to read the fine print in a screenshot.
   ===================================================================== */

const N = 18; // strips — enough for a smooth curve
const SPAN = 0.449; // gutter to outer page edge, as a fraction of the book
const BETA = 0.6; // peak curl of the arc, radians
const MAG = 2.3; // what the glass magnifies by
const TILT_X = 4.5;
const TILT_Y = 7;
const ZOOM_MIN = 0.9;
const ZOOM_MAX = 1.6;
const MOUNT = "rgba(20,16,32,0.22)"; // the hairline under the mounted plate

type Fit = { fw: number; fh: number; ox: number; oy: number };
type Page = { src: string; aspect: number; fit: Fit };

type Turn = { dir: "next" | "prev"; from: number; to: number; t: number };
type Spring =
  | { kind: "spring"; v: number; target: number; k: number; c: number; done?: () => void }
  | { kind: "tween"; from: number; target: number; dur: number; e: number; done?: () => void };

export function Sketchbook() {
  const [cur, setCur] = useState(0);
  const [zoomPct, setZoomPct] = useState(100);
  const [loupeOn, setLoupeOn] = useState(true);
  const [hinted, setHinted] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const sb3dRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  const zoomWrapRef = useRef<HTMLDivElement>(null);
  const zoomInnerRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);

  // Imperative handles the React shell calls into.
  const api = useRef<{
    step: (dir: "next" | "prev") => void;
    goTo: (i: number) => void;
    nudgeZoom: (mul: number) => void;
    setLoupe: (on: boolean) => void;
  } | null>(null);

  useEffect(() => {
    const stage = stageRef.current!;
    const sb3d = sb3dRef.current!;
    const book = bookRef.current!;
    const capBox = capRef.current!;
    const zoomWrap = zoomWrapRef.current!;
    const zoomInner = zoomInnerRef.current!;
    const loupe = loupeRef.current!;
    const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const M = projects.length;

    const pages: Page[] = projects.map((p) => ({
      src: p.image,
      aspect: 16 / 10, // replaced by the real one once each file decodes
      fit: { fw: 0, fh: 0, ox: 0, oy: 0 },
    }));

    let idx = 0;
    let turn: Turn | null = null;
    let strips: HTMLElement[] = [];
    let disposed = false;

    const el = (t: string, c?: string) => {
      const e = document.createElement(t);
      if (c) e.className = c;
      return e;
    };

    /* --------------------------------------------- plate geometry */
    /* Every plate is mounted on the same sheet, contained inside a margin,
       so pages of different proportions still line up strip for strip. */
    function measure() {
      const bw = book.clientWidth;
      const bh = book.clientHeight;
      if (!bw) return;
      sb3d.style.setProperty("--bw", bw + "px");
      // contain each plate inside the same margin, whatever its proportions
      const boxW = bw * 0.9;
      const boxH = bh * 0.84;
      for (const p of pages) {
        const fh = Math.min(boxH, boxW / p.aspect);
        const fw = fh * p.aspect;
        p.fit = { fw, fh, ox: (bw - fw) / 2, oy: (bh - fh) * 0.44 };
      }
    }

    /** Paint page `i` into `e`, where `e`'s left edge sits at book-x `X`. */
    function dress(e: HTMLElement, i: number, X: number) {
      const p = pages[i];
      const { fw, fh, ox, oy } = p.fit;
      const x = ox - X;
      e.style.backgroundImage = `url(${p.src}), linear-gradient(${MOUNT},${MOUNT})`;
      e.style.backgroundSize = `${fw}px ${fh}px, ${fw + 3}px ${fh + 3}px`;
      e.style.backgroundPosition = `${x}px ${oy}px, ${x - 1.5}px ${oy - 1.5}px`;
    }

    /* ------------------------------------------------ the turning leaf */
    function buildCurl(dir: "next" | "prev", from: number, to: number) {
      strips = [];
      const c = el("div", "sb-curl " + dir);
      c.style.setProperty("--n", String(N));
      c.style.setProperty("--span", String(SPAN));
      const bw = book.clientWidth;
      const gut = bw * 0.5;
      const sw = (bw * SPAN) / N;
      let host: HTMLElement = c;
      for (let i = 0; i < N; i++) {
        const s = el("div", "sb-strip");
        // where this strip's near edge sits on the flat page, either side
        const A = gut + i * sw; // faces the from-page
        const B = gut - (i + 1) * sw; // faces the to-page, read mirrored
        const f = el("div", "sb-face front");
        const b = el("div", "sb-face back");
        dress(f, from, dir === "next" ? A : B);
        dress(b, to, dir === "next" ? B : A);
        for (const face of [f, b]) {
          face.appendChild(el("div", "sh"));
          face.appendChild(el("div", "gl"));
        }
        s.appendChild(f);
        s.appendChild(b);
        if (i === N - 1) s.classList.add("edge");
        host.appendChild(s);
        host = s;
        strips.push(s);
      }
      return c;
    }

    function applyTurn(t: number) {
      const th = Math.PI * t; // how far the leaf has swung
      const beta = BETA * Math.sin(Math.PI * t); // flat at both ends
      const D = 180 / Math.PI;
      const tt = th + beta;
      const td = (2 * beta) / N;
      sb3d.style.setProperty("--tt", (tt * D).toFixed(2) + "deg");
      sb3d.style.setProperty("--td", (td * D).toFixed(3) + "deg");
      sb3d.style.setProperty("--shade", Math.sin(Math.PI * t).toFixed(3));
      fadeCaption(t);
      for (let i = 0; i < strips.length; i++) {
        const l1 = Math.abs(Math.cos(tt - i * td)); // facing, at the near edge
        const l2 = Math.abs(Math.cos(tt - (i + 1) * td)); // ...and the far one
        const st = strips[i].style;
        st.setProperty("--lit", l1.toFixed(3));
        st.setProperty("--a1", ((1 - l1) * 0.62).toFixed(3));
        st.setProperty("--a2", ((1 - l2) * 0.62).toFixed(3));
      }
    }

    function paint() {
      book.textContent = "";
      measure();
      if (!turn) {
        const f = el("div", "sb-full");
        dress(f, idx, 0);
        book.appendChild(f);
        book.appendChild(el("div", "sb-crease"));
        sb3d.style.setProperty("--shade", "0");
      } else {
        const next = turn.dir === "next";
        const bw = book.clientWidth;
        for (const [pos, page, X] of [
          ["left", next ? turn.from : turn.to, 0],
          ["right", next ? turn.to : turn.from, bw / 2],
        ] as const) {
          const h = el("div", "sb-half " + pos);
          dress(h, page, X);
          h.appendChild(el("div", "sb-gutter " + pos));
          book.appendChild(h);
        }
        book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
        applyTurn(turn.t);
      }
      for (const side of ["prev", "next"] as const) {
        const z = el("button", "sb-zone " + side);
        z.setAttribute("aria-label", side === "prev" ? "previous plate" : "next plate");
        z.setAttribute("type", "button");
        book.appendChild(z);
      }
      caption();
      syncZoomLayer();
      placeLoupe();
    }

    /* ------------------------------------------------------- captions */
    let capOut: HTMLElement | null = null;
    let capIn: HTMLElement | null = null;
    function capText(i: number) {
      const p = projects[i];
      const e = el("p", "sb-caption");
      e.innerHTML =
        '<span class="block font-display text-lg tracking-tight text-ink sm:text-xl"></span>' +
        '<span class="mt-1 block text-[11px] uppercase tracking-[0.18em] text-ink-soft"></span>';
      (e.children[0] as HTMLElement).textContent = p.name;
      (e.children[1] as HTMLElement).textContent = p.period;
      return e;
    }
    function caption() {
      capBox.textContent = "";
      capOut = capIn = null;
      if (turn) {
        capOut = capText(turn.from);
        capIn = capText(turn.to);
        capBox.appendChild(capOut);
        capBox.appendChild(capIn);
        fadeCaption(turn.t);
      } else {
        capBox.appendChild(capText(idx));
      }
    }
    /* the old title is gone before the new one arrives, so they never sit on
       top of each other mid-drag */
    function fadeCaption(t: number) {
      if (!capOut || !capIn) return;
      const out = 1 - Math.max(0, Math.min(1, (t - 0.1) / 0.28));
      const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.3));
      capOut.style.opacity = out.toFixed(3);
      capIn.style.opacity = inn.toFixed(3);
    }

    /* ------------------------------------------------------ spring loop */
    let spring: Spring | null = null;
    let raf: number | null = null;
    let last = 0;

    function kick() {
      if (raf === null) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }
    function animateTo(target: number, done?: () => void, k = 150, c = 22) {
      spring = { kind: "spring", v: 0, target, k, c, done };
      kick();
    }
    function tick(now: number) {
      raf = null;
      if (disposed) return;
      const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
      last = now;
      if (spring && turn) {
        const s = spring;
        if (s.kind === "tween") {
          s.e += dt;
          const k = Math.min(1, s.e / s.dur);
          turn.t = s.from + (s.target - s.from) * k;
          applyTurn(turn.t);
          if (k >= 1) {
            spring = null;
            s.done?.();
          }
        } else {
          const x = turn.t - s.target;
          s.v += (-s.k * x - s.c * s.v) * dt;
          turn.t += s.v * dt;
          if (Math.abs(turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
            turn.t = s.target;
            spring = null;
            applyTurn(turn.t);
            s.done?.();
          } else applyTurn(turn.t);
        }
      }
      viewSpring();
      const lmoved = loupeEase();
      if ((spring || viewActive || lmoved) && raf === null) raf = requestAnimationFrame(tick);
    }

    /* ------------------------------------------- tilt + zoom of the book */
    const view = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
    let viewActive = false;
    let lastZ = 1;
    function applyView() {
      sb3d.style.setProperty("--rx", view.rx.toFixed(2) + "deg");
      sb3d.style.setProperty("--ry", view.ry.toFixed(2) + "deg");
      sb3d.style.setProperty("--zoom", view.z.toFixed(3));
      // the glass stays put, but the page under it has moved
      if (view.z !== lastZ) {
        lastZ = view.z;
        placeLoupe();
      }
    }
    function viewSpring() {
      const e = 0.14;
      let moved = false;
      for (const [k, t] of [
        ["rx", "trx"],
        ["ry", "try_"],
        ["z", "tz"],
      ] as const) {
        const d = view[t] - view[k];
        if (Math.abs(d) > 0.0006) {
          view[k] += d * e;
          moved = true;
        } else view[k] = view[t];
      }
      if (moved) applyView();
      viewActive = moved;
      return moved;
    }
    function setView(rx: number, ry: number, z: number) {
      view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
      view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
      view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
      viewActive = true;
      kick();
      setZoomPct(Math.round(view.tz * 100));
    }
    /* the book leans toward the cursor — no dragging, and never far */
    function onPointerMove(e: PointerEvent) {
      if (e.pointerType === "touch" || drag) return;
      const r = book.getBoundingClientRect();
      if (!r.width) return;
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.62)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
      setView(-ny * TILT_X, nx * TILT_Y, view.tz);
    }
    addEventListener("pointermove", onPointerMove, { passive: true });
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setView(0, 0, view.tz);
    };
    addEventListener("pointerout", onOut);

    /* ------------------------------------------------------ turn control */
    function startTurn(dir: "next" | "prev", t: number) {
      spring = null;
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      shoveLoupe(dir);
      const from = idx;
      turn = { dir, from, to: dir === "next" ? (from + 1) % M : (from - 1 + M) % M, t: t || 0 };
      setCur(turn.to);
      paint();
    }
    function settle() {
      if (!turn) return;
      idx = turn.to;
      turn = null;
      paint();
    }
    function commit() {
      if (!turn) return;
      if (REDUCED) return settle();
      animateTo(1, settle, 170, 26);
    }
    function cancel() {
      if (!turn) return;
      const back = turn.from;
      animateTo(
        0,
        () => {
          turn = null;
          setCur(back);
          paint();
        },
        150,
        24
      );
    }
    function step(dir: "next" | "prev") {
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      startTurn(dir, 0);
      commit();
    }
    function goTo(i: number) {
      if (turn) {
        idx = turn.to;
        turn = null;
      }
      if (i === idx) return;
      const fwd = (i - idx + M) % M;
      const back = (idx - i + M) % M;
      if (Math.min(fwd, back) === 1) return step(fwd === 1 ? "next" : "prev");
      idx = i;
      setCur(i);
      paint();
    }

    /* ------------------------------------------------------- pointer work */
    let drag: { dir: "next" | "prev"; x0: number; w: number; moved: number; vel: number; tPrev: number } | null =
      null;
    function onDown(e: PointerEvent) {
      if (e.button !== 0) return;
      e.preventDefault(); // no text selection, no image drag
      setHinted(true);
      const onBook = (e.target as HTMLElement).closest(".sb-zone");
      stage.setPointerCapture(e.pointerId);
      if (!onBook) return;
      const r = book.getBoundingClientRect();
      const dir = (e.clientX - r.left) / r.width > 0.5 ? "next" : "prev";
      startTurn(dir, 0);
      drag = { dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
    }
    function onMove(e: PointerEvent) {
      if (!drag) return;
      const dx = e.clientX - drag.x0;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.62);
      const t = Math.max(0, Math.min(1, raw));
      const now = performance.now();
      drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
      drag.tPrev = now;
      if (turn) {
        turn.t = t;
        applyTurn(t);
      }
    }
    function onUp() {
      if (!drag) return;
      const d = drag;
      drag = null;
      if (!turn) return;
      if (d.moved < 6) return commit(); // a tap, not a drag
      if (turn.t > 0.42 || d.vel > 1.1) commit();
      else cancel();
    }
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    const noDrag = (e: Event) => e.preventDefault();
    stage.addEventListener("dragstart", noDrag);
    stage.addEventListener("selectstart", noDrag);
    const onDbl = () => setView(view.trx, view.try_, 1);
    stage.addEventListener("dblclick", onDbl);

    function onKey(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      // only when the book is actually on screen
      const r = stage.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      e.preventDefault();
      setHinted(true);
      step(e.key === "ArrowRight" ? "next" : "prev");
    }
    addEventListener("keydown", onKey);

    /* --------------------------------------------------- loupe + controls */
    let lOn = true;
    let lx: number | null = null;
    let ly = 0;
    let lgrab: { cx: number; cy: number; lx0: number; ly0: number } | null = null;
    let lTarget: { x: number; y: number } | null = null;

    const loupeSize = () => Math.round(Math.max(120, Math.min(250, book.clientWidth * 0.235)));

    /* park it on the desk at the lower right, half off the book */
    function restLoupe() {
      lx = book.clientWidth * 0.88;
      ly = book.clientHeight * 0.855;
      placeLoupe();
    }
    /* mirror whatever the book is currently showing into the magnified copy */
    function syncZoomLayer() {
      zoomInner.textContent = "";
      for (const c of Array.from(book.children)) {
        if (c.classList.contains("sb-zone")) continue; // hit targets need no copy
        zoomInner.appendChild(c.cloneNode(true));
      }
    }
    /* The glass sits above the tilt, in the book's untransformed pixels, so
       the lean of the page never nudges it. What the tilt does change is
       which part of the paper is under the glass, and only the scale matters
       enough to correct for: the book is drawn about its own centre. */
    function placeLoupe() {
      if (lx === null) return;
      const bw = book.clientWidth;
      const bh = book.clientHeight;
      if (!bw) return;
      const R = loupeSize() / 2;
      const bez = R * 2 * 0.058;
      loupe.style.setProperty("--lr", R * 2 + "px");
      loupe.style.transform = `translate3d(${(lx - R).toFixed(1)}px,${(ly - R).toFixed(1)}px,0)`;
      loupe.classList.toggle("on", lOn);

      // where the paper's edges actually land once the book is scaled
      const z = view.z;
      const cx = bw / 2;
      const cy = bh / 2;
      const x0 = cx + (0 - cx) * z;
      const x1 = cx + (bw - cx) * z;
      const y0 = cy + (0 - cy) * z;
      const y1 = cy + (bh - cy) * z;
      /* How far the glass's own centre is inside the paper. The copy fades
         out as it wanders off the sheet, so you are left looking through
         plain glass rather than at a sliver of page on flat desk. */
      const nx = Math.max(x0, Math.min(lx, x1));
      const ny = Math.max(y0, Math.min(ly, y1));
      const inside =
        lx > x0 && lx < x1 && ly > y0 && ly < y1
          ? Math.min(lx - x0, x1 - lx, ly - y0, y1 - ly)
          : -Math.hypot(lx - nx, ly - ny);
      const k = Math.max(0, Math.min(1, (inside + R * 0.3) / (R * 0.55)));

      zoomWrap.style.opacity = (lOn ? k : 0).toFixed(3);
      if (k <= 0.002) return;
      const r = (R - bez).toFixed(1);
      const mask = `radial-gradient(circle ${r}px at ${lx.toFixed(1)}px ${ly.toFixed(
        1
      )}px,#000 calc(100% - 1px),transparent 100%)`;
      zoomWrap.style.webkitMaskImage = mask;
      zoomWrap.style.maskImage = mask;
      /* the page point beneath the glass, magnified about that same spot so
         the lens keeps showing MAG times whatever is on screen */
      const px = cx + (lx - cx) / z;
      const py = cy + (ly - cy) / z;
      const s = MAG * z;
      zoomInner.style.transform = `translate(${(lx - px * s).toFixed(1)}px,${(ly - py * s).toFixed(
        1
      )}px) scale(${s.toFixed(4)})`;
    }
    /* the leaf shoves the glass aside as it sweeps past */
    function shoveLoupe(dir: "next" | "prev") {
      if (!lOn || lx === null || lgrab) return;
      const bw = book.clientWidth;
      const bh = book.clientHeight;
      const nx = (bw / 2 + (lx - bw / 2) / view.z) / bw;
      const ny = (bh / 2 + (ly - bh / 2) / view.z) / bh;
      if (nx < 0.02 || nx > 0.98 || ny < 0.05 || ny > 0.95) return; // already clear
      lTarget = { x: bw * (dir === "next" ? 0.12 : 0.88), y: bh * 0.855 };
      kick();
    }
    function loupeEase() {
      if (!lTarget || lx === null) return false;
      if (lgrab) {
        lTarget = null;
        return false;
      }
      const dx = lTarget.x - lx;
      const dy = lTarget.y - ly;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        lx = lTarget.x;
        ly = lTarget.y;
        lTarget = null;
        placeLoupe();
        return false;
      }
      lx += dx * 0.17;
      ly += dy * 0.17;
      placeLoupe();
      return true;
    }
    function onLoupeDown(e: PointerEvent) {
      if (!lOn || e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation(); // never starts a page turn
      lTarget = null;
      lgrab = { cx: e.clientX, cy: e.clientY, lx0: lx!, ly0: ly };
      loupe.classList.add("held");
      loupe.setPointerCapture(e.pointerId);
      setHinted(true);
    }
    function onLoupeMove(e: PointerEvent) {
      if (!lgrab) return;
      const bw = book.clientWidth;
      const bh = book.clientHeight;
      const R = loupeSize() / 2;
      // the glass carries none of the book's transform, so the cursor maps 1:1
      lx = Math.max(-R * 0.7, Math.min(bw + R * 0.7, lgrab.lx0 + (e.clientX - lgrab.cx)));
      ly = Math.max(-R * 0.7, Math.min(bh + R * 1.0, lgrab.ly0 + (e.clientY - lgrab.cy)));
      placeLoupe();
    }
    function onLoupeUp() {
      lgrab = null;
      loupe.classList.remove("held");
    }
    loupe.addEventListener("pointerdown", onLoupeDown);
    loupe.addEventListener("pointermove", onLoupeMove);
    loupe.addEventListener("pointerup", onLoupeUp);
    loupe.addEventListener("pointercancel", onLoupeUp);

    function onResize() {
      paint();
      lx = null;
      restLoupe();
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(book);

    api.current = {
      step,
      goTo,
      nudgeZoom: (mul) => setView(view.trx, view.try_, view.tz * mul),
      setLoupe: (on) => {
        lOn = on;
        loupe.classList.toggle("on", on);
        if (on && lx === null) restLoupe();
        placeLoupe();
      },
    };

    /* -------------------------------------------------------------- boot */
    paint();
    applyView();
    restLoupe();
    Promise.all(
      pages.map(
        (p) =>
          new Promise<void>((res) => {
            const im = new Image();
            im.onload = () => {
              if (im.naturalWidth) p.aspect = im.naturalWidth / im.naturalHeight;
              res();
            };
            im.onerror = () => res();
            im.src = p.src;
          })
      )
    ).then(() => {
      if (!disposed) paint();
    });

    return () => {
      disposed = true;
      if (raf !== null) cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("pointermove", onPointerMove);
      removeEventListener("pointerout", onOut);
      removeEventListener("keydown", onKey);
      api.current = null;
    };
  }, []);

  const step = useCallback((dir: "next" | "prev") => {
    setHinted(true);
    api.current?.step(dir);
  }, []);

  const p = projects[cur];

  return (
    <div className="sb">
      <div className="sb-wrap">
        <div className="sb-stage" ref={stageRef}>
          <button className="sb-arrow left" onClick={() => step("prev")} aria-label="previous plate">
            <Chevron dir="left" />
          </button>
          <div className="sb-3d" ref={sb3dRef}>
            <div className="sb-tilt">
              <div className="sb-cast ambient" aria-hidden />
              <div className="sb-cast contact" aria-hidden />
              <div className="sb-book" ref={bookRef} />
            </div>
            <div className="sb-zoomwrap" ref={zoomWrapRef} aria-hidden>
              <div className="sb-zoominner" ref={zoomInnerRef} />
            </div>
            <div className="sb-loupe" ref={loupeRef}>
              <span className="grip" />
              <span className="ring">
                <span className="sb-lens" />
              </span>
            </div>
          </div>
          <button className="sb-arrow right" onClick={() => step("next")} aria-label="next plate">
            <Chevron dir="right" />
          </button>
        </div>

        <div className="sb-captions" ref={capRef} aria-live="polite" />

        <div
          className="flex items-center gap-1.5 rounded-full border border-line/15 bg-surface/70 px-2 py-1 shadow-soft backdrop-blur-sm dark:bg-surface/60"
          role="group"
          aria-label="plate view controls"
        >
          <Tool label="zoom out" onClick={() => api.current?.nudgeZoom(1 / 1.16)}>
            <Minus className="size-3.5" aria-hidden />
          </Tool>
          <span className="min-w-[42px] text-center font-mono text-[11px] tabular-nums text-ink-soft">
            {zoomPct}%
          </span>
          <Tool label="zoom in" onClick={() => api.current?.nudgeZoom(1.16)}>
            <Plus className="size-3.5" aria-hidden />
          </Tool>
          <span className="mx-0.5 hidden h-4 w-px bg-line/20 sm:block" aria-hidden />
          {/* the glass only exists on a pointer device — see showcase.css */}
          <Tool
            className="hidden sm:inline-flex"
            label="magnifier"
            pressed={loupeOn}
            onClick={() => {
              const on = !loupeOn;
              setLoupeOn(on);
              api.current?.setLoupe(on);
            }}
          >
            <Search className="size-3.5" aria-hidden />
          </Tool>
        </div>

        <p
          className={`text-[10px] uppercase tracking-[0.16em] text-ink-soft transition-opacity duration-500 ${
            hinted ? "opacity-0" : "opacity-100"
          }`}
        >
          Drag the page to turn
          <span className="hidden sm:inline"> · Drag the glass across it</span>
        </p>
      </div>

      {/* --------------------------------------------- the current plate */}
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:mt-14 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          {p.subtitle ? <p className="text-sm font-medium text-ink">{p.subtitle}</p> : null}
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-4">
            {p.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:text-accent-muted"
              >
                {l.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
        <ul className="flex flex-wrap gap-1.5 self-start lg:justify-end">
          {p.tech.map((t) => (
            <li
              key={t}
              className="rounded-lg border border-line/15 bg-pastel-butter/60 px-2 py-0.5 text-[10px] font-medium text-ink/80 dark:bg-pastel-butter/10 dark:text-ink/90"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* ----------------------------------------------------- the index */}
      <div className="mx-auto mt-14 max-w-4xl">
        <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-ink-soft">Plates</p>
        <ol className="border-t border-line/15">
          {projects.map((proj, i) => (
            <li key={proj.name}>
              <button
                type="button"
                aria-current={i === cur}
                onClick={() => {
                  setHinted(true);
                  api.current?.goTo(i);
                  stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="group grid w-full grid-cols-[2.6em_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-line/15 px-1 py-3 text-left transition-[background-color,padding] duration-200 hover:bg-surface/60 hover:pl-3 aria-[current=true]:bg-surface/70 aria-[current=true]:pl-3"
              >
                <span className="font-mono text-[11px] text-ink-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base tracking-tight text-ink sm:text-lg">
                  {proj.name}
                </span>
                <span className="text-right text-[10px] uppercase tracking-[0.1em] text-ink-soft group-aria-[current=true]:text-accent">
                  {proj.period.split(" · ")[0]}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Tool({
  children,
  className = "",
  label,
  onClick,
  pressed,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
  onClick: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex size-7 items-center justify-center rounded-full text-ink-soft transition hover:bg-surface hover:text-ink aria-[pressed=true]:bg-accent/15 aria-[pressed=true]:text-accent ${className}`}
    >
      {children}
    </button>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden>
      <polyline
        points={dir === "left" ? "11,3 3,22 11,41" : "3,3 11,22 3,41"}
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
