"use client";

import { cn } from "@/lib/utils";

type SectionWatermarkProps = {
  className?: string;
  position?: "top" | "center" | "bottom";
  align?: "left" | "right";
};

export function SectionWatermark({
  className,
  position = "center",
  align = "right",
}: SectionWatermarkProps) {
  const yClass =
    position === "top" ? "top-6" : position === "bottom" ? "bottom-6" : "top-1/2 -translate-y-1/2";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        viewBox="0 0 800 500"
        className={cn(
          "absolute h-[520px] w-[520px] opacity-[0.09] md:opacity-[0.075]",
          yClass,
          align === "right" ? "right-[-140px]" : "left-[-140px]",
        )}
        fill="none"
      >
        <defs>
          <radialGradient id="carvalho-watermark" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(420 250) rotate(25) scale(380 280)">
            <stop offset="0%" stopColor="hsl(var(--primary) / 1)" />
            <stop offset="70%" stopColor="hsl(var(--primary) / 0.65)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0)" />
          </radialGradient>
        </defs>

        <path
          d="M 40 260 C 140 160, 240 130, 320 150 C 420 176, 470 250, 560 250 C 660 250, 700 190, 760 120"
          stroke="url(#carvalho-watermark)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 170 210 C 210 235, 235 270, 250 315"
          stroke="url(#carvalho-watermark)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 330 190 C 370 225, 392 260, 405 305"
          stroke="url(#carvalho-watermark)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M 520 235 C 560 210, 595 180, 640 150"
          stroke="url(#carvalho-watermark)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 520 270 C 560 305, 595 335, 640 365"
          stroke="url(#carvalho-watermark)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

