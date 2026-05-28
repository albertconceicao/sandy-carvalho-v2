"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type RootDividerVariant = "hero" | "left" | "right" | "center" | "subtle";

type RootDividerProps = {
  className?: string;
  strokeClassName?: string;
  variant?: RootDividerVariant;
};

const pathsByVariant: Record<RootDividerVariant, string[]> = {
  hero: [
    "M 0 40 C 120 26, 240 10, 360 18 C 500 28, 560 56, 700 42 C 820 30, 900 8, 1010 16 C 1110 24, 1180 50, 1280 38",
    "M 120 30 C 155 44, 170 58, 182 74",
    "M 260 22 C 300 36, 322 50, 338 66",
    "M 540 50 C 580 36, 612 24, 640 14",
    "M 760 30 C 788 44, 812 58, 832 72",
    "M 980 20 C 1022 34, 1046 50, 1062 66",
  ],
  left: [
    "M 0 38 C 160 18, 260 14, 360 22 C 500 32, 580 54, 720 42 C 840 32, 960 14, 1280 36",
    "M 160 22 C 190 36, 206 50, 220 66",
    "M 420 30 C 450 42, 466 56, 480 72",
    "M 720 44 C 760 32, 792 22, 820 14",
  ],
  right: [
    "M 0 36 C 300 16, 420 34, 560 40 C 700 46, 840 18, 980 20 C 1100 22, 1180 40, 1280 38",
    "M 520 44 C 560 32, 592 22, 620 14",
    "M 860 22 C 880 34, 902 48, 920 64",
    "M 1080 26 C 1115 40, 1130 54, 1142 70",
  ],
  center: [
    "M 0 38 C 120 30, 220 12, 320 18 C 430 26, 520 44, 640 36 C 740 30, 820 10, 920 18 C 1030 28, 1120 46, 1280 36",
    "M 180 24 C 210 34, 220 48, 232 64",
    "M 520 40 C 560 26, 590 18, 620 10",
    "M 860 22 C 880 34, 902 48, 920 62",
  ],
  subtle: [
    "M 0 40 C 220 30, 360 34, 520 40 C 700 46, 900 34, 1280 38",
    "M 420 34 C 450 44, 468 56, 482 70",
  ],
};

export function RootDivider({ className, strokeClassName, variant = "center" }: RootDividerProps) {
  const prefersReducedMotion = useReducedMotion();
  const paths = pathsByVariant[variant];

  return (
    <div className={cn("relative w-full", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1280 80"
        className={cn("w-full", variant === "hero" ? "h-12 md:h-16" : "h-10 md:h-12")}
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="carvalho-root-stroke" x1="0" y1="0" x2="1280" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
            <stop offset="45%" stopColor="hsl(var(--primary) / 0.30)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.15)" />
          </linearGradient>
        </defs>

        {paths.map((d, idx) => (
          <motion.path
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            d={d}
            stroke="url(#carvalho-root-stroke)"
            strokeWidth={idx === 0 ? (variant === "hero" ? 2.4 : 2) : variant === "hero" ? 1.6 : 1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={strokeClassName}
            initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.7 }}
            whileInView={prefersReducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: idx === 0 ? (variant === "subtle" ? 1.0 : 1.2) : 0.9,
                    ease: "easeInOut",
                    delay: idx === 0 ? 0.05 : 0.14 + idx * 0.055,
                  }
            }
            viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
}

