"use client";

import { Github } from "@/components/Icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ExternalLink, ArrowRight, Filter
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api, type ProjectWithTech } from "@/lib/api";

const categories = ["All", "AI/ML", "Data", "Web", "Hackathon"];

export default function WorkPage() {
  const [projects, setProjects] = useState<ProjectWithTech[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.getProjects().then((data) => {
      setProjects(data);
      setLoaded(true);
    }).catch(() => setLoaded(true));
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

  const stats = {
    total: projects.length,
    aiml: projects.filter((p) => p.category === "AI/ML").length,
    data: projects.filter((p) => p.category === "Data").length,
    web: projects.filter((p) => p.category === "Web").length,
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-12">
            <span className="section-label">Project Lab</span>
            <h1 className="section-title mt-2 mb-4">My Work</h1>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              {stats.total} Projects • {stats.aiml} AI/ML • {stats.data} Data •{" "}
              {stats.web} Web
            </p>
          </div>
        </SectionWrapper>

        {/* Search & Filters */}
        <SectionWrapper delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-11"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              <Filter size={16} className="text-[var(--color-text-muted)] mr-1 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-[var(--color-brand)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {loaded ? (
              filtered.length > 0 ? (
                filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Link href={`/work/${project.slug}`} className="block group">
                      <div className="card h-full flex flex-col">
                        {/* Top Row */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-xs font-mono font-semibold status-${project.status}`}
                          >
                            {project.status.replace("-", " ").toUpperCase()}
                          </span>
                          <div className="flex items-center gap-2">
                            {project.featured && (
                              <span className="text-[10px] font-mono font-bold text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-2 py-0.5 rounded-full">
                                FEATURED
                              </span>
                            )}
                            <span className="badge text-[11px]">{project.category}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-brand)] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-4 flex-1 leading-relaxed">
                          {project.shortDescription}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.map((tech) => (
                            <span key={tech.id} className="badge text-[11px]">
                              {tech.name}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-4 pt-3 border-t border-[var(--color-border-subtle)]">
                          {project.liveUrl && (
                            <span className="text-xs font-medium text-[var(--color-success)] flex items-center gap-1">
                              <ExternalLink size={12} /> Live Demo
                            </span>
                          )}
                          {project.githubUrl && (
                            <span className="text-xs font-medium text-[var(--color-text-muted)] flex items-center gap-1">
                              <Github size={12} /> Source Code
                            </span>
                          )}
                          <span className="ml-auto text-xs text-[var(--color-brand)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            Case Study <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-2 text-center py-20"
                >
                  <p className="text-[var(--color-text-muted)] text-lg">
                    No projects found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                    }}
                    className="btn btn-ghost mt-4"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )
            ) : (
              Array(4)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="card animate-pulse h-56">
                    <div className="h-4 w-24 bg-[var(--color-surface-alt)] rounded mb-4" />
                    <div className="h-6 w-3/4 bg-[var(--color-surface-alt)] rounded mb-3" />
                    <div className="h-4 w-full bg-[var(--color-surface-alt)] rounded mb-2" />
                    <div className="h-4 w-2/3 bg-[var(--color-surface-alt)] rounded" />
                  </div>
                ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
