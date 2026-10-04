"use client";

import { Github, Linkedin } from "@/components/Icons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download, GraduationCap, Briefcase, Code, Trophy, Mail, MapPin
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

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="section-label">Resume</span>
              <h1 className="section-title mt-2">Rahul Prasad Das</h1>
              <p className="text-[var(--color-text-secondary)] text-lg mt-1">
                {settings.site_tagline || "AI/ML Builder & Problem Solver"}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1"><MapPin size={14} /> India</span>
                <span className="flex items-center gap-1"><Mail size={14} /> rahul@example.com</span>
                <a href="https://github.com/rahul" className="flex items-center gap-1 hover:text-[var(--color-brand)]"><Github size={14} /> GitHub</a>
                <a href="https://linkedin.com/in/rahul" className="flex items-center gap-1 hover:text-[var(--color-brand)]"><Linkedin size={14} /> LinkedIn</a>
              </div>
            </div>
            <a
              href={settings.resume_url || "/resume.pdf"}
              className="btn btn-primary whitespace-nowrap self-start"
              download
            >
              <Download size={16} /> Download PDF
            </a>
          </div>
        </SectionWrapper>

        <div className="h-px bg-[var(--color-border)] mb-10" />

        {/* About Summary */}
        <SectionWrapper delay={0.05}>
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Briefcase size={18} className="text-[var(--color-brand)]" /> Summary
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {settings.site_description ||
                "AI/ML enthusiast and Full Stack Developer building intelligent systems and data-driven solutions."}
            </p>
          </div>
        </SectionWrapper>

        {/* Education */}
        <SectionWrapper delay={0.1}>
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <GraduationCap size={18} className="text-[var(--color-brand)]" /> Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-[var(--color-brand)] pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">
                      {edu.startYear} – {edu.endYear || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {edu.institution}{edu.grade && ` • ${edu.grade}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Skills */}
        <SectionWrapper delay={0.1}>
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Code size={18} className="text-[var(--color-brand)]" /> Technical Skills
            </h2>
            <div className="space-y-3">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {category}:
                  </span>{" "}
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {items.map((s) => s.name).join(" • ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Key Projects */}
        <SectionWrapper delay={0.1}>
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Code size={18} className="text-[var(--color-brand)]" /> Key Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="border-l-2 border-[var(--color-brand)] pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-semibold">{proj.title}</h3>
                    <span className="text-xs badge w-fit">{proj.category}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    {proj.shortDescription}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {proj.technologies.map((t) => t.name).join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Achievements */}
        <SectionWrapper delay={0.1}>
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-[var(--color-brand)]" /> Achievements & Certifications
            </h2>
            <div className="space-y-2">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex gap-3">
                  <span className="text-sm text-[var(--color-text-muted)] font-mono w-12 flex-shrink-0">
                    {ach.date}
                  </span>
                  <div>
                    <span className="text-sm font-semibold">{ach.title}</span>
                    {ach.organization && (
                      <span className="text-sm text-[var(--color-text-muted)]">
                        {" "}— {ach.organization}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
