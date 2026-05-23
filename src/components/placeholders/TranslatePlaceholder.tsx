"use client";

import { motion } from "framer-motion";
import PlaceholderShell from "./PlaceholderShell";

const decoders = [40, 60, 80, 100, 120, 140, 160, 180];

export default function TranslatePlaceholder() {
  return (
    <PlaceholderShell
      gradient="from-violet-500/20 via-cyan-500/5 to-amber-500/15"
      label="nllb · 8 decoders"
    >
      <svg
        viewBox="0 0 400 200"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="enc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Two input streams */}
        {[
          { y: 60, glyphs: ["अ", "क", "ग", "द"], color: "#22d3ee" },
          { y: 140, glyphs: ["A", "B", "C", "D"], color: "#a78bfa" },
        ].map((stream, si) => (
          <g key={si}>
            {stream.glyphs.map((g, i) => (
              <motion.text
                key={i}
                x={20 + i * 18}
                y={stream.y}
                fontFamily="ui-monospace, monospace"
                fontSize="14"
                fill={stream.color}
                opacity={0.85}
                initial={{ opacity: 0, x: 10 + i * 18 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: [10 + i * 18, 100 + i * 18, 100 + i * 18, 150 + i * 18],
                }}
                transition={{
                  duration: 5,
                  delay: si * 0.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {g}
              </motion.text>
            ))}
            <line
              x1={120}
              y1={stream.y - 4}
              x2={170}
              y2={100}
              stroke={stream.color}
              strokeOpacity={0.3}
              strokeWidth={0.6}
              strokeDasharray="2 3"
            />
          </g>
        ))}

        {/* Frozen encoder block */}
        <rect
          x={170}
          y={80}
          width={70}
          height={40}
          rx={4}
          fill="rgba(15, 23, 42, 0.7)"
          stroke="url(#enc-grad)"
          strokeWidth={1}
        />
        <text
          x={205}
          y={97}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          fill="#cbd5e1"
        >
          NLLB-600M
        </text>
        <text
          x={205}
          y={110}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          fill="#fbbf24"
          opacity={0.85}
        >
          ❄ frozen
        </text>

        {/* 8 decoder fan-out */}
        {decoders.map((y, i) => (
          <g key={i}>
            <motion.line
              x1={240}
              y1={100}
              x2={320}
              y2={y - 20}
              stroke="#a78bfa"
              strokeOpacity={0.4}
              strokeWidth={0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, opacity: [0.2, 0.7, 0.2] }}
              transition={{
                duration: 2.4,
                delay: i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <rect
              x={320}
              y={y - 28}
              width={50}
              height={14}
              rx={2}
              fill="rgba(15, 23, 42, 0.6)"
              stroke="#a78bfa"
              strokeOpacity={0.5}
              strokeWidth={0.6}
            />
            <text
              x={345}
              y={y - 18}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="6"
              fill="#cbd5e1"
              opacity={0.85}
            >
              dec_{i + 1}
            </text>
          </g>
        ))}
      </svg>
    </PlaceholderShell>
  );
}
