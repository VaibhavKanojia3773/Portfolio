"use client";

import { motion } from "framer-motion";
import PlaceholderShell from "./PlaceholderShell";

const nodes = [
  { x: 200, y: 80, r: 4 },
  { x: 120, y: 50, r: 3 },
  { x: 280, y: 50, r: 3 },
  { x: 90, y: 110, r: 3 },
  { x: 310, y: 110, r: 3 },
  { x: 60, y: 80, r: 2.4 },
  { x: 340, y: 80, r: 2.4 },
  { x: 160, y: 30, r: 2.4 },
  { x: 240, y: 30, r: 2.4 },
  { x: 160, y: 130, r: 2.4 },
  { x: 240, y: 130, r: 2.4 },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 5],
  [4, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
];

export default function GalaxyPlaceholder() {
  return (
    <PlaceholderShell
      gradient="from-violet-500/20 via-fuchsia-500/5 to-cyan-500/15"
      label="3d · semantic"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 400 160"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="#a78bfa"
              strokeOpacity={0.3}
              strokeWidth={0.6}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.05 * i,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1.2,
              }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={i === 0 ? "#22d3ee" : "#a78bfa"}
              animate={{
                r: [n.r, n.r * 1.4, n.r],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.4,
                delay: i * 0.18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </motion.div>
    </PlaceholderShell>
  );
}
