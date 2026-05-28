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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setSubmit({ status: "error", message: data.error || "Something went wrong. Please try again." });
        return;
      }
      setSubmit({ status: "success" });
    } catch {
      setSubmit({ status: "error", message: "Network error. Check your connection and try again." });
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
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100%] pointer-events-none"
              style={{
                background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--color-brand-500) 50deg, transparent 110deg, transparent 360deg)",
                opacity: 0.7,
              }}
            />
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-100%] pointer-events-none"
              style={{
                background: "conic-gradient(from 180deg at 50% 50%, transparent 0deg, var(--color-accent-500) 35deg, transparent 80deg, transparent 360deg)",
                opacity: 0.5,
              }}
            />

            <div className="relative rounded-[calc(1.5rem-1.5px)] bg-[rgba(12,12,20,0.92)] backdrop-blur-xl overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-64 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 70% 60% at 50% 0%, var(--color-brand-500), transparent 70%)",
                  filter: "blur(40px)",
                  opacity: 0.35,
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 70% at 50% 100%, var(--color-accent-500), transparent 65%)",
                  filter: "blur(50px)",
                  opacity: 0.3,
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }}
              />

              <div className="relative z-10 px-6 sm:px-12 py-12 sm:py-14">
                <div className="text-center mb-8">
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-400)] mb-3"
                  >
                    Apply
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight"
                  >
                    Let&apos;s See <span className="gradient-text">If We&apos;re a Fit.</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed"
                  >
                    Drop your details and we&apos;ll have a media kit + pitch plan ready within 48 hours. No commitment, no upfront cost.
                  </motion.p>
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="max-w-xl mx-auto rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 text-center relative overflow-hidden"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
                        style={{
                          background: "radial-gradient(ellipse 60% 70% at 50% 0%, var(--color-brand-500), transparent 70%)",
                          filter: "blur(20px)",
                          opacity: 0.25,
                        }}
                      />
                      <div className="relative">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-accent-500)] text-white mb-4 shadow-lg shadow-[var(--color-brand-500)]/40">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Got it — talk soon.</h3>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed">
                          We&apos;ll review your show and reply within 48 hours with a media kit and a pitch plan. Check your inbox (and spam, just in case).
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      exit={{ opacity: 0 }}
                      className="max-w-xl mx-auto space-y-4"
                      noValidate
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cta-name" className={labelClasses}>Your name</label>
                          <input id="cta-name" name="name" type="text" required disabled={isSubmitting} value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputClasses} autoComplete="name" />
                        </div>
                        <div>
                          <label htmlFor="cta-email" className={labelClasses}>Email</label>
                          <input id="cta-email" name="email" type="email" required disabled={isSubmitting} value={form.email} onChange={handleChange} placeholder="you@yourpodcast.com" className={inputClasses} autoComplete="email" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cta-show" className={labelClasses}>Show name</label>
                          <input id="cta-show" name="showName" type="text" required disabled={isSubmitting} value={form.showName} onChange={handleChange} placeholder="The Awesome Pod" className={inputClasses} />
                        </div>
                        <div>
                          <label htmlFor="cta-dl" className={labelClasses}>Downloads / episode</label>
                          <input id="cta-dl" name="downloads" type="text" inputMode="numeric" required disabled={isSubmitting} value={form.downloads} onChange={handleChange} placeholder="50,000" className={inputClasses} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cta-msg" className={labelClasses}>
                          Anything else? <span className="text-[var(--color-text-muted)]/60 normal-case tracking-normal font-normal">(optional)</span>
                        </label>
                        <textarea id="cta-msg" name="message" rows={3} disabled={isSubmitting} value={form.message} onChange={handleChange} placeholder="Your niche, current monetization, what you're hoping for..." className={`${inputClasses} resize-none`} maxLength={5000} />
                      </div>

                      {submit.status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl border border-[var(--color-brand-500)]/40 bg-[var(--color-brand-500)]/[0.08] backdrop-blur-sm px-4 py-3 text-sm text-[var(--color-brand-400)]"
                        >
                          {submit.message}
                        </motion.div>
                      )}

                      <div className="pt-2 flex justify-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative inline-block p-[1.5px] rounded-full overflow-hidden shadow-lg shadow-[var(--color-brand-500)]/40 hover:shadow-2xl hover:shadow-[var(--color-brand-500)]/60 disabled:opacity-70 disabled:cursor-not-allowed transition-shadow duration-300"
                        >
                          <motion.span
                            aria-hidden
                            animate={{ rotate: 360 }}
                            transition={{ duration: isSubmitting ? 1.2 : 6, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-100%] pointer-events-none"
                            style={{
                              background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.9) 60deg, transparent 130deg, transparent 360deg)",
                              opacity: 0.55,
                            }}
                          />
                          <span className="relative inline-flex items-center gap-2 px-10 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-accent-500)] text-white overflow-hidden">
                            <span
                              aria-hidden
                              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
                            />
                            <span className="relative inline-flex items-center gap-2">
                              {isSubmitting ? (
                                <>
                                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={3} opacity={0.25} />
                                    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth={3} strokeLinecap="round" fill="none" />
                                  </svg>
                                  Sending…
                                </>
                              ) : (
                                <>
                                  Send It
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5 transition-transform group-hover:translate-x-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                  </svg>
                                </>
                              )}
                            </span>
                          </span>
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
