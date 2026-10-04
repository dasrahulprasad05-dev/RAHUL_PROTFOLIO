"use client";

import { Github } from "@/components/Icons";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ExternalLink, AlertTriangle, Lightbulb, Target, Wrench, Trophy, BookOpen
} from "lucide-react";
import { api, type ProjectWithTech } from "@/lib/api";

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
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 bg-[var(--color-surface-alt)] rounded" />
          <div className="h-12 w-3/4 bg-[var(--color-surface-alt)] rounded" />
          <div className="h-6 w-1/2 bg-[var(--color-surface-alt)] rounded" />
          <div className="h-40 bg-[var(--color-surface-alt)] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link href="/work" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to projects
        </Link>
      </div>
    );
  }

  const sections = [
    { icon: AlertTriangle, title: "The Problem", content: project.problemStatement, color: "var(--color-error)" },
    { icon: Lightbulb, title: "The Solution", content: project.solution, color: "var(--color-warning)" },
    { icon: Trophy, title: "Results", content: project.results, color: "var(--color-success)" },
    { icon: Wrench, title: "Challenges", content: project.challenges, color: "var(--color-accent)" },
    { icon: BookOpen, title: "What I Learned", content: project.learnings, color: "var(--color-brand)" },
  ].filter((s) => s.content);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-mono font-semibold status-${project.status}`}>
              {project.status.replace("-", " ").toUpperCase()}
            </span>
            <span className="badge">{project.category}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6">
            {project.shortDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Github size={16} /> View Source
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <ExternalLink size={16} /> Demo Video
              </a>
            )}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-[var(--color-border)] mb-12" />

        {/* Case Study Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${section.color}15`, color: section.color }}
              >
                <section.icon size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-2">{section.title}</h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target size={20} className="text-[var(--color-brand)]" />
            <h2 className="text-lg font-bold">Tech Stack</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.id}
                className="px-4 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-sm font-medium hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-all cursor-default"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
          <Link
            href="/work"
            className="btn btn-ghost"
          >
            <ArrowLeft size={16} /> All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
