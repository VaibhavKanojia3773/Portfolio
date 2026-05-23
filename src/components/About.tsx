"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, MapPin, GraduationCap, Github, Linkedin, Mail } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { personalInfo } from "@/data/personal";
import { fadeInUp, stagger } from "@/lib/animations";

export default function About() {
  const hasPhoto = !!personalInfo.photo;

  return (
    <section id="about" className="pt-28 pb-16 section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="01" title="About" />

        {/* Top row: photo + bio */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Unified profile card: photo + identity in a single container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-4 flex justify-center lg:justify-start"
          >
            <div className="relative group w-full max-w-[300px]">
              {/* Animated gradient ring around the entire card */}
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-cyan-500 via-violet-500 to-cyan-500 opacity-50 blur-sm group-hover:opacity-70 transition-opacity duration-500 animate-gradient-shift bg-[length:200%_200%]" />

              {/* Card */}
              <div className="relative rounded-2xl border border-white/10 dark:border-slate-800 bg-white dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden">
                {/* Photo — fills card top, no rounded inner border */}
                <div className="relative w-full aspect-square overflow-hidden">
                  {hasPhoto ? (
                    <Image
                      src={personalInfo.photo}
                      alt={personalInfo.name}
                      fill
                      sizes="(min-width: 1024px) 300px, 280px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex flex-col items-center justify-center gap-2">
                      <User size={48} className="text-slate-300 dark:text-slate-600" />
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-600">
                        Add photo in personal.ts
                      </span>
                    </div>
                  )}
                  {/* subtle bottom fade so the photo blends into the info section */}
                  <div className="pointer-events-none absolute bottom-0 inset-x-0 h-12 bg-gradient-to-b from-transparent to-white dark:to-slate-900/70" />
                </div>

                {/* Identity section — same card, no internal gap */}
                <div className="px-5 pt-4 pb-5 space-y-3.5">
                  {/* Status pill row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-wider bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      OPEN TO ROLES
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-600">
                      2026
                    </span>
                  </div>

                  {/* Meta rows */}
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <MapPin size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
                      <span>{personalInfo.location}</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <GraduationCap size={13} className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                      <span>
                        DTU · CSE
                        <span className="text-slate-400 dark:text-slate-600"> · CGPA {personalInfo.cgpa}</span>
                      </span>
                    </li>
                  </ul>

                  {/* Mini stat row */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 px-2.5 py-2 text-center">
                      <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">4×</div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Podiums
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 px-2.5 py-2 text-center">
                      <div className="text-sm font-bold text-violet-600 dark:text-violet-400">Top 1%</div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Amazon ML
                      </div>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="flex items-center justify-center gap-1 pt-3 border-t border-slate-100 dark:border-slate-800/70">
                    {personalInfo.links.github && (
                      <a
                        href={personalInfo.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        data-cursor="view"
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {personalInfo.links.linkedin && (
                      <a
                        href={personalInfo.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        data-cursor="view"
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                    {personalInfo.links.email && (
                      <a
                        href={`mailto:${personalInfo.links.email}`}
                        aria-label="Email"
                        data-cursor="view"
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                      >
                        <Mail size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating accent dots — keep the playful detail outside the card */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 animate-float pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full bg-violet-500/20 dark:bg-violet-500/10 animate-float-delayed pointer-events-none" />
            </div>
          </motion.div>

          {/* Bio + focus areas */}
          <div className="lg:col-span-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Bio text — 3 cols */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-3 space-y-4"
              >
                {personalInfo.about.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    variants={fadeInUp}
                    className="text-base leading-relaxed text-slate-600 dark:text-slate-400"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>

              {/* Focus areas — 2 cols */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="lg:col-span-2 space-y-3"
              >
                {personalInfo.focusAreas.map((area, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40
                      hover:border-cyan-300 dark:hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5
                      transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {area.title}
                        </h3>
                        <p className="text-[13px] text-slate-500 dark:text-slate-500 leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"
        >
          <motion.h3
            variants={fadeInUp}
            className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6"
          >
            Tech Stack
          </motion.h3>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
            {[
              ...personalInfo.skills.languages,
              ...personalInfo.skills.mlStack,
              ...personalInfo.skills.tools,
              ...personalInfo.skills.areas,
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-md text-xs font-mono
                  bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400
                  border border-slate-200 dark:border-slate-700/50
                  hover:border-cyan-300 dark:hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-cyan-400
                  transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
