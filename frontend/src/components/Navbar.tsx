"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/journey", label: "Journey" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-surface)]/85 backdrop-blur-xl border-b border-[var(--color-border)] shadow-sm"
            : "bg-[var(--color-surface)]/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-[var(--color-border-subtle)] md:border-b-0"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-base sm:text-lg tracking-tight hover:text-[var(--color-brand)] transition-colors flex items-center gap-1.5"
          >
            <span>RAHUL</span>
            <span className="text-[var(--color-brand)]">.DEV</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-[var(--color-brand)] font-semibold"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-[var(--color-brand-glow)]"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/resume"
              className="hidden md:flex items-center gap-1 text-xs lg:text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] hover:border-[var(--color-brand)] transition-all"
            >
              Resume <ArrowUpRight size={13} />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun size={17} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon size={17} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-alt)] transition-colors text-[var(--color-text-primary)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--color-surface)]/98 backdrop-blur-2xl md:hidden pt-20 px-6 flex flex-col justify-between pb-10"
          >
            <nav className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between p-3.5 rounded-xl font-mono text-lg font-semibold transition-colors ${
                        isActive
                          ? "bg-[var(--color-brand-glow)] text-[var(--color-brand)]"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[var(--color-brand)]" />}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2"
              >
                <Link
                  href="/resume"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl font-mono text-lg font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:bg-[var(--color-surface-alt)] transition-colors border border-[var(--color-border-subtle)]"
                >
                  <span>Resume</span>
                  <ArrowUpRight size={18} />
                </Link>
              </motion.div>
            </nav>

            <div className="pt-6 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
              <span>© {new Date().getFullYear()} Rahul Prasad Das</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/dasrahulprasad05-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-brand)]"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/rahul-prasad-das"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-brand)]"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
