"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroRootsBackdropProps = {
  className?: string;
};

export function HeroRootsBackdrop({ className }: HeroRootsBackdropProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={prefersReducedMotion ? undefined : { duration: 0.8, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 1440 720"
        className="absolute left-1/2 top-1/2 h-[620px] w-[1240px] -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="carvalho-hero-root" x1="140" y1="360" x2="1320" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
            <stop offset="45%" stopColor="hsl(var(--primary) / 0.22)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.06)" />
          </linearGradient>
        </defs>

        {[
          "M 120 390 C 260 300, 420 240, 560 270 C 700 300, 760 420, 900 380 C 1040 340, 1120 240, 1320 250",
          "M 260 340 C 320 380, 360 430, 390 500",
          "M 420 300 C 470 330, 520 380, 560 450",
          "M 730 410 C 770 450, 820 500, 860 570",
          "M 980 320 C 1040 360, 1080 420, 1108 485",
        ].map((d, idx) => (
          <motion.path
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            d={d}
            stroke="url(#carvalho-hero-root)"
            strokeWidth={idx === 0 ? 3 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.5 }}
            animate={prefersReducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: idx === 0 ? 1.6 : 1.2,
                    ease: "easeInOut",
                    delay: idx === 0 ? 0.08 : 0.18 + idx * 0.08,
                  }
            }
          />
        ))}
      </svg>

      {!prefersReducedMotion ? (
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </motion.div>
  );
}

