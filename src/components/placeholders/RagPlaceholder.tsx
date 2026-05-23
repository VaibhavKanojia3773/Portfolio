"use client";

import { motion } from "framer-motion";
import PlaceholderShell from "./PlaceholderShell";

const docs = [
  { y: 30 },
  { y: 60 },
  { y: 90 },
  { y: 120 },
];

export default function RagPlaceholder() {
  return (
    <PlaceholderShell
      gradient="from-cyan-500/20 via-emerald-500/5 to-violet-500/20"
      label="rag · core"
    >
      <svg
        viewBox="0 0 400 160"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <radialGradient id="rag-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* doc chunks on the left */}
        {docs.map((d, i) => (
          <g key={i}>
            <motion.rect
              x={40}
              y={d.y - 6}
              width={50}
              height={12}
              rx={2}
              fill="rgba(15, 23, 42, 0.5)"
              stroke="#a78bfa"
              strokeOpacity={0.4}
              strokeWidth={0.6}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.line
              x1={90}
              y1={d.y}
              x2={200}
              y2={80}
              stroke="#22d3ee"
              strokeOpacity={0.4}
              strokeWidth={0.6}
              strokeDasharray="2 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.circle
              r={2}
              fill="#22d3ee"
              animate={{ cx: [90, 200], cy: [d.y, 80] }}
              transition={{
                duration: 1.8,
                delay: i * 0.45,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        {/* central core */}
        <circle cx={200} cy={80} r={28} fill="url(#rag-core)" />
        <motion.circle
          cx={200}
          cy={80}
          r={12}
          fill="rgba(34, 211, 238, 0.6)"
          animate={{ r: [10, 16, 10], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* output ray */}
        <motion.line
          x1={220}
          y1={80}
          x2={360}
          y2={80}
          stroke="#a78bfa"
          strokeOpacity={0.6}
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          r={3}
          fill="#a78bfa"
          animate={{ cx: [220, 360], cy: 80, opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </PlaceholderShell>
  );
}
