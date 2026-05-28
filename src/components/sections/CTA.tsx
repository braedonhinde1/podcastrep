"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { FadeUp } from "@/components/ui/motion";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const inputClasses =
  "w-full px-4 py-3 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-brand-500)]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[var(--color-brand-500)]/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm";

const labelClasses =
  "block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5";

export default function CTA() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    showName: "",
    downloads: "",
    message: "",
  });
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submit.status === "error") setSubmit({ status: "idle" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit.status === "submitting") return;
    setSubmit({ status: "submitting" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setSubmit({
          status: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
        return;
      }
      setSubmit({ status: "success" });
    } catch {
      setSubmit({
        status: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  };

  const isSubmitting = submit.status === "submitting";
  const isSuccess = submit.status === "success";

  return (
    <section
      id="cta"
      className="py-24 px-6 bg-gradient-to-b from-transparent via-[var(--color-surface-raised)]/50 to-transparent"
    >
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="relative rounded-3xl p-[1.5px] overflow-hidden shadow-2xl shadow-[var(--color-brand-500)]/30">
            {/* Rotating conic ring — primary (coral) */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100%] pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--color-brand-500) 50deg, transparent 110deg, transparent 360deg)",
                opacity: 0.7,
              }}
            />
            {/* Rotating conic ring — secondary counter-rotation