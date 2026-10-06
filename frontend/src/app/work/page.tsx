"use client";

import { Github } from "@/components/Icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ExternalLink, ArrowRight, Filter, Sparkles, FolderGit2
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api, type ProjectWithTech } from "@/lib/api";

const categories = ["All", "AI/ML", "Data", "Web", "Hackathon"];

const categoryBorderColors: Record<string, string> = {
  "AI/ML": "from-purple-500 via-indigo-500 to-purple-600",
  "Data": "from-emerald-400 via-teal-500 to-emerald-600",
  "Web": "from-blue-500 via-cyan-500 to-blue-600",
  "Hackathon": "from-amber-400 via-orange-500 to-amber-600",
};

export default function WorkPage() {
  const [projects, setProjects] = useState<ProjectWithTech[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.getProjects()
      .then((data) => {
        setProjects(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    api.trackPageView("/work");
  }, []);

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return projects.length;
    return projects.filter((p) => p.category === cat).length;
  };

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header & Filter Bar */}
        <SectionWrapper>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-glow)] text-[var(--color-brand)] font-mono text-xs mb-3">
              <FolderGit2 size={14} /> Production Systems & Experiments
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-text-primary)] mb-3">
              Featured Work & Case Studies
            </h1>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Explore intelligent systems, machine learning prototypes, and full-stack software built with Next.js, FastAPI, and PyTorch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                type="text"
                placeholder="Search projects by title, stack, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto py-2 sm:py-0 scrollbar-none">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                const count = getCategoryCount(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      active
                        ? "text-white font-semibold"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeWorkFilter"
                        className="absolute inset-0 bg-[var(--color-brand)] rounded-xl shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                    <span
                      className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        active
                          ? "bg-white/25 text-white font-bold"
                          : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Summary */}
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] mt-4 mb-8 px-1">
            <span>
              Showing <strong className="text-[var(--color-brand)]">{filtered.length}</strong> of {projects.length} projects
            </span>
            {(searchQuery || activeCategory !== "All") && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="text-[var(--color-brand)] hover:underline"
              >
                Reset all filters
              </button>
            )}
          </div>
        </SectionWrapper>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {loaded ? (
              filtered.length > 0 ? (
                filtered.map((project, i) => {
                  const gradientClass =
                    categoryBorderColors[project.category] || "from-[var(--color-brand)] to-purple-600";

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <Link href={`/work/${project.slug}`} className="block group h-full">
                        <div className="card h-full flex flex-col relative overflow-hidden border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/60 hover:shadow-xl hover:shadow-[var(--color-brand)]/5 transition-all duration-300">
                          {/* Category Colored Top Accent Line */}
                          <div className={`h-1.5 w-full bg-gradient-to-r ${gradientClass} absolute top-0 left-0 right-0`} />

                          {/* Top Row */}
                          <div className="flex items-center justify-between mt-2 mb-3">
                            <div className="flex items-center gap-2">
                              {project.liveUrl ? (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                                </span>
                              ) : (
                                <span className={`text-[11px] font-mono font-semibold status-${project.status}`}>
                                  {project.status.replace("-", " ").toUpperCase()}
                                </span>
                              )}
                              {project.featured && (
                                <span className="text-[10px] font-mono font-bold text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-2 py-0.5 rounded-full">
                                  FEATURED
                                </span>
                              )}
                            </div>

                            <span className="badge text-[11px] font-mono">{project.category}</span>
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-brand)] transition-colors text-[var(--color-text-primary)]">
                            {project.title}
                          </h3>

                          <p className="text-sm text-[var(--color-text-secondary)] mb-5 flex-1 leading-relaxed line-clamp-3">
                            {project.shortDescription}
                          </p>

                          {/* Tech Stack Pills */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.technologies.slice(0, 5).map((tech) => (
                              <span
                                key={tech.id}
                                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]"
                              >
                                {tech.name}
                              </span>
                            ))}
                            {project.technologies.length > 5 && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[var(--color-text-muted)]">
                                +{project.technologies.length - 5}
                              </span>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle)] text-xs">
                            <div className="flex items-center gap-3">
                              {project.liveUrl && (
                                <span className="font-medium text-emerald-400 flex items-center gap-1 font-mono">
                                  <ExternalLink size={12} /> Live Demo
                                </span>
                              )}
                              {project.githubUrl && (
                                <span className="font-medium text-[var(--color-text-muted)] flex items-center gap-1 font-mono hover:text-[var(--color-text-primary)]">
                                  <Github size={12} /> Source
                                </span>
                              )}
                            </div>
                            <span className="text-[var(--color-brand)] font-mono font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              Case Study <ArrowRight size={13} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-1 md:col-span-2 text-center py-16 card bg-[var(--color-surface)] border-[var(--color-border)]"
                >
                  <p className="text-[var(--color-text-muted)] text-base font-mono mb-3">
                    No projects found matching &ldquo;{searchQuery}&rdquo; in {activeCategory}
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                    }}
                    className="btn btn-secondary text-xs"
                  >
                    Clear Search & Filter
                  </button>
                </motion.div>
              )
            ) : (
              Array(4)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="card animate-pulse h-60 bg-[var(--color-surface)] border-[var(--color-border)]">
                    <div className="h-4 w-24 bg-[var(--color-surface-alt)] rounded mb-4" />
                    <div className="h-6 w-3/4 bg-[var(--color-surface-alt)] rounded mb-3" />
                    <div className="h-4 w-full bg-[var(--color-surface-alt)] rounded mb-2" />
                    <div className="h-4 w-2/3 bg-[var(--color-surface-alt)] rounded mb-4" />
                    <div className="flex gap-2 mt-auto">
                      <div className="h-5 w-14 bg-[var(--color-surface-alt)] rounded" />
                      <div className="h-5 w-14 bg-[var(--color-surface-alt)] rounded" />
                    </div>
                  </div>
                ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
