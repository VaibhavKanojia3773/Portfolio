"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin, FileText } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { personalInfo } from "@/data/personal";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/60 shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between section-padding">
          {/* Logo */}
          <a
            href="#hero"
            data-cursor="view"
            className="font-mono text-sm font-semibold tracking-tight text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <span className="text-slate-400 dark:text-slate-500">&lt;</span>
            {personalInfo.firstName}
            <span className="text-slate-400 dark:text-slate-500">/&gt;</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="view"
                className="font-mono text-xs tracking-wider uppercase text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />

            <div className="flex items-center gap-1">
              {personalInfo.links.github && (
                <a
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  data-cursor="view"
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
                >
                  <Github size={15} />
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
                  <Linkedin size={15} />
                </a>
              )}
              {personalInfo.links.resume && (
                <a
                  href={personalInfo.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  className="inline-flex items-center gap-1.5 ml-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
                >
                  <FileText size={12} />
                  Resume
                </a>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-5 mt-4 pt-6 border-t border-slate-200 dark:border-slate-800 w-32 justify-center">
                {personalInfo.links.github && (
                  <a
                    href={personalInfo.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
                {personalInfo.links.linkedin && (
                  <a
                    href={personalInfo.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {personalInfo.links.resume && (
                  <a
                    href={personalInfo.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Resume"
                    className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <FileText size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
