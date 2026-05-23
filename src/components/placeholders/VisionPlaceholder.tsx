"use client";

import { motion } from "framer-motion";
import PlaceholderShell from "./PlaceholderShell";

const boxes = [
  { x: 50, y: 40, w: 90, h: 50, label: "emotion" },
  { x: 160, y: 30, w: 70, h: 70, label: "context" },
  { x: 250, y: 50, w: 100, h: 55, label: "subject" },
  { x: 80, y: 110, w: 60, h: 30, label: "" },
  { x: 220, y: 115, w: 80, h: 28, label: "" },
];

export default function VisionPlaceholder() {
  return (
    <PlaceholderShell
      gradient="from-rose-500/15 via-fuchsia-500/5 to-cyan-500/15"
      label="cv · pipeline"
    >
      <svg
        viewBox="0 0 400 160"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {boxes.map((b, i) => (
          <g key={i}>
            <motion.rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={3}
              fill="transparent"
              stroke="#22d3ee"
              strokeOpacity={0.55}
              strokeWidth={0.9}
              strokeDasharray="3 3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.95, 1, 1, 0.97],
              }}
              transition={{
                duration: 4,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h / 2}px` }}
            />
            {b.label && (
              <motion.text
                x={b.x + 3}
                y={b.y - 3}
                fontFamily="ui-monospace, monospace"
                fontSize="7"
                fill="#67e8f9"
                opacity={0.9}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 4,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {b.label}
              </motion.text>
            )}
          </g>
        ))}

        {/* corner reticles */}
        {[
          [10, 10],
          [380, 10],
          [10, 145],
          [380, 145],
        ].map(([x, y], i) => (
          <g key={i} stroke="#a78bfa" strokeWidth={0.8} opacity={0.7}>
            <line x1={x} y1={y} x2={x + (x < 200 ? 8 : -8)} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + (y < 80 ? 8 : -8)} />
          </g>
        ))}
      </svg>
    </PlaceholderShell>
  );
}
