"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { GlassCard } from "@/components/ui/glass-card";

const BRAND = "var(--color-brand-500)";
const ACCENT = "var(--color-accent-500)";

const categories = [
  {
    label: "Sports Betting & DFS",
    accent: BRAND,
    // Trophy — universal winner / DFS / sportsbook
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 4H4v3a3 3 0 0 0 3 3M17 4h3v3a3 3 0 0 1-3 3" />
      </svg>
    ),
  },
  {
    label: "Meal Kits & Food Delivery",
    accent: ACCENT,
    // Meal-kit box with utensil divider
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 7l3-3h12l3 3v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7zM3 7h18M10 11v5M14 11v5" />
      </svg>
    ),
  },
  {
    label: "Bedding & Sleep",
    accent: BRAND,
    // Crescent moon — sleep
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    label: "Beverages",
    accent: ACCENT,
    // Bottle silhouette
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M10 3h4v3l1.5 2v12a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V8L10 6V3zM10 3v0M9 11h6" />
      </svg>
    ),
  },
  {
    label: "Finance & Investing",
    accent: BRAND,
    // Coin stack
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <ellipse cx="12" cy="6" rx="7" ry="2.5" />
        <path d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 10v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4M5 14v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
      </svg>
    ),
  },
  {
    label: "Telehealth & Mental Health",
    accent: ACCENT,
    // Brain silhouette with center divider
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 3a3.5 3.5 0 0 0-3.5 3.5A3 3 0 0 0 5 9.5v0a3 3 0 0 0-1 5.7v0a3 3 0 0 0 3 3v.3a2.5 2.5 0 0 0 2.5 2.5h2A2.5 2.5 0 0 0 14 18.5v-.3a3 3 0 0 0 3-3v0a3 3 0 0 0 3-3v0a3 3 0 0 0-1-5.7A3 3 0 0 0 15.5 6.5 3.5 3.5 0 0 0 12 3zM12 3v18" />
      </svg>
    ),
  },
  {
    label: "DTC & E-Commerce",
    accent: BRAND,
    // Shopping bag with handle
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Mobile Apps & Games",
    accent: ACCENT,
    // Game controller
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M5 9h14a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-1l-2-3H8l-2 3H5a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3z" />
        <path d="M7 12v3M5.5 13.5h3M15 12h.01M17 14h.01M17.5 11h.01M14.5 14h.01" />
      </svg>
    ),
  },
  {
    label: "Pet Food & Wellness",
    accent: BRAND,
    // Paw print
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="8" cy="7" r="2" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
        <path d="M12 22a4 4 0 0 1-4-4c0-3 4-7 4-7s4 4 4 7a4 4 0 0 1-4 4z" />
      </svg>
    ),
  },
  {
    label: "Apparel & Underwear",
    accent: ACCENT,
    // Clothing hanger
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v2a1 1 0 0 0 .55.9l8.2 4.1c.83.42.53 1.5-.4 1.5H3.65c-.93 0-1.23-1.08-.4-1.5l8.2-4.1A1 1 0 0 0 12 9" />
      </svg>
    ),
  },
  {
    label: "CPG & Snacks",
    accent: BRAND,
    // Snack bag with horizontal seal lines
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M7 4l-1 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6l-1-2H7zM6 6h12M9 11h6M9 15h6" />
      </svg>
    ),
  },
  {
    label: "Smart Home & Tech",
    accent: ACCENT,
    // WiFi signal waves
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0" />
        <circle cx="12" cy="20" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
];

const pillVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const pillStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const credentials = [
  {
    accent: "var(--color-brand-500)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.