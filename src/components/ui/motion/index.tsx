"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

/* ─── Shared animation variants ─── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Reusable wrapper components ─── */

interface AnimatedProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fades in + slides up when it enters the viewport */
export function FadeUp({ children, className, delay = 0, ...props }: AnimatedProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Simple fade-in on scroll */
export function FadeIn({ children, className, delay = 0, ...props }: AnimatedProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Slides in from the left */
export function SlideLeft({ children, className, delay = 0, ...props }: AnimatedProps) {
  return (
    <motion.div
      variants={slideInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Slides in from the right */
export function SlideRight({ children, className, delay = 0, ...props }: AnimatedProps) {
  return (
    <motion.div
      variants={slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Scales in from slightly smaller */
export function ScaleIn({ children, className, delay = 0, ...props }: AnimatedProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its children's animations */
export function StaggerContainer({ children, className, ...props }: AnimatedProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Animated text reveal — each word fades up */
export function TextReveal({
  text,
  className,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4 }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

/** Hover card effect — lifts and glows on hover */
export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
