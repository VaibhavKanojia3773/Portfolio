"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import HeroNeuralCanvas from "@/components/HeroNeuralCanvas";
import MagneticButton from "@/components/MagneticButton";
import { personalInfo } from "@/data/personal";

const stats = [
  { label: "IJCNLP-AACL", value: "Published" },
  { label: "Hackathon Wins", value: "4×" },
  { label: "Amazon ML", value: "Top 1%" },
  { label: "Kaggle", value: "Top 1%" },
  { label: "Wunder Quant", value: "Top 2%" },
];

export default function Hero() {
  // After the terminal-intro plays (or skipped) this delay aligns the hero fade-in.
  // We detect the session flag and start instantly on subsequent visits.
  const [containerDelay, setContainerDelay] = useState(3.8);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("portfolio-intro-played") === "1") {
        setContainerDelay(0.1);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive neural network background */}
      <div className="absolute inset-0 opacity-80 dark:opacity-90">
        <HeroNeuralCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-[#030712]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 dark:bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-violet-500/5 dark:bg-violet-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto section-padding text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: containerDelay + 0.15, duration: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-slate-800 dark:text-white">
            {personalInfo.firstName}
          </span>
          <br />
          <span className="gradient-text">{personalInfo.lastName}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: containerDelay + 0.3, duration: 0.5 }}
          className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: containerDelay + 0.45, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-x-5 gap-y-4 sm:gap-x-8 mb-12 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-semibold text-slate-800 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: containerDelay + 0.6, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            data-cursor="view"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
              bg-cyan-600 text-white hover:bg-cyan-500
              dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-900
              transition-colors shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 will-change-transform"
          >
            View Projects
            <ArrowDown
              size={14}
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </MagneticButton>
          {personalInfo.links.resume && (
            <MagneticButton
              href={personalInfo.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              strength={0.25}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
                border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300
                hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400
                transition-colors will-change-transform"
            >
              <FileText size={14} />
              Resume
            </MagneticButton>
          )}
          <MagneticButton
            href="#contact"
            data-cursor="view"
            strength={0.25}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
              border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300
              hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400
              transition-colors will-change-transform"
          >
            <Mail size={14} />
            Contact
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: containerDelay + 1.0, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
