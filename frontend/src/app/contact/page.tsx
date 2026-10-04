"use client";

import { Github, Linkedin } from "@/components/Icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send, CheckCircle, AlertCircle, Mail, MapPin
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    api.trackPageView("/contact");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      await api.sendMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-16">
            <span className="section-label">Contact</span>
            <h1 className="section-title mt-2 mb-4">Get In Touch</h1>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              Have a project idea, internship opportunity, or just want to say
              hello? I&apos;d love to hear from you.
            </p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <SectionWrapper className="lg:col-span-2" delay={0.1}>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card text-center py-16"
              >
                <CheckCircle
                  size={48}
                  className="mx-auto mb-4 text-[var(--color-success)]"
                />
                <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Thank you for reaching out. I&apos;ll get back to you as soon
                  as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn btn-secondary"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    required
                    placeholder="Tell me about your project, opportunity, or idea..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input"
                    rows={6}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-[var(--color-error)] bg-[var(--color-error)]/10 p-3 rounded-xl">
                    <AlertCircle size={16} />
                    {errorMsg || "Something went wrong. Please try again."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary w-full sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </SectionWrapper>

          {/* Contact Info */}
          <SectionWrapper delay={0.2}>
            <div className="space-y-4">
              <div className="card">
                <h3 className="font-bold mb-4 text-sm font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                  Other Ways
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "rahul@example.com", href: "mailto:rahul@example.com" },
                    { icon: Github, label: "github.com/rahul", href: "https://github.com/rahul" },
                    { icon: Linkedin, label: "linkedin.com/in/rahul", href: "https://linkedin.com/in/rahul" },
                    { icon: MapPin, label: "India", href: "#" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-alt)] flex items-center justify-center text-[var(--color-text-muted)]">
                        <item.icon size={16} />
                      </div>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="card bg-gradient-to-br from-[var(--color-brand-glow)] to-transparent border-[var(--color-brand)]/20">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    Response time:
                  </span>{" "}
                  I typically respond within 24–48 hours. For urgent matters,
                  please mention it in the subject line.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
