"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/data/experience";
import { fadeInUp, stagger } from "@/lib/animations";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-28 section-padding bg-slate-50/50 dark:bg-slate-900/20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="04" title="Experience" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                className="relative pl-0 sm:pl-10"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 hidden sm:flex items-center justify-center">
                  <div className="w-[15px] h-[15px] rounded-full border-2 border-cyan-500 dark:border-cyan-400 bg-white dark:bg-slate-900" />
                </div>

                {/* Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 sm:p-8
                  hover:border-cyan-300 dark:hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5
                  transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                        {exp.organization}
                        {exp.location && (
                          <span className="text-slate-400 dark:text-slate-500">
                            {" "}
                            · {exp.location}
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-mono text-slate-400 dark:text-slate-500 px-3 py-1 rounded-md bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/30">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                      >
                        <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-500" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech used */}
                  {exp.techUsed && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.techUsed.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono
                            bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                            border border-slate-200 dark:border-slate-700/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
