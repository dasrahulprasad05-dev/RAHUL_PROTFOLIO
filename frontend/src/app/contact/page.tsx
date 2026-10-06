"use client";

import { Github, Linkedin, Instagram } from "@/components/Icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare,
  Copy,
  Check
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText("dasrahulprasad05@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-glow)] text-[var(--color-brand)] font-mono text-xs mb-3">
              <MessageSquare size={14} /> Let&apos;s Connect & Collaborate
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-text-primary)] mb-3">
              Get in Touch
            </h1>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Have a project idea, open engineering opportunity, or research collaboration? Reach out anytime.
            </p>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form (8 cols) */}
          <SectionWrapper className="lg:col-span-7" delay={0.08}>
            <div className="card p-6 sm:p-8 border-[var(--color-border)] bg-[var(--color-surface)]">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">
                    Message Dispatched!
                  </h2>
                  <p className="text-[var(--color-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you for reaching out! Your message has been routed to Rahul&apos;s primary inbox. You will receive a response within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn btn-secondary text-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2">
                      Subject / Topic *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Software Engineering Internship Opportunity"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--color-text-secondary)] mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      placeholder="Tell me about your project, team, or opportunity..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
                      rows={5}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-error)] bg-[var(--color-error)]/10 p-3 rounded-xl border border-[var(--color-error)]/20">
                      <AlertCircle size={15} />
                      {errorMsg || "Failed to send message. Please try again or email directly."}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-primary w-full sm:w-auto text-sm shadow-md font-mono"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Transmitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={15} /> Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </SectionWrapper>

          {/* Contact Details & Response Card (5 cols) */}
          <SectionWrapper className="lg:col-span-5 space-y-6" delay={0.12}>
            {/* Quick Contact Card */}
            <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)]">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                Direct Channels
              </h3>
              <div className="space-y-3">
                {/* Email with copy */}
                <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-glow)] text-[var(--color-brand)] flex items-center justify-center flex-shrink-0">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] text-[var(--color-text-muted)] font-mono">Email Address</div>
                      <a
                        href="mailto:dasrahulprasad05@gmail.com"
                        className="text-xs font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-brand)] transition-colors truncate block"
                      >
                        dasrahulprasad05@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors"
                    title="Copy email to clipboard"
                  >
                    {emailCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* GitHub */}
                <a
                  href="https://github.com/dasrahulprasad05-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] flex items-center gap-3 hover:border-[var(--color-brand)] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-glow)] text-[var(--color-brand)] flex items-center justify-center flex-shrink-0">
                    <Github size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">GitHub Repositories</div>
                    <div className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                      github.com/dasrahulprasad05-dev
                    </div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/rahul-prasad-das"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] flex items-center gap-3 hover:border-[var(--color-brand)] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-glow)] text-[var(--color-brand)] flex items-center justify-center flex-shrink-0">
                    <Linkedin size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">Professional Network</div>
                    <div className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                      linkedin.com/in/rahul-prasad-das
                    </div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/the___cyber__rahul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] flex items-center gap-3 hover:border-[var(--color-brand)] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-glow)] text-[var(--color-brand)] flex items-center justify-center flex-shrink-0">
                    <Instagram size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">Instagram Profile</div>
                    <div className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                      @the___cyber__rahul
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="p-3 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-glow)] text-[var(--color-brand)] flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">Base Location</div>
                    <div className="text-xs font-semibold text-[var(--color-text-primary)]">
                      Cuttack, Odisha, India (IST / UTC+5:30)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA / Availability Card */}
            <div className="card p-5 border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-emerald-400">
                <Clock size={14} /> Fast Turnaround Guarantee
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                I check incoming messages twice daily. Inquiries regarding technical internships, freelance projects, and AI development will receive a response within 24 hours.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
