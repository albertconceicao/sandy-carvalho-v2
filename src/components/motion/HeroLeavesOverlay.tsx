"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroLeavesOverlayProps = {
  className?: string;
};

type LeafConfig = {
  id: string;
  size: number;
  xStart: string;
  xDrift: number;
  rotateStart: number;
  rotateDrift: number;
  duration: number;
  delay: number;
  opacity: number;
  blur?: boolean;
};

const FALLING_LEAVES: LeafConfig[] = [
  // Keep these mostly on the left so the "gust trail" is the hero moment.
  { id: "a", size: 24, xStart: "12%", xDrift: 34, rotateStart: -12, rotateDrift: 140, duration: 10.2, delay: 0.2, opacity: 0.52 },
  { id: "b", size: 18, xStart: "18%", xDrift: 22, rotateStart: 8, rotateDrift: 200, duration: 12.0, delay: 1.6, opacity: 0.4, blur: true },
  { id: "c", size: 20, xStart: "26%", xDrift: 28, rotateStart: -24, rotateDrift: 170, duration: 11.4, delay: 3.1, opacity: 0.44 },
  { id: "d", size: 16, xStart: "34%", xDrift: 20, rotateStart: 18, rotateDrift: 240, duration: 13.2, delay: 0.9, opacity: 0.32, blur: true },
];

function LeafSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M20 4c-4 1-7 2-10 5-3 3-4 7-5 11 4-1 8-2 11-5 3-3 4-6 4-11Z"
        fill="hsl(var(--primary) / 0.65)"
      />
      <path
        d="M6 19c3-3 6-6 12-12"
        stroke="hsl(var(--primary) / 0.55)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeroLeavesOverlay({ className }: HeroLeavesOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const driftX = useTransform(scrollY, [0, 900], [0, 120]);

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div style={{ x: driftX }} className="absolute inset-0 will-change-transform">
        {/* Gust trail: leaves pulled off the canopy and carried right. */}
        <div className="absolute left-[-2%] top-[8%] h-[360px] w-[1200px] opacity-[0.62] mix-blend-multiply dark:mix-blend-screen">
          {[
            // Gentle gust: fewer leaves, slower, softer fade.
            { id: "g1", x: 110, y: 82, size: 28, o: 0.6, r: -14, dx: 920, dy: 140, d: 10.8, delay: 0.0 },
            { id: "g2", x: 155, y: 128, size: 22, o: 0.5, r: 10, dx: 980, dy: 165, d: 11.6, delay: 0.55 },
            { id: "g3", x: 205, y: 102, size: 18, o: 0.42, r: -8, dx: 1040, dy: 125, d: 11.2, delay: 1.1 },
            { id: "g4", x: 255, y: 152, size: 24, o: 0.54, r: 16, dx: 980, dy: 195, d: 12.2, delay: 0.8 },
            { id: "g5", x: 315, y: 122, size: 16, o: 0.3, r: -10, dx: 1120, dy: 165, d: 12.8, delay: 1.6, blur: true },
          ].map((l) => (
            <motion.div
              key={l.id}
              className={cn("absolute will-change-transform", l.blur ? "blur-[0.6px]" : undefined)}
              style={{ left: l.x, top: l.y, width: l.size, height: l.size, opacity: l.o }}
              initial={{ x: 0, y: 0, rotate: l.r, scale: 0.98, opacity: 0 }}
              animate={{
                x: [0, l.dx * 0.35, l.dx],
                y: [0, -10, l.dy],
                rotate: [l.r, l.r + 70, l.r + 160],
                scale: [0.98, 1.06, 1],
                opacity: [0, l.o, 0],
              }}
              transition={{
                duration: l.d,
                delay: l.delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <LeafSvg className="h-full w-full drop-shadow-[0_10px_22px_hsl(var(--primary)/0.10)]" />
            </motion.div>
          ))}
        </div>

        {/* Falling leaves (subtle, repeated). */}
        {FALLING_LEAVES.map((leaf) => (
          <motion.div
            key={leaf.id}
            className={cn("absolute top-[-12%] will-change-transform", leaf.blur ? "blur-[0.6px]" : undefined)}
            style={{
              left: leaf.xStart,
              width: leaf.size,
              height: leaf.size,
              opacity: leaf.opacity,
              filter: leaf.blur ? "blur(0.6px)" : undefined,
            }}
            initial={{ y: "-12%", x: 0, rotate: leaf.rotateStart }}
            animate={{
              y: ["-12%", "116%"],
              x: [0, leaf.xDrift, -leaf.xDrift * 0.7, leaf.xDrift * 0.4],
              rotate: [leaf.rotateStart, leaf.rotateStart + leaf.rotateDrift],
            }}
            transition={{
              duration: leaf.duration,
              ease: "linear",
              delay: leaf.delay,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <LeafSvg className="h-full w-full drop-shadow-[0_6px_14px_hsl(var(--primary)/0.12)]" />
          </motion.div>
        ))}

        {/* Brushing cluster near the tree canopy. */}
        <motion.div
          className="absolute left-[-6%] top-[18%] h-[220px] w-[420px] opacity-[0.45] mix-blend-multiply dark:mix-blend-screen"
          initial={{ x: -10, y: 0 }}
          animate={{ x: [-10, 18, -6], y: [0, -6, 0] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {[
            { x: "12%", y: "22%", s: 14, r: -18, o: 0.42 },
            { x: "22%", y: "44%", s: 18, r: 12, o: 0.5 },
            { x: "34%", y: "30%", s: 12, r: -8, o: 0.35 },
            { x: "46%", y: "52%", s: 16, r: 26, o: 0.46 },
            { x: "58%", y: "34%", s: 10, r: -22, o: 0.28 },
          ].map((l, idx) => (
            <motion.div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              className="absolute will-change-transform"
              style={{ left: l.x, top: l.y, width: l.s, height: l.s, opacity: l.o }}
              initial={{ rotate: l.r, scale: 1 }}
              animate={{ rotate: [l.r, l.r + 18, l.r], scale: [1, 1.06, 1] }}
              transition={{ duration: 3.8 + idx * 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              <LeafSvg className="h-full w-full" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

