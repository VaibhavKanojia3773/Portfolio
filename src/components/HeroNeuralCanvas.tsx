"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  pulse: number;
}

/**
 * Interactive neural network canvas for the hero.
 * - 12-20 nodes arranged in soft layers
 * - Connections drawn between near-neighbors
 * - Mouse attracts the nearest few nodes and fires a pulse along edges
 * - Honors prefers-reduced-motion; downgrades node count on low-end devices
 */
export default function HeroNeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Determine if dark mode is active (root has .dark class).
    const isDark = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const cores = Math.min(
      typeof navigator !== "undefined"
        ? navigator.hardwareConcurrency || 4
        : 4,
      8
    );
    const baseCount =
      reduceMotion || cores < 4 ? 10 : window.innerWidth < 720 ? 12 : 18;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Layered placement: 3 columns, jittered y values
      nodes = [];
      const cols = 3;
      const perCol = Math.ceil(baseCount / cols);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < perCol; r++) {
          if (nodes.length >= baseCount) break;
          const x =
            width * (0.18 + 0.32 * c) +
            (Math.random() - 0.5) * width * 0.08;
          const y =
            height * (0.15 + (0.7 * r) / Math.max(perCol - 1, 1)) +
            (Math.random() - 0.5) * height * 0.05;
          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    setup();

    const onResize = () => setup();
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const connectionThresh = () => Math.min(width, height) * 0.32;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const dark = isDark();
      const fg = dark ? "rgba(34,211,238," : "rgba(8,145,178,";
      const fg2 = dark ? "rgba(167,139,250," : "rgba(124,58,237,";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;
      const thresh = connectionThresh();

      // Update node positions: gentle drift + mouse attraction
      for (const n of nodes) {
        if (mActive) {
          const dx = mx - n.x;
          const dy = my - n.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 160 * 160) {
            const force = (1 - Math.sqrt(dist2) / 160) * 0.08;
            n.vx += dx * force * 0.02;
            n.vy += dy * force * 0.02;
          }
        }
        // restoring force toward base
        n.vx += (n.baseX - n.x) * 0.008;
        n.vy += (n.baseY - n.y) * 0.008;
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < thresh) {
            const alpha = (1 - dist / thresh) * 0.5;
            ctx.strokeStyle = `${fg}${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Pulse along edge near mouse
            if (mActive) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              const md = Math.hypot(midX - mx, midY - my);
              if (md < 120) {
                const p = (Math.sin(t * 0.003 + i + j) + 1) / 2;
                const px = a.x + dx * -p;
                const py = a.y + dy * -p;
                ctx.fillStyle = `${fg2}${(0.8 * (1 - md / 120)).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(px, py, 1.6, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const dx = mx - n.x;
        const dy = my - n.y;
        const distMouse = mActive ? Math.hypot(dx, dy) : 9999;
        const glow = distMouse < 140 ? 1 - distMouse / 140 : 0;
        const baseR = 2.4 + Math.sin(n.pulse) * 0.6 + glow * 4;

        if (glow > 0) {
          ctx.fillStyle = `${fg2}${(0.18 * glow).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, baseR * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `${fg}${(0.85).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, baseR, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}
