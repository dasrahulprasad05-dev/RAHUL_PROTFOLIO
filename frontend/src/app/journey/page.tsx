"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Zap,
  Folder,
  Trophy,
  Flag,
  Code,
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api, type TimelineEvent } from "@/lib/api";

const categoryIcons: Record<string, typeof GraduationCap> = {
  education: GraduationCap,
  skill: Zap,
  project: Folder,
  achievement: Trophy,
  milestone: Flag,
};

const categoryColors: Record<string, string> = {
  education: "var(--color-brand)",
  skill: "var(--color-accent)",
  project: "var(--color-success)",
  achievement: "var(--color-warning)",
  milestone: "var(--color-error)",
};

export default function JourneyPage() {
  const [grouped, setGrouped] = useState<Record<string, TimelineEvent[]>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.getTimeline()
      .then((data) => {
        setGrouped(data.grouped);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    api.trackPageView("/journey");
  }, []);

  const years = Object.keys(grouped).sort();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-16">
            <span className="section-label">Journey</span>
            <h1 className="section-title mt-2 mb-4">My Learning Path</h1>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              A visual timeline of my growth — from writing my first line of
              code to building AI-powered applications.
            </p>
          </div>
        </SectionWrapper>

        {/* Legend */}
        <SectionWrapper delay={0.1}>
          <div className="flex flex-wrap gap-4 mb-12 p-4 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
            {Object.entries(categoryIcons).map(([key, Icon]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[key] }}
                />
                <span className="text-[var(--color-text-secondary)] capitalize">{key}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]" />

          {loaded ? (
            years.map((year, yearIdx) => (
              <div key={year} className="mb-16">
                {/* Year Label */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex justify-start md:justify-center mb-8"
                >
                  <span className="relative z-10 px-6 py-2 rounded-full bg-[var(--color-brand)] text-white font-mono font-bold text-sm">
                    {year}
                  </span>
                </motion.div>

                {/* Events */}
                <div className="space-y-8">
                  {grouped[year].map((event, i) => {
                    const Icon = categoryIcons[event.category] || Code;
                    const color = categoryColors[event.category] || "var(--color-brand)";
                    const isLeft = i % 2 === 0;

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        className={`relative flex items-start gap-4 ${
                          isLeft
                            ? "md:flex-row md:pr-[calc(50%+2rem)] pl-16 md:pl-0"
                            : "md:flex-row-reverse md:pl-[calc(50%+2rem)] pl-16 md:pr-0"
                        }`}
                      >
                        {/* Dot on the line */}
                        <div
                          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-[var(--color-surface)] z-10"
                          style={{ backgroundColor: color }}
                        />

                        {/* Card */}
                        <div className="card flex-1">
                          <div className="flex items-start gap-3">
                            <div
                              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${color}15`, color }}
                            >
                              <Icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              {event.month && (
                                <span className="text-xs font-mono text-[var(--color-text-muted)]">
                                  {event.month} {event.year}
                                </span>
                              )}
                              <h3 className="font-bold text-sm mb-1">{event.title}</h3>
                              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-8 pl-16">
              {Array(5).fill(null).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-4 w-24 bg-[var(--color-surface-alt)] rounded mb-2" />
                  <div className="h-5 w-3/4 bg-[var(--color-surface-alt)] rounded mb-2" />
                  <div className="h-4 w-full bg-[var(--color-surface-alt)] rounded" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
