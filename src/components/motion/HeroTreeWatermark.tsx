"use client";

import { cn } from "@/lib/utils";

type HeroTreeWatermarkProps = {
  className?: string;
};

export function HeroTreeWatermark({ className }: HeroTreeWatermarkProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute left-[-56px] top-1/2 h-[640px] w-[640px] -translate-y-1/2 opacity-[0.16] md:left-[-24px] md:opacity-[0.12]"
        style={{
          backgroundColor: "hsl(var(--primary) / 0.9)",
          WebkitMaskImage: 'url("/oak-tree.svg")',
          maskImage: 'url("/oak-tree.svg")',
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
  );
}

