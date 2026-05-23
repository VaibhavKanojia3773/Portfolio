"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const createParticles = useCallback((width: number, height: number) => {
    const count = width < 768 ? 45 : 80;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
      particlesRef.current = createParticles(width, height);
    }

    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const connectionDist = 140;
    const mouseDist = 160;

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction — gentle push
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist && dist > 0) {
          const force = (mouseDist - dist) / mouseDist;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
        }

        // Dampen velocity
        p.vx *= 0.995;
        p.vy *= 0.995;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        // Check if near mouse — glow
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearMouse = dist < mouseDist;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, nearMouse ? p.radius * 2 : p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = nearMouse
          ? `rgba(139, 92, 246, ${p.opacity + 0.3})`
          : `rgba(34, 211, 238, ${p.opacity})`;
        ctx!.fill();

        if (nearMouse) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(139, 92, 246, 0.06)`;
          ctx!.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  );
}
