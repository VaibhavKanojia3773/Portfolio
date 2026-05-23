"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface PlaceholderShellProps {
  children: ReactNode;
  gradient?: string;
  label?: string;
  className?: string;
}

/**
 * Shared wrapper for themed project placeholders.
 * Provides the gradient background, faint grid, and a small mono label.
 * Each themed placeholder renders its own animated SVG on top.
 */
export default function PlaceholderShell({
  children,
  gradient = "from-cyan-500/15 via-slate-900/0 to-violet-500/15",
  label,
  className = "",
}: PlaceholderShellProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "rgb(148 163 184)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
      {label && (
        <span
          className="absolute bottom-2 right-3 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500/80 pointer-events-none select-none"
          aria-hidden
        >
          {label}
        </span>
      )}
    </div>
  );
}
