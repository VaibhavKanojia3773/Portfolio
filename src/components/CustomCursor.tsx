"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: small dot + larger trailing ring.
 * - Only mounts on (hover: hover) and (pointer: fine) devices.
 * - Skipped if user prefers reduced motion.
 * - Grows + shows "view" label when hovering [data-cursor="view"] elements.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.5 });

  const hoverRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);

      const target = e.target as HTMLElement | null;
      const interactive =
        !!target?.closest('[data-cursor="view"], a, button, [role="button"]');
      if (interactive !== hoverRef.current) {
        hoverRef.current = interactive;
        setHovered(interactive);
      }
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.classList.remove("cursor-custom-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        aria-hidden
        style={{
          x,
          y,
          opacity: hidden ? 0 : 1,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-white transition-[width,height] duration-200"
          style={{
            width: hovered ? "6px" : "6px",
            height: hovered ? "6px" : "6px",
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        aria-hidden
        style={{
          x: ringX,
          y: ringY,
          opacity: hidden ? 0 : 1,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[199] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            width: hovered ? 56 : 28,
            height: hovered ? 56 : 28,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="rounded-full border border-white/80 flex items-center justify-center"
        >
          <motion.span
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.18 }}
            className="font-mono text-[9px] uppercase tracking-[0.25em] text-white"
          >
            view
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
