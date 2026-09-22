"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function MotionReveal({ children, className = "", delay = 0, immediate = false }: { children: ReactNode; className?: string; delay?: number; immediate?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={!reduceMotion && immediate ? { opacity: 1, y: 0 } : undefined}
      whileInView={!reduceMotion && !immediate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
