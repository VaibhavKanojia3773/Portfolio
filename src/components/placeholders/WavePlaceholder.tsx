"use client";

import { motion } from "framer-motion";
import PlaceholderShell from "./PlaceholderShell";

export default function WavePlaceholder() {
  return (
    <PlaceholderShell
      gradient="from-slate-400/20 via-slate-700/10 to-violet-500/15"
      label="ohrc · topography"
    >
      <svg
        viewBox="0 0 400 160"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {[18, 30, 44, 60, 78].map((r, i) => (
          <motion.ellipse
            key={r}
            cx={200}
            cy={80}
            rx={r * 2.2}
            ry={r}
            fill="none"
            stroke="#94a3b8"
            strokeOpacity={0.45 - i * 0.06}
            strokeWidth={0.8}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.05, 0.6], opacity: [0.2, 0.55, 0.2] }}
            transition={{
              duration: 5,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "200px 80px" }}
          />
        ))}
        {/* central crater */}
        <circle cx={200} cy={80} r={10} fill="rgba(15, 23, 42, 0.7)" />
        <motion.circle
          cx={200}
          cy={80}
          r={4}
          fill="#22d3ee"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* small annotation crosshairs */}
        {[
          [90, 50],
          [310, 60],
          [120, 120],
          [290, 115],
        ].map(([x, y], i) => (
          <g key={i} stroke="#a78bfa" strokeWidth={0.6} opacity={0.65}>
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
            <circle
              cx={x}
              cy={y}
              r={2}
              fill="none"
              stroke="#a78bfa"
              strokeWidth={0.6}
            />
          </g>
        ))}
      </svg>
    </PlaceholderShell>
  );
}
