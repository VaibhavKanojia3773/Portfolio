"use client";

import { motion } from "framer-motion";
import PlaceholderShell from "./PlaceholderShell";

const wave = (offset: number, amp: number) => {
  const pts: string[] = [];
  for (let x = 0; x <= 400; x += 5) {
    const y =
      80 +
      Math.sin((x + offset) * 0.04) * amp +
      Math.sin((x + offset) * 0.11) * (amp * 0.4);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return pts.join(" ");
};

export default function NeuralPlaceholder() {
  return (
    <PlaceholderShell
      gradient="from-cyan-500/20 via-blue-500/5 to-violet-500/20"
      label="eeg · shap"
    >
      <svg
        viewBox="0 0 400 160"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="eeg-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {[0, 30, 60].map((row, i) => (
          <motion.polyline
            key={i}
            fill="none"
            stroke="url(#eeg-stroke)"
            strokeWidth="1.3"
            strokeOpacity={0.8 - i * 0.18}
            initial={{ pathLength: 0 }}
            animate={{
              points: [
                wave(0 + row * 4, 12 - i * 2),
                wave(80 + row * 4, 16 - i * 2),
                wave(160 + row * 4, 10 - i * 2),
                wave(240 + row * 4, 14 - i * 2),
                wave(320 + row * 4, 12 - i * 2),
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: i * 0.4,
            }}
            style={{ transform: `translateY(${(i - 1) * 18}px)` }}
          />
        ))}

        {[40, 120, 200, 280, 360].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={80}
            r="2.4"
            fill="#22d3ee"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.6,
              delay: i * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </PlaceholderShell>
  );
}
