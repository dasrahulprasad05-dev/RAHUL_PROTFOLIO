"use client";

import { Github, Linkedin, Twitter } from "@/components/Icons";
import Link from "next/link";
import {
  Mail, ArrowUp
} from "lucide-react";
import { useState, useEffect } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/dasrahulprasad05-dev", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/rahul-prasad-das", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com", label: "Twitter" },
  { icon: Mail, href: "mailto:dasrahulprasad05@gmail.com", label: "Email" },
];

const quickLinks = [
  { href: "/work", label: "Work" },
  { href: "/journey", label: "Journey" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative border-t border-[var(--color-border)] mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-mono font-bold text-xl tracking-tight">
              RAHUL<span className="text-[var(--color-brand)]">.</span>DEV
            </Link>
            <p className="text-[var(--color-text-secondary)] text-sm max-w-xs leading-relaxed">
              Building intelligent systems and turning ideas into products.
              AI/ML • Data • Full Stack
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              Open to collaborations and internship opportunities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} Rahul Prasad Das. Built with Next.js + Express.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Designed & developed with 💜
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-[var(--color-brand)] text-white shadow-lg hover:bg-[var(--color-brand-dark)] transition-all z-50 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
