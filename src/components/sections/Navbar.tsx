"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[var(--color-surface)]/80 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-extrabold tracking-tight">
          <span className="gradient-text">Podcast</span>
          <span className="text-[var(--color-text-primary)]">Rep</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-accent-500)] text-white hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden border-t border-white/5"
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-accent-500)] text-white text-center"
          >
            Get Started
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
