"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { personalInfo } from "@/data/personal";
import { fadeInUp, stagger } from "@/lib/animations";

const socialLinks = [
  {
    key: "github",
    label: "GitHub",
    icon: Github,
    href: personalInfo.links.github,
    color: "hover:border-slate-500 hover:text-slate-600 dark:hover:text-white",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    href: personalInfo.links.linkedin,
    color: "hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    key: "email",
    label: "Email",
    icon: Mail,
    href: personalInfo.links.email
      ? `mailto:${personalInfo.links.email}`
      : "",
    color: "hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-28 section-padding bg-slate-50/50 dark:bg-slate-900/20"
    >
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading number="07" title="Get in Touch" className="text-center [&>div]:justify-center" />

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto"
        >
          Interested in collaborating on research, ML systems, or just want to
          chat about AI? I&apos;d love to hear from you.
        </motion.p>

        {/* Social links */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            const isAvailable = !!link.href;

            return (
              <motion.div key={link.key} variants={fadeInUp}>
                {isAvailable ? (
                  <a
                    href={link.href}
                    target={link.key !== "email" ? "_blank" : undefined}
                    rel={
                      link.key !== "email"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`group inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40
                      transition-all duration-300 ${link.color}`}
                  >
                    <Icon size={20} />
                    <span className="font-medium text-sm">{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                    />
                  </a>
                ) : (
                  <div
                    className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800
                      text-slate-400 dark:text-slate-600 cursor-default"
                  >
                    <Icon size={20} />
                    <span className="font-medium text-sm">{link.label}</span>
                    <span className="text-xs font-mono italic">add link</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {personalInfo.links.email ? (
            <a
              href={`mailto:${personalInfo.links.email}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm
                bg-cyan-600 text-white hover:bg-cyan-500
                dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-900
                transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
            >
              <Mail size={16} />
              Say Hello
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-mono text-sm
              border border-dashed border-slate-300 dark:border-slate-700
              text-slate-400 dark:text-slate-500"
            >
              Add your email in personal.ts to enable CTA
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
