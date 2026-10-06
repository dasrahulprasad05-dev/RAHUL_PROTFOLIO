"use client";

import { Github, Linkedin, Instagram } from "@/components/Icons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  GraduationCap,
  Briefcase,
  Code,
  Trophy,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  FileText,
  Printer,
  Calendar,
  Layers,
  Award
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api, type Skill, type Education, type Achievement, type ProjectWithTech } from "@/lib/api";

export default function ResumePage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [skills, setSkills] = useState<Record<string, Skill[]>>({});
  const [education, setEducation] = useState<Education[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [projects, setProjects] = useState<ProjectWithTech[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getSettings(),
      api.getSkills(),
      api.getEducation(),
      api.getAchievements(),
      api.getProjects({ featured: "true" }),
    ])
      .then(([sett, sk, edu, ach, proj]) => {
        setSettings(sett);
        setSkills(sk.grouped);
        setEducation(edu);
        setAchievements(ach);
        setProjects(proj.slice(0, 4));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    api.trackPageView("/resume");
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Action Bar */}
        <SectionWrapper>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--color-border)]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-glow)] text-[var(--color-brand)] font-mono text-xs mb-2">
                <FileText size={14} /> Curriculum Vitae
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-text-primary)]">
                Rahul Prasad Das
              </h1>
              <p className="text-[var(--color-text-secondary)] text-base sm:text-lg mt-1 font-medium">
                {settings.site_tagline || "Full-Stack Developer & AI/ML Engineer"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="btn btn-secondary text-sm hidden sm:inline-flex items-center gap-2"
                title="Print or Save as PDF"
              >
                <Printer size={15} /> Print
              </button>
              <a
                href={settings.resume_url?.startsWith("http") ? settings.resume_url : "/resume.pdf"}
                download={settings.resume_url?.startsWith("http") ? undefined : "Rahul_Prasad_Das_Resume.pdf"}
                target={settings.resume_url?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="btn btn-primary text-sm shadow-lg shadow-[var(--color-brand)]/20 inline-flex items-center gap-2"
              >
                <Download size={16} /> Download PDF
              </a>
            </div>
          </div>
        </SectionWrapper>

        {/* Resume Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Left Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Profile & Contact Card */}
            <SectionWrapper delay={0.05}>
              <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-glow)] rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-brand)] to-purple-600 flex items-center justify-center text-white font-mono font-bold text-xl shadow-md">
                    RPD
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-[var(--color-text-primary)]">Rahul Prasad Das</h2>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available for Hire
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm pt-4 border-t border-[var(--color-border-subtle)]">
                  <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <MapPin size={16} className="text-[var(--color-brand)] flex-shrink-0" />
                    <span>Cuttack, Odisha, India</span>
                  </div>
                  <a
                    href={`mailto:${settings.contact_email || "dasrahulprasad05@gmail.com"}`}
                    className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
                  >
                    <Mail size={16} className="text-[var(--color-brand)] flex-shrink-0" />
                    <span className="truncate">{settings.contact_email || "dasrahulprasad05@gmail.com"}</span>
                  </a>
                  <a
                    href={settings.github_url || "https://github.com/dasrahulprasad05-dev"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
                  >
                    <Github size={16} className="text-[var(--color-brand)] flex-shrink-0" />
                    <span className="truncate">github.com/dasrahulprasad05-dev</span>
                  </a>
                  <a
                    href={settings.linkedin_url || "https://linkedin.com/in/rahul-prasad-das"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
                  >
                    <Linkedin size={16} className="text-[var(--color-brand)] flex-shrink-0" />
                    <span className="truncate">linkedin.com/in/rahul-prasad-das</span>
                  </a>
                  <a
                    href={settings.instagram_url || "https://www.instagram.com/the___cyber__rahul/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
                  >
                    <Instagram size={16} className="text-[var(--color-brand)] flex-shrink-0" />
                    <span className="truncate">instagram.com/the___cyber__rahul</span>
                  </a>
                </div>
              </div>
            </SectionWrapper>

            {/* Quick Metrics */}
            <SectionWrapper delay={0.1}>
              <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)]">
                    <div className="text-2xl font-black font-mono text-[var(--color-brand)]">10+</div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Projects</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)]">
                    <div className="text-2xl font-black font-mono text-emerald-400">33+</div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Tech Skills</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)]">
                    <div className="text-2xl font-black font-mono text-amber-400">3+</div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5">AI Deployments</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)]">
                    <div className="text-2xl font-black font-mono text-cyan-400">2027</div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Grad Year</div>
                  </div>
                </div>
              </div>
            </SectionWrapper>

            {/* Technical Skills Categorized */}
            <SectionWrapper delay={0.15}>
              <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4 flex items-center gap-2">
                  <Code size={15} className="text-[var(--color-brand)]" /> Skills & Tooling
                </h3>
                <div className="space-y-4">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <span className="text-xs font-mono font-semibold text-[var(--color-text-primary)]">
                        {category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((s) => (
                          <span
                            key={s.id}
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand)] hover:text-[var(--color-text-primary)] transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-[var(--color-brand)]" />
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          </aside>

          {/* Main Content / Right Column (8 cols) */}
          <main className="lg:col-span-8 space-y-8">
            {/* Executive Summary */}
            <SectionWrapper delay={0.1}>
              <div className="card p-6 sm:p-7 border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="flex items-center gap-2.5 mb-3 text-[var(--color-brand)] font-mono text-xs font-semibold uppercase tracking-wider">
                  <Briefcase size={16} /> Executive Summary
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed">
                  {settings.site_description ||
                    "Passionate Full Stack Developer and AI/ML Engineer with deep expertise in Next.js, TypeScript, Python, and Retrieval-Augmented Generation (RAG) architectures. Proven track record of developing healthcare AI tools, real-time analytics platforms, and scalable web solutions with a strong focus on clean code and performance."}
                </p>
              </div>
            </SectionWrapper>

            {/* Featured Projects */}
            <SectionWrapper delay={0.15}>
              <div className="card p-6 sm:p-7 border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--color-border-subtle)]">
                  <div className="flex items-center gap-2.5 text-[var(--color-brand)] font-mono text-xs font-semibold uppercase tracking-wider">
                    <Layers size={16} /> Key Technical Projects
                  </div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">Selected Works</span>
                </div>

                <div className="space-y-6">
                  {projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-4 sm:p-5 rounded-xl bg-[var(--color-surface-alt)]/60 border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-base text-[var(--color-text-primary)]">
                            {proj.title}
                          </h4>
                          <span className="badge text-[10px] font-mono">{proj.category}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--color-brand)] hover:underline inline-flex items-center gap-1 font-mono text-xs"
                            >
                              Live <ExternalLink size={11} />
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] inline-flex items-center gap-1 font-mono text-xs"
                            >
                              Code <Github size={11} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
                        {proj.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((t) => (
                          <span
                            key={t.id}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>

            {/* Education */}
            <SectionWrapper delay={0.2}>
              <div className="card p-6 sm:p-7 border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-[var(--color-border-subtle)] text-[var(--color-brand)] font-mono text-xs font-semibold uppercase tracking-wider">
                  <GraduationCap size={16} /> Education
                </div>

                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-5 border-l-2 border-[var(--color-brand)]">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[var(--color-brand)]" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className="font-bold text-base text-[var(--color-text-primary)]">
                          {edu.degree}
                        </h4>
                        <span className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-surface-alt)] px-2.5 py-0.5 rounded-full w-fit">
                          {edu.startYear} – {edu.endYear || "Present"}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                        {edu.institution}
                        {edu.location && ` • ${edu.location}`}
                      </p>
                      {edu.grade && (
                        <p className="text-xs font-mono text-emerald-400 mt-1">
                          Grade / CGPA: {edu.grade}
                        </p>
                      )}
                      {edu.description && (
                        <p className="text-xs text-[var(--color-text-muted)] mt-2 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>

            {/* Honors & Achievements */}
            <SectionWrapper delay={0.25}>
              <div className="card p-6 sm:p-7 border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-[var(--color-border-subtle)] text-[var(--color-brand)] font-mono text-xs font-semibold uppercase tracking-wider">
                  <Trophy size={16} /> Honors, Hackathons & Certifications
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className="p-3.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-[var(--color-brand-glow)] text-[var(--color-brand)] flex-shrink-0 mt-0.5">
                        <Award size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-xs sm:text-sm text-[var(--color-text-primary)] line-clamp-1">
                          {ach.title}
                        </h5>
                        <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                          {ach.organization && `${ach.organization} • `}{ach.date}
                        </p>
                        {ach.description && (
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 line-clamp-2">
                            {ach.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          </main>
        </div>
      </div>
    </div>
  );
}
