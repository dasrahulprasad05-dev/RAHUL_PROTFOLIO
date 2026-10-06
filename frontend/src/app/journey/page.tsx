"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  GraduationCap,
  Zap,
  Folder,
  Trophy,
  Flag,
  Code,
  Milestone,
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

function TimelineCard({
  event,
  isLeft,
}: {
  event: TimelineEvent;
  isLeft: boolean;
}) {
  const Icon = categoryIcons[event.category] || Code;
  const color = categoryColors[event.category] || "var(--color-brand)";

  return (
    <div
      className={`relative flex items-start gap-4 ${
        isLeft
          ? "md:flex-row md:pr-[calc(50%+1.5rem)] pl-12 sm:pl-16 md:pl-0"
          : "md:flex-row-reverse md:pl-[calc(50%+1.5rem)] pl-12 sm:pl-16 md:pr-0"
      }`}
    >
      {/* Node Dot on the Vertical Line — Pops when milestone is scrolled to */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2, margin: "-60px 0px" }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        className="absolute left-2.5 sm:left-4.5 md:left-1/2 md:-translate-x-1/2 top-4 w-4 h-4 rounded-full border-2 border-[var(--color-surface)] z-10 shadow-md flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />
      </motion.div>

      {/* Event Card — Reveals one by one when scrolled into view */}
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.96,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{ once: true, amount: 0.25, margin: "-60px 0px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full"
      >
        <div className="card p-4 sm:p-5 border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/60 hover:shadow-xl hover:shadow-[var(--color-brand)]/5 hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${color}15`, color }}
            >
              <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                {event.month ? (
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                    {event.month} {event.year}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                    {event.year}
                  </span>
                )}
                <span
                  className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  {event.category}
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-brand)] transition-colors">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function JourneyPage() {
  const [grouped, setGrouped] = useState<Record<string, TimelineEvent[]>>({});
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 85%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
    <div className="pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-glow)] text-[var(--color-brand)] font-mono text-xs mb-3">
              <Milestone size={14} /> Chronological Growth Timeline
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-text-primary)] mb-3">
              Engineering Learning Path
            </h1>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              A chronological visual log of key breakthroughs, milestones, software builds, and academic achievements.
            </p>
          </div>
        </SectionWrapper>

        {/* Category Legend Bar */}
        <SectionWrapper delay={0.08}>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-12 p-3.5 sm:p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider hidden sm:inline">
              Event Types:
            </span>
            {Object.entries(categoryIcons).map(([key, Icon]) => (
              <div key={key} className="flex items-center gap-2 text-xs font-mono">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: categoryColors[key] }}
                />
                <span className="text-[var(--color-text-secondary)] capitalize">{key}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Vertical Guide Line (Base) */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-border)] md:-translate-x-1/2" />
          {/* Vertical Guide Line (Animated Fill on Scroll) */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-brand)] via-[var(--color-accent)] to-[var(--color-success)] md:-translate-x-1/2 z-0"
          />

          {loaded ? (
            years.map((year) => (
              <div key={year} className="mb-14 relative">
                {/* Year Marker Badge — Reveals on scroll */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px 0px" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex justify-start pl-1 md:pl-0 md:justify-center mb-8"
                >
                  <span className="relative z-10 px-5 py-1.5 rounded-full bg-[var(--color-brand)] text-black font-mono font-bold text-xs sm:text-sm shadow-md">
                    {year}
                  </span>
                </motion.div>

                {/* Event Items — Each revealed one by one as the user scrolls */}
                <div className="space-y-6 sm:space-y-8">
                  {grouped[year].map((event, i) => (
                    <TimelineCard
                      key={event.id}
                      event={event}
                      isLeft={i % 2 === 0}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-6 pl-12 sm:pl-16">
              {Array(4).fill(null).map((_, i) => (
                <div key={i} className="card animate-pulse p-4 bg-[var(--color-surface)] border-[var(--color-border)]">
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
