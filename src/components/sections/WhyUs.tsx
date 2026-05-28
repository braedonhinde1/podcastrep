"use client";

import type { ReactNode } from "react";
import { FadeUp } from "@/components/ui/motion";
import { GlassCard } from "@/components/ui/glass-card";

type Feature = {
  title: string;
  description: string;
  accent: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    title: "Direct Lines to Top DR Agencies",
    description:
      "Years of relationships with every major direct-response agency buying podcast inventory — the same buyers placing on the biggest shows in the space. Your pitch lands on a desk where we already take the call.",
    accent: "var(--color-brand-500)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M8.2 7.5 10 10.5M15.8 7.5 14 10.5M8.2 16.5 10 13.5M15.8 16.5 14 13.5" />
      </svg>
    ),
  },
  {
    title: "10K to 10M Downloads — Any Size",
    description:
      "Floor is 10K downloads per episode. Ceiling? There isn't one. We represent shows the major networks won't touch and shows they're already fighting over. The differentiator is our agency access, not your show size.",
    accent: "var(--color-accent-500)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 21V10M9 21V6M15 21V3M21 21V14M3 21h18" />
      </svg>
    ),
  },
  {
    title: "Transparent Commission: 15–25%",
    description:
      "Industry-standard commission, sliding lower for larger shows. You see every offer, every rate, every contract. No black-box pricing, no inventory sold behind your back.",
    accent: "var(--color-brand-400)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M19 5 5 19" />
        <circle cx="7.5" cy="7.5" r="2.5" />
        <circle cx="16.5" cy="16.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "100% Non-Exclusive",
    description:
      "Already with a network or another sales agency? We work alongside, never against. No lock-in, no exclusivity clauses, no conflicts — if your contracts allow it, we can sell too.",
    accent: "var(--color-accent-400)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M18.178 8C19.286 8 20 8.834 20 9.99v9.02C20 20.166 19.286 21 18.178 21H5.822C4.714 21 4 20.166 4 19.01V9.99C4 8.834 4.714 8 5.822 8M8 8V6a4 4 0 0 1 8 0" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-24 px-6 bg-gradient-to-b from-transparent via-[var(--color-surface-raised)]/50 to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--