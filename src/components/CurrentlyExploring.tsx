"use client";

import { motion } from "framer-motion";
import { Bot, Rocket, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { explorations } from "@/data/insights";
import { fadeInUp, stagger } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  bot: Bot,
  rocket: Rocket,
  sparkles: Sparkles,
};

export default function CurrentlyExploring() {
  return (
    <section id="exploring" className="py-28 section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="06" title="Currently Exploring" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {explorations.map((exp) => {
            const Icon = iconMap[exp.icon] || Sparkles;

            return (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                className="group relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden
                  hover:border-cyan-300 dark:hover:border-cyan-500/30
                  hover:shadow-xl hover:shadow-cyan-500/5
                  transition-all duration-300"
              >
                {/* Floating icon */}
                <div className="mb-4 w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center
                  group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon
                    size={20}
                    className="text-cyan-600 dark:text-cyan-400"
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {exp.description}
                </p>

                {/* Ambient glow on hover */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/5 blur-3xl transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
