"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  number: string;
  title: string;
  className?: string;
}

export default function SectionHeading({
  number,
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-16 ${className}`}
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-cyan-500 dark:text-cyan-400">
          {number}
        </span>
        <div className="h-px w-12 bg-cyan-500/40 dark:bg-cyan-400/30" />
      </div>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
        {title}
      </h2>
    </motion.div>
  );
}
