"use client";

import { Github, Linkedin, Twitter, Instagram } from "@/components/Icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Trophy,
  ArrowRight,
  Download,
  Mail,
  ExternalLink,
  Sparkles,
  User,
  Heart,
  Code2,
  Terminal,
  Cpu,
  Target
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

const engineeringPrinciples = [
  {
    icon: Cpu,
    title: "Grounded AI Systems",
    desc: "AI must solve real problems with high reliability. I prioritize RAG architectures, hallucination guardrails, and deterministic fallbacks."
  },
  {
    icon: Code2,
    title: "Pragmatic Engineering",
    desc: "Clean architecture, typed interfaces, and modular codebases that can scale from an MVP prototype to thousands of concurrent users."
  },
  {
    icon: Target,
    title: "Product-Minded Mindset",
    desc: "Technology is a vehicle for value. I design and build end-to-end products with empathy for end users and sharp UI/UX attention."
  }
];

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
    <div className="pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-glow)] text-[var(--color-brand)] font-mono text-xs mb-3">
              <User size={14} /> Background & Philosophy
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-text-primary)] mb-3">
              About Rahul Prasad Das
            </h1>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Full-Stack Developer, AI/ML enthusiast, and Computer Science student passionate about building intelligent systems and software solutions.
            </p>
          </div>
        </SectionWrapper>

        {/* About Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Story (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <SectionWrapper delay={0.05}>
              <div className="card p-6 sm:p-8 border-[var(--color-border)] bg-[var(--color-surface)]">
                <h2 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">
                  The Journey So Far
                </h2>
                <div className="prose prose-invert max-w-none space-y-4">
                  {(settings.about_text || "").split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-[var(--color-text-secondary)] leading-relaxed text-sm sm:text-base"
                    >
                      {para}
                    </p>
                  ))}
                  {!settings.about_text && (
                    <>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm sm:text-base">
                        I am a Computer Science undergraduate with a deep fascination for the intersection of modern web development and applied artificial intelligence. From developing healthcare diagnostic assistants using Retrieval-Augmented Generation (RAG) to building responsive, accessible web applications, I enjoy solving difficult problems end-to-end.
                      </p>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm sm:text-base">
                        My primary stack revolves around TypeScript, Next.js, Python, FastAPI, and PyTorch. Whether competing in national hackathons or refining production-ready microservices, I take pride in shipping high-quality software that creates tangible impact.
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[var(--color-border-subtle)]">
                  <Link href="/work" className="btn btn-primary text-sm inline-flex items-center gap-2">
                    Explore My Projects <ArrowRight size={15} />
                  </Link>
                  <Link href="/resume" className="btn btn-secondary text-sm inline-flex items-center gap-2">
                    <Download size={15} /> View Resume
                  </Link>
                </div>
              </div>
            </SectionWrapper>

            {/* Engineering Principles */}
            <SectionWrapper delay={0.1}>
              <div className="card p-6 sm:p-8 border-[var(--color-border)] bg-[var(--color-surface)]">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-5 flex items-center gap-2">
                  <Sparkles size={14} className="text-[var(--color-brand)]" /> Engineering Philosophy
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {engineeringPrinciples.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={p.title}
                        className="p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)]"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-glow)] text-[var(--color-brand)] flex items-center justify-center mb-3">
                          <Icon size={16} />
                        </div>
                        <h3 className="font-bold text-sm text-[var(--color-text-primary)] mb-1.5">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SectionWrapper>
          </div>

          {/* Quick Info & Social Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <SectionWrapper delay={0.08}>
              <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-brand)] to-purple-600 flex items-center justify-center text-white font-mono font-bold text-xl shadow-md">
                    RPD
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[var(--color-text-primary)]">Rahul Prasad Das</h3>
                    <p className="text-xs text-[var(--color-text-muted)] font-mono">B.Tech CSE (2023–2027)</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm pt-4 border-t border-[var(--color-border-subtle)]">
                  <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <MapPin size={16} className="text-[var(--color-brand)] flex-shrink-0" />
                    <span>Cuttack, Odisha, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <GraduationCap size={16} className="text-[var(--color-brand)] flex-shrink-0" />
                    <span>Computer Science & Engineering</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <Trophy size={16} className="text-[var(--color-brand)] flex-shrink-0" />
                    <span>{achievements.length}+ Verified Honors & Hackathons</span>
                  </div>
                </div>
              </div>
            </SectionWrapper>

            {/* Social Connect */}
            <SectionWrapper delay={0.12}>
              <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                  Connect & Socials
                </h3>
                <div className="space-y-2">
                  {[
                    { icon: Github, label: "GitHub Profile", href: settings.github_url || "https://github.com/dasrahulprasad05-dev" },
                    { icon: Linkedin, label: "LinkedIn Connection", href: settings.linkedin_url || "https://linkedin.com/in/rahul-prasad-das" },
                    { icon: Instagram, label: "Instagram (@the___cyber__rahul)", href: settings.instagram_url || "https://www.instagram.com/the___cyber__rahul/" },
                    { icon: Twitter, label: "Twitter / X", href: "https://x.com" },
                    { icon: Mail, label: "Direct Email", href: `mailto:${settings.contact_email || "dasrahulprasad05@gmail.com"}` },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <s.icon size={15} />
                        <span>{s.label}</span>
                      </div>
                      <ExternalLink size={12} className="opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          </aside>
        </div>

        {/* Education Timeline */}
        <SectionWrapper delay={0.15}>
          <div className="mb-16">
            <span className="section-label">Academic Foundations</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mt-1 mb-8">
              Education & Degrees
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)] border-l-4 border-l-[var(--color-brand)]"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base text-[var(--color-text-primary)]">{edu.degree}</h3>
                    {edu.current && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                    {edu.institution}{edu.location && ` • ${edu.location}`}
                  </p>
                  <p className="text-xs font-mono text-[var(--color-text-muted)]">
                    {edu.startYear} – {edu.endYear || "Present"}{edu.grade && ` • CGPA / Grade: ${edu.grade}`}
                  </p>
                  {edu.description && (
                    <p className="text-xs text-[var(--color-text-secondary)] mt-3 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Achievements Grid */}
        <SectionWrapper delay={0.2}>
          <div>
            <span className="section-label">Milestones & Honors</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mt-1 mb-8">
              Recognition & Hackathons
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="card p-5 border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/60 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="text-2xl flex-shrink-0 mt-0.5">
                      {achievementIcons[ach.category] || "✨"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-[var(--color-text-primary)]">{ach.title}</h3>
                      <p className="text-[11px] font-mono text-[var(--color-text-muted)] mt-0.5">
                        {ach.organization && `${ach.organization} • `}{ach.date}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                        {ach.description}
                      </p>
                      {ach.verificationUrl && (
                        <a
                          href={ach.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[var(--color-brand)] font-mono mt-2.5 hover:underline"
                        >
                          Verify Certificate <ExternalLink size={11} />
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
