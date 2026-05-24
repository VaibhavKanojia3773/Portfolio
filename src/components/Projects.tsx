"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Award,
  ArrowRight,
  X,
  FileText,
} from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import LabStrip from "@/components/LabStrip";
import { ThemedPlaceholder } from "@/components/placeholders";
import {
  featuredProjects,
  labProjects,
  type Project,
} from "@/data/projects";
import { fadeInUp, stagger } from "@/lib/animations";

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ y: { duration: 0.3, ease: "easeOut" } }}
      data-cursor="view"
      className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900/60 overflow-hidden cursor-pointer
        hover:border-cyan-300 dark:hover:border-cyan-500/40
        hover:shadow-2xl hover:shadow-cyan-500/10
        transition-[border-color,box-shadow] duration-300"
      onClick={onOpen}
    >
      <div className="relative h-48 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ThemedPlaceholder theme={project.accentTheme} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {project.award && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm">
            <Award size={11} className="text-white" />
            <span className="text-[10px] font-semibold text-white tracking-wide">
              {project.award}
            </span>
          </div>
        )}

        {project.year && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/10">
            <span className="text-[10px] font-mono text-slate-200 tracking-wide">
              {project.year}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-medium text-slate-800 dark:text-slate-200">
            View Details
            <ArrowRight size={12} />
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider
                bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                border border-slate-200 dark:border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 dark:text-slate-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {project.problem}
        </p>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Github size={13} />
              Code
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <ExternalLink size={13} />
              Demo
            </a>
          )}
          <span className="ml-auto text-xs font-mono text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
            text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
            <ThemedPlaceholder theme={project.accentTheme} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-12 relative">
          {project.award && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 mb-4">
              <Award size={12} className="text-amber-500" />
              <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400">
                {project.award}
              </span>
            </div>
          )}

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {project.subtitle}
          </p>

          <div className="mb-5">
            <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Problem
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="mb-5">
            <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Approach
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.approach}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Key Metrics
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/40"
                >
                  <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-mono
                    bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400
                    border border-slate-200 dark:border-slate-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-5 border-t border-slate-200 dark:border-slate-800">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300
                  hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400
                  transition-all"
              >
                <Github size={15} />
                View Code
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  bg-cyan-600 text-white hover:bg-cyan-500
                  dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-900
                  transition-all"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
            {project.links.paper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300
                  hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400
                  transition-all"
              >
                <FileText size={15} />
                Paper
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="py-28 section-padding bg-slate-50/50 dark:bg-slate-900/20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="03" title="Projects" />

        {/* Featured grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        {/* Lab strip */}
        {labProjects.length > 0 && (
          <LabStrip
            projects={labProjects}
            onOpen={(p) => setSelectedProject(p)}
          />
        )}
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
