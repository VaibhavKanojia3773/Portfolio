"use client";

import { motion } from "framer-motion";
import PlaceholderShell from "./PlaceholderShell";

const steps = [
  { x: 60, label: "perceive" },
  { x: 150, label: "plan" },
  { x: 250, label: "execute" },
  { x: 340, label: "reflect" },
];

export default function AgentPlaceholder() {
  return (
    <PlaceholderShell
      gradient="from-emerald-500/15 via-cyan-500/5 to-violet-500/20"
      label="react · loop"
    >
      <svg
        viewBox="0 0 400 160"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="agent-pipe" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <line
          x1={60}
          y1={80}
          x2={340}
          y2={80}
          stroke="url(#agent-pipe)"
          strokeWidth={1.2}
          strokeDasharray="3 4"
        />

        {steps.map((s, i) => (
          <g key={s.label}>
            <motion.rect
              x={s.x - 22}
              y={62}
              rx={6}
              width={44}
              height={36}
              fill="rgba(15, 23, 42, 0.55)"
              stroke="#22d3ee"
              strokeOpacity={0.45}
              strokeWidth={0.8}
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                stroke: ["#22d3ee", "#a78bfa", "#22d3ee"],
              }}
              transition={{
                duration: 4,
                delay: i * 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <text
              x={s.x}
              y={84}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="8"
              fill="#cbd5e1"
              opacity={0.85}
            >
              {s.label}
            </text>
          </g>
        ))}

        <motion.circle
          r={4}
          fill="#22d3ee"
          initial={{ cx: 60, cy: 80 }}
          animate={{ cx: [60, 150, 250, 340, 60], cy: 80 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M 340 80 Q 200 130 60 80"
          fill="none"
          stroke="#a78bfa"
          strokeOpacity={0.35}
          strokeWidth={0.8}
          strokeDasharray="2 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </PlaceholderShell>
  );
}
