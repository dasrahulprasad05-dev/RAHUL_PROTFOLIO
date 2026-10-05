"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Database, Code, Wrench, Sparkles, Cpu, Layers } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api, type Skill } from "@/lib/api";

const categoryMeta: Record<string, { icon: typeof Brain; color: string; label: string }> = {
  "AI/ML": { icon: Brain, color: "var(--color-brand)", label: "Artificial Intelligence & Machine Learning" },
  Data: { icon: Database, color: "var(--color-accent)", label: "Data Science, Analytics & Databases" },
  Development: { icon: Code, color: "var(--color-success)", label: "Full-Stack Software Development" },
  Tools: { icon: Wrench, color: "var(--color-warning)", label: "Developer Tooling & Cloud Platforms" },
};

const levelMeta: Record<string, { label: string; color: string; width: string; percentage: number }> = {
  learning: { label: "Learning", color: "var(--color-error)", width: "35%", percentage: 35 },
  practicing: { label: "Practicing", color: "var(--color-warning)", width: "60%", percentage: 60 },
  proficient: { label: "Proficient", color: "var(--color-success)", width: "82%", percentage: 82 },
  expert: { label: "Expert", color: "var(--color-brand)", width: "95%", percentage: 95 },
};

export default function SkillsPage() {
  const [grouped, setGrouped] = useState<Record<string, Skill[]>>({});
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.getSkills()
      .then((data) => {
        setGrouped(data.grouped);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    api.trackPageView("/skills");
  }, []);

  const categories = Object.keys(grouped);
  const totalSkillsCount = Object.values(grouped).reduce((acc, list) => acc + list.length, 0);

  const displayedCategories =
    activeCategory === "All"
      ? categories
      : categories.filter((c) => c.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-glow)] text-[var(--color-brand)] font-mono text-xs mb-3">
              <Cpu size={14} /> Technology Matrix & Competencies
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-text-primary)] mb-3">
              Technical Skill Landscape
            </h1>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Curated overview of languages, frameworks, AI architectures, and developer tools actively utilized across research and production.
            </p>
          </div>
        </SectionWrapper>

        {/* Level Legend Bar */}
        <SectionWrapper delay={0.08}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                Proficiency Scale:
              </span>
              {Object.entries(levelMeta).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-2 text-xs font-mono">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span className="text-[var(--color-text-secondary)]">{meta.label}</span>
                </div>
              ))}
            </div>
            <div className="text-xs font-mono text-[var(--color-text-muted)]">
              Total Tracked: <strong className="text-[var(--color-brand)]">{totalSkillsCount}</strong> Skills
            </div>
          </div>
        </SectionWrapper>

        {/* Category Filter Tabs */}
        <SectionWrapper delay={0.12}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {["All", ...categories].map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? "text-white font-semibold"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeSkillsTab"
                      className="absolute inset-0 bg-[var(--color-brand)] rounded-xl shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </SectionWrapper>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loaded ? (
            displayedCategories.map((category, catIdx) => {
              const meta = categoryMeta[category] || {
                icon: Code,
                color: "var(--color-brand)",
                label: category,
              };
              const Icon = meta.icon;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.08, duration: 0.4 }}
                  className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/50 transition-all"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--color-border-subtle)]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <h2 className="font-bold text-base text-[var(--color-text-primary)]">{category}</h2>
                        <p className="text-xs text-[var(--color-text-muted)] font-mono">{meta.label}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-lg">
                      {grouped[category]?.length || 0} items
                    </span>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3.5">
                    {grouped[category]?.map((skill, i) => {
                      const level = levelMeta[skill.level] || levelMeta.practicing;
                      return (
                        <div key={skill.id} className="group">
                          <div className="flex items-center justify-between mb-1.5 text-xs">
                            <span className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                              {skill.name}
                            </span>
                            <span
                              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${level.color}15`,
                                color: level.color,
                              }}
                            >
                              {level.label}
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[var(--color-surface-alt)] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: level.width }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.7, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: level.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })
          ) : (
            Array(4).fill(null).map((_, i) => (
              <div key={i} className="card animate-pulse p-6 bg-[var(--color-surface)] border-[var(--color-border)] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--color-surface-alt)] rounded-xl" />
                  <div className="h-5 w-32 bg-[var(--color-surface-alt)] rounded" />
                </div>
                {Array(4).fill(null).map((_, j) => (
                  <div key={j} className="space-y-1">
                    <div className="h-4 w-1/3 bg-[var(--color-surface-alt)] rounded" />
                    <div className="h-2 bg-[var(--color-surface-alt)] rounded-full" />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
