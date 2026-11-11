"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";

/**
 * The site's signature: one composite signal (top) analysed into three frequency bands (below),
 * the idea behind multirate filter banks and wavelet decomposition, which run through his research.
 */
export function SignalField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused || !!reduce;
  }, [paused, reduce]);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0,
      h = 0,
      t = 0,
      mx = 0.5;
    let colors = { b1: "#1c3a2d", b2: "#4b8a68", b3: "#b08a3e", line: "#999" };
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors = { b1: s.getPropertyValue("--band-1").trim(), b2: s.getPropertyValue("--band-2").trim(), b3: s.getPropertyValue("--band-3").trim(), line: s.getPropertyValue("--ink").trim() };
    };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const bands = [
      { f: 1.2, a: 1, k: "b1" as const, lw: 2 },
      { f: 3.1, a: 0.55, k: "b2" as const, lw: 1.6 },
      { f: 7.4, a: 0.28, k: "b3" as const, lw: 1.2 },
    ];
    const wave = (x: number, i: number, tt: number) => {
      const b = bands[i];
      const u = x / w;
      return Math.sin(u * Math.PI * 2 * b.f * 2 + tt * (0.5 + i * 0.35)) * b.a * Math.sin(Math.PI * (0.15 + u * 0.7) + mx);
    };
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const rows = h / 4.9;
      // composite
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = colors.line;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = rows * 1.1 + ((wave(x, 0, t) + wave(x, 1, t) + wave(x, 2, t)) / 1.9) * rows * 0.8;
        if (x) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      }
      ctx.stroke();
      // bands
      bands.forEach((b, i) => {
        const cy = rows * (2.1 + i * 0.95);
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.line;
        ctx.beginPath();
        ctx.moveTo(0, cy + rows * 0.45);
        ctx.lineTo(w, cy + rows * 0.45);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.lineWidth = b.lw;
        ctx.strokeStyle = colors[b.k];
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = cy + wave(x, i, t) * rows * 0.4;
          if (x) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }
    const loop = () => {
      if (!pausedRef.current) {
        t += 0.016;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 1.2;
    };
    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("pointermove", onMove, { passive: true });
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) loop();
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={ref} className="h-full w-full" role="img" aria-label="Animated decorative waveform: one signal split into three frequency bands" />
      {!reduce && (
        <button
          onClick={() => setPaused((p) => !p)}
          className="no-print absolute right-0 bottom-0 flex size-9 items-center justify-center rounded-full border border-[var(--line)] bg-paper/80 text-ink2 transition hover:text-ink"
          aria-label={paused ? "Play background animation" : "Pause background animation"}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </div>
  );
}
