"use client";

import { motion } from "framer-motion";
import PlaceholderShell from "./PlaceholderShell";

const lines = [
  { y: 30, len: 280, chars: "def encode(x):" },
  { y: 50, len: 200, chars: "    return model(x)" },
  { y: 70, len: 240, chars: "" },
  { y: 90, len: 180, chars: "" },
  { y: 110, len: 260, chars: "" },
  { y: 130, len: 150, chars: "" },
];

export default function OcrPlaceholder() {
  return (
    <PlaceholderShell
      gradient="from-amber-500/15 via-rose-500/5 to-violet-500/15"
      label="ingest · pdf"
    >
      <svg
        viewBox="0 0 400 160"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {lines.map((l, i) => (
          <g key={i}>
            <line
              x1={40}
              y1={l.y}
              x2={40 + l.len}
              y2={l.y}
              stroke="#475569"
              strokeOpacity={0.35}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <motion.line
              x1={40}
              y1={l.y}
              x2={40 + l.len}
              y2={l.y}
              stroke="#22d3ee"
              strokeOpacity={0.85}
              strokeWidth={4}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{
                duration: 5,
                delay: i * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {l.chars && (
              <text
                x={42}
                y={l.y + 2}
                fontFamily="ui-monospace, monospace"
                fontSize="6"
                fill="#0f172a"
                opacity={0.55}
              >
                {l.chars}
              </text>
            )}
          </g>
        ))}
        <motion.line
          x1={40}
          y1={20}
          x2={40}
          y2={140}
          stroke="#a78bfa"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], x1: [40, 320], x2: [40, 320] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </PlaceholderShell>
  );
}
