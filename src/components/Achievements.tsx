"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnimatedCounter from "@/components/AnimatedCounter";
import { stats, achievements } from "@/data/achievements";
import { fadeInUp, stagger } from "@/lib/animations";

const categoryIcons = {
  competition: Trophy,
  hackathon: Medal,
  community: Users,
};

const categoryColors = {
  competition: "text-amber-500",
  hackathon: "text-cyan-500",
  community: "text-violet-500",
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="05" title="Achievements" />

        {/* Animated stat counters */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40
                hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-1 leading-tight break-words">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-4"
        >
          {achievements.map((a) => {
            const Icon = categoryIcons[a.category];
            const iconColor = categoryColors[a.category];

            return (
              <motion.div
                key={a.id}
                variants={fadeInUp}
                className="group flex items-start gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40
                  hover:border-cyan-300 dark:hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5
                  transition-all duration-300"
              >
                <div
                  className={`shrink-0 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 ${iconColor}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {a.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
