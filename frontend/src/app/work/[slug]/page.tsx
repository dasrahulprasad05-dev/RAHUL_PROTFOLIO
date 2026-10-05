"use client";

import { Github } from "@/components/Icons";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  Target,
  Wrench,
  Trophy,
  BookOpen,
  Layers,
  ChevronRight,
  Code2,
  Calendar,
  Share2,
  Sparkles
} from "lucide-react";
import { api, type ProjectWithTech } from "@/lib/api";
import MarkdownViewer from "@/components/MarkdownViewer";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<ProjectWithTech | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.getProject(slug)
        .then(setProject)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-8 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-40 bg-[var(--color-surface-alt)] rounded" />
          <div className="h-12 w-3/4 bg-[var(--color-surface-alt)] rounded" />
          <div className="h-6 w-1/2 bg-[var(--color-surface-alt)] rounded" />
          <div className="h-56 bg-[var(--color-surface-alt)] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-12 pb-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="card p-12 bg-[var(--color-surface)] border-[var(--color-border)] max-w-md mx-auto">
          <AlertTriangle size={40} className="mx-auto text-[var(--color-warning)] mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">Project Not Found</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            The project case study you requested could not be located or may have been moved.
          </p>
          <Link href="/work" className="btn btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    {
      icon: AlertTriangle,
      title: "The Problem",
      content: project.problemStatement,
      color: "var(--color-error)",
      badgeBg: "rgba(239, 68, 68, 0.1)",
    },
    {
      icon: Lightbulb,
      title: "The Solution",
      content: project.solution,
      color: "var(--color-warning)",
      badgeBg: "rgba(245, 158, 11, 0.1)",
    },
    {
      icon: Trophy,
      title: "Results & Impact",
      content: project.results,
      color: "var(--color-success)",
      badgeBg: "rgba(16, 185, 129, 0.1)",
    },
    {
      icon: Wrench,
      title: "Engineering Challenges",
      content: project.challenges,
      color: "var(--color-accent)",
      badgeBg: "rgba(6, 182, 212, 0.1)",
    },
    {
      icon: BookOpen,
      title: "Key Learnings & Takeaways",
      content: project.learnings,
      color: "var(--color-brand)",
      badgeBg: "rgba(139, 92, 246, 0.1)",
    },
  ].filter((s) => s.content);

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] mb-6"
        >
          <Link href="/" className="hover:text-[var(--color-brand)] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/work" className="hover:text-[var(--color-brand)] transition-colors">
            Work
          </Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-text-primary)] font-semibold truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </motion.nav>

        {/* Hero Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card p-6 sm:p-8 mb-10 border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-glow)] rounded-full blur-3xl pointer-events-none" />

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            {project.liveUrl ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Deployment
              </span>
            ) : (
              <span className={`text-xs font-mono font-semibold status-${project.status}`}>
                {project.status.replace("-", " ").toUpperCase()}
              </span>
            )}
            <span className="badge text-xs font-mono">{project.category}</span>
            {project.featured && (
              <span className="text-xs font-mono font-bold text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-2.5 py-1 rounded-full">
                FEATURED PROJECT
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-[var(--color-text-primary)]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8">
            {project.shortDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-sm shadow-lg shadow-[var(--color-brand)]/20 inline-flex items-center gap-2"
              >
                <ExternalLink size={16} /> Launch Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm inline-flex items-center gap-2"
              >
                <Github size={16} /> View Source Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm inline-flex items-center gap-2"
              >
                <ExternalLink size={16} /> Video Walkthrough
              </a>
            )}
          </div>
        </motion.div>

        {/* Case Study Problem & Solution Breakdown */}
        {sections.length > 0 && (
          <div className="space-y-6 mb-12">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2 px-1">
              <Sparkles size={14} className="text-[var(--color-brand)]" /> Case Study Analysis
            </h2>

            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)] border-l-4 transition-all"
                style={{ borderLeftColor: section.color }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: section.badgeBg, color: section.color }}
                  >
                    <section.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Technical Architecture & Deep Dive (from Content) */}
        {project.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2.5 mb-4 px-1">
              <div className="p-2 rounded-xl bg-[var(--color-brand-glow)] text-[var(--color-brand)]">
                <Layers size={18} />
              </div>
              <h2 className="text-xl font-black text-[var(--color-text-primary)]">
                Architecture & Implementation Details
              </h2>
            </div>

            <div className="card bg-[var(--color-surface)] border-[var(--color-border)] p-6 sm:p-8">
              <MarkdownViewer content={project.content} />
            </div>
          </motion.div>
        )}

        {/* Tech Stack Breakdown */}
        {project.technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-6 mb-12 border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <div className="flex items-center gap-2 mb-4 text-[var(--color-brand)] font-mono text-xs font-semibold uppercase tracking-wider">
              <Code2 size={16} /> Technology Stack & Libraries
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="px-3.5 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-xs sm:text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors cursor-default"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation Footer */}
        <div className="pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
          <Link
            href="/work"
            className="btn btn-secondary text-sm inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} /> All Projects
          </Link>
          <Link
            href="/contact"
            className="btn btn-primary text-sm inline-flex items-center gap-2"
          >
            Discuss a similar project
          </Link>
        </div>
      </div>
    </div>
  );
}
