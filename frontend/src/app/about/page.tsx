"use client";

import { Github, Linkedin, Twitter } from "@/components/Icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, GraduationCap, Trophy, ArrowRight, Download, Mail, ExternalLink
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api, type Education, type Achievement } from "@/lib/api";

const achievementIcons: Record<string, string> = {
  hackathon: "🏆",
  competition: "🥇",
  certification: "📜",
  launch: "🚀",
  academic: "🎓",
};

export default function AboutPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [education, setEducation] = useState<Education[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getSettings(),
      api.getEducation(),
      api.getAchievements(),
    ])
      .then(([sett, edu, ach]) => {
        setSettings(sett);
        setEducation(edu);
        setAchievements(ach);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    api.trackPageView("/about");
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-16">
            <span className="section-label">About</span>
            <h1 className="section-title mt-2 mb-6">Who I Am</h1>
          </div>
        </SectionWrapper>

        {/* About Content */}
        <SectionWrapper delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Main Text */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {(settings.about_text || "").split("\n\n").map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-lg"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/work" className="btn btn-primary">
                  See my work <ArrowRight size={16} />
                </Link>
                <Link href="/resume" className="btn btn-secondary">
                  <Download size={16} /> Resume
                </Link>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-bold mb-4 text-sm font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-[var(--color-brand)]" />
                    <span className="text-sm">India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap size={16} className="text-[var(--color-brand)]" />
                    <span className="text-sm">B.Tech CSE (2023–2027)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy size={16} className="text-[var(--color-brand)]" />
                    <span className="text-sm">{achievements.length}+ Achievements</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-bold mb-4 text-sm font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                  Connect
                </h3>
                <div className="space-y-2">
                  {[
                    { icon: Github, label: "GitHub", href: "https://github.com/rahul" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/rahul" },
                    { icon: Twitter, label: "Twitter", href: "https://twitter.com/rahul" },
                    { icon: Mail, label: "Email", href: "mailto:rahul@example.com" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors py-1"
                    >
                      <s.icon size={16} />
                      {s.label}
                      <ExternalLink size={12} className="ml-auto opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Education */}
        <SectionWrapper delay={0.1}>
          <div className="mb-16">
            <span className="section-label">Education</span>
            <h2 className="section-title mt-2 mb-8">Academic Background</h2>

            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card flex gap-4"
                >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-[var(--color-brand-glow)] text-[var(--color-brand)]">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-bold">{edu.degree}</h3>
                      {edu.current && (
                        <span className="text-xs font-mono text-[var(--color-success)] bg-[var(--color-success)]/10 px-2 py-0.5 rounded-full w-fit">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {edu.institution}
                      {edu.location && ` • ${edu.location}`}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {edu.startYear} – {edu.endYear || "Present"}
                      {edu.grade && ` • ${edu.grade}`}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Achievements */}
        <SectionWrapper delay={0.1}>
          <div>
            <span className="section-label">Achievements</span>
            <h2 className="section-title mt-2 mb-8">Recognition & Certifications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="card group"
                >
                  <div className="flex gap-3">
                    <span className="text-2xl flex-shrink-0">
                      {achievementIcons[ach.category] || "✨"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm">{ach.title}</h3>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        {ach.organization && `${ach.organization} • `}{ach.date}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                        {ach.description}
                      </p>
                      {ach.verificationUrl && (
                        <a
                          href={ach.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] mt-2 hover:underline"
                        >
                          Verify <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
