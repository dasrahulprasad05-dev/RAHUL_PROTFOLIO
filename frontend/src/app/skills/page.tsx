"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Database, Code, Wrench } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api, type Skill } from "@/lib/api";

const categoryMeta: Record<string, { icon: typeof Brain; color: string; label: string }> = {
  "AI/ML": { icon: Brain, color: "var(--color-brand)", label: "Artificial Intelligence & Machine Learning" },
  Data: { icon: Database, color: "var(--color-accent)", label: "Data Science & Analytics" },
  Development: { icon: Code, color: "var(--color-success)", label: "Software Development" },
  Tools: { icon: Wrench, color: "var(--color-warning)", label: "Tools & Platforms" },
};

const levelMeta: Record<string, { label: string; color: string; width: string }> = {
  learning: { label: "Learning", color: "var(--color-error)", width: "25%" },
  practicing: { label: "Practicing", color: "var(--color-warning)", width: "55%" },
  proficient: { label: "Proficient", color: "var(--color-success)", width: "80%" },
  expert: { label: "Expert", color: "var(--color-brand)", width: "95%" },
};

export default function SkillsPage() {
  const [grouped, setGrouped] = useState<Record<string, Skill[]>>({});
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

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-16">
            <span className="section-label">Skill Map</span>
            <h1 className="section-title mt-2 mb-4">What I Work With</h1>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              Technologies and tools I use to build intelligent systems and
              solve real-world problems.
            </p>
          </div>
        </SectionWrapper>

        {/* Level Legend */}
        <SectionWrapper delay={0.1}>
          <div className="flex flex-wrap gap-6 mb-12 p-4 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
            {Object.entries(levelMeta).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: meta.color }} />
                <span className="text-sm text-[var(--color-text-secondary)]">{meta.label}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loaded ? (
            categories.map((category, catIdx) => {
              const meta = categoryMeta[category] || {
                icon: Code,
                color: "var(--color-brand)",
                label: category,
              };
              const Icon = meta.icon;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1, duration: 0.5 }}
                  className="card"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h2 className="font-bold">{category}</h2>
                      <p className="text-xs text-[var(--color-text-muted)]">{meta.label}</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {grouped[category].map((skill, i) => {
                      const level = levelMeta[skill.level] || levelMeta.practicing;
                      return (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 }}
                          className="group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span
                              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
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
                              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: level.color }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })
          ) : (
            Array(4).fill(null).map((_, i) => (
              <div key={i} className="card animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--color-surface-alt)] rounded-xl" />
                  <div className="h-5 w-32 bg-[var(--color-surface-alt)] rounded" />
                </div>
                {Array(5).fill(null).map((_, j) => (
                  <div key={j}>
                    <div className="h-4 w-3/4 bg-[var(--color-surface-alt)] rounded mb-1" />
                    <div className="h-1.5 bg-[var(--color-surface-alt)] rounded-full" />
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
