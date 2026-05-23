"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { insights } from "@/data/insights";
import { fadeInUp, stagger } from "@/lib/animations";

export default function HowIThink() {
  return (
    <section
      id="philosophy"
      className="py-28 section-padding bg-slate-50/50 dark:bg-slate-900/20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="06" title="How I Think" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {insights.map((insight, i) => (
            <motion.div
              key={insight.id}
              variants={fadeInUp}
              className={`group relative p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40
                hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5
                transition-all duration-300
                ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Quote icon */}
              <Quote
                size={16}
                className="text-slate-200 dark:text-slate-700 mb-3"
              />

              {/* Insight text */}
              <p className="text-base font-medium text-slate-700 dark:text-slate-200 leading-relaxed mb-4 italic">
                &ldquo;{insight.text}&rdquo;
              </p>

              {/* Context tag */}
              {insight.context && (
                <span className="text-xs font-mono text-violet-500 dark:text-violet-400">
                  — {insight.context}
                </span>
              )}

              {/* Hover accent */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/0 group-hover:via-violet-500/40 to-transparent transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
