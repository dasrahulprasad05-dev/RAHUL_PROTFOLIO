"use client";

import { Github } from "@/components/Icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Brain, Sparkles, BookOpen, Target, ExternalLink, ChevronRight
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api, type ProjectWithTech, type BuildLog } from "@/lib/api";

// ─── Stagger animation helpers ────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function HomePage() {
  const [projects, setProjects] = useState<ProjectWithTech[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [buildLogs, setBuildLogs] = useState<BuildLog[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getProjects({ featured: "true" }),
      api.getSettings(),
      api.getBuildLogs(),
    ])
      .then(([proj, sett, logs]) => {
        setProjects(proj);
        setSettings(sett);
        setBuildLogs(logs.slice(0, 3));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));

    api.trackPageView("/");
  }, []);

  const currentProject =
    projects.find((p) => p.slug === "swasthya-sathi-ai") ||
    projects.find((p) => p.status === "live" || p.status === "in-development") ||
    projects[0];

  return (
    <div className="relative">
      {/* ─── Hero ──────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--color-brand)] opacity-[0.07] blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-32">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Label */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="section-label inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                {settings.hero_title ? "Available for opportunities" : "Portfolio"}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[1.05] tracking-[-0.04em] mb-6"
            >
              <span className="gradient-text">BUILDING WITH AI.</span>
              <br />
              <span className="text-[var(--color-text-primary)]">LEARNING IN PUBLIC.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div variants={fadeUp} className="mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text-primary)]">
                {settings.site_title || "Rahul Prasad Das"}
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-[var(--color-text-secondary)] text-lg md:text-xl font-medium mb-8"
            >
              {settings.hero_subtitle || "AI/ML • Data • Full Stack"}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/work" className="btn btn-primary group">
                Explore my work
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link href="/resume" className="btn btn-secondary">
                View Resume
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Currently Building ────────────────────────── */}
      {currentProject && (
        <SectionWrapper className="max-w-6xl mx-auto px-6 pb-20">
          <div className="card border-[var(--color-brand)]/20 bg-gradient-to-br from-[var(--color-surface-elevated)] to-[var(--color-brand-glow)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[var(--color-brand-glow)] text-[var(--color-brand)]">
                  <Brain size={24} />
                </div>
                <div>
                  <span className="section-label text-xs">
                    {currentProject.status === "live" ? "Featured Flagship" : "Currently Building"}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{currentProject.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                    {currentProject.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {currentProject.technologies.slice(0, 5).map((tech) => (
                      <span key={tech.id} className="badge text-xs">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 self-start md:self-center">
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                <Link
                  href={`/work/${currentProject.slug}`}
                  className="btn btn-ghost text-[var(--color-brand)] whitespace-nowrap"
                >
                  Case study <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* ─── Now Section ───────────────────────────────── */}
      <SectionWrapper className="max-w-6xl mx-auto px-6 pb-24" delay={0.1}>
        <div className="mb-8">
          <span className="section-label">Now</span>
          <h2 className="section-title mt-2">What I&apos;m up to</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Brain,
              label: "Learning",
              value: settings.currently_learning || "Deep Learning → LLM → Agentic AI",
              color: "var(--color-brand)",
            },
            {
              icon: Sparkles,
              label: "Building",
              value: settings.currently_building_title || "Arogya Sahayak",
              color: "var(--color-accent)",
            },
            {
              icon: BookOpen,
              label: "Preparing",
              value: settings.currently_preparing || "AI/ML + Software Engineering",
              color: "var(--color-success)",
            },
            {
              icon: Target,
              label: "Goal",
              value: settings.current_goal || "AI/ML / Data Science Internship",
              color: "var(--color-warning)",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card group cursor-default"
            >
              <item.icon
                size={20}
                style={{ color: item.color }}
                className="mb-3"
              />
              <p className="text-xs font-mono font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-1">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* ─── Featured Projects ─────────────────────────── */}
      <SectionWrapper className="max-w-6xl mx-auto px-6 pb-24" delay={0.1}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="section-label">Project Lab</span>
            <h2 className="section-title mt-2">Featured Work</h2>
          </div>
          <Link
            href="/work"
            className="btn btn-ghost hidden sm:flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loaded ? projects.slice(0, 6) : Array(6).fill(null)).map((project, i) =>
            project ? (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={`/work/${project.slug}`} className="block group">
                  <div className="card h-full flex flex-col">
                    {/* Status */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-mono font-semibold status-${project.status}`}>
                        {project.status.replace("-", " ").toUpperCase()}
                      </span>
                      <span className="badge">{project.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-brand)] transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4 flex-1">
                      {project.shortDescription}
                    </p>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech: any) => (
                        <span key={tech.id} className="badge text-[11px]">
                          {tech.name}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="badge text-[11px]">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border-subtle)]">
                      {project.liveUrl && (
                        <span className="text-xs font-medium text-[var(--color-success)] flex items-center gap-1">
                          <ExternalLink size={12} /> Live
                        </span>
                      )}
                      {project.githubUrl && (
                        <span className="text-xs font-medium text-[var(--color-text-muted)] flex items-center gap-1">
                          <Github size={12} /> Code
                        </span>
                      )}
                      <span className="ml-auto text-xs text-[var(--color-brand)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        View Case Study <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ) : (
              <div key={i} className="card animate-pulse h-64">
                <div className="h-4 w-20 bg-[var(--color-surface-alt)] rounded mb-4" />
                <div className="h-6 w-3/4 bg-[var(--color-surface-alt)] rounded mb-2" />
                <div className="h-4 w-full bg-[var(--color-surface-alt)] rounded mb-1" />
                <div className="h-4 w-2/3 bg-[var(--color-surface-alt)] rounded" />
              </div>
            )
          )}
        </div>

        <Link
          href="/work"
          className="btn btn-ghost sm:hidden flex items-center gap-1 mt-6 justify-center"
        >
          View all projects <ArrowRight size={14} />
        </Link>
      </SectionWrapper>

      {/* ─── Build Log Preview ─────────────────────────── */}
      {buildLogs.length > 0 && (
        <SectionWrapper className="max-w-6xl mx-auto px-6 pb-24" delay={0.1}>
          <div className="mb-8">
            <span className="section-label">Build Log</span>
            <h2 className="section-title mt-2">Recent Updates</h2>
          </div>

          <div className="space-y-4">
            {buildLogs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card flex gap-4"
              >
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-2xl font-black text-[var(--color-brand)]">
                    {new Date(log.date).getDate().toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs font-mono text-[var(--color-text-muted)] uppercase">
                    {new Date(log.date).toLocaleString("en", { month: "short" })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold mb-1">{log.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {log.content.replace(/[#*\-✅→✓]/g, "").slice(0, 150)}...
                  </p>
                  {log.tags && (
                    <div className="flex gap-2 mt-2">
                      {log.tags.split(",").slice(0, 3).map((tag) => (
                        <span key={tag} className="badge text-[10px]">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* ─── CTA Section ───────────────────────────────── */}
      <SectionWrapper className="max-w-6xl mx-auto px-6 pb-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-dark)] p-12 md:p-16 text-center text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white blur-[80px]" />
            <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-[var(--color-accent)] blur-[100px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Let&apos;s build something together
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8 text-lg">
              I&apos;m always open to discussing new projects, internship
              opportunities, or interesting collaborations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn bg-white text-[var(--color-brand-dark)] hover:bg-white/90 font-bold"
              >
                Get in touch <ArrowRight size={16} />
              </Link>
              <Link
                href="/work"
                className="btn border border-white/30 text-white hover:bg-white/10"
              >
                See my work
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
