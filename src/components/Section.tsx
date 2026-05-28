import { cn } from "@/lib/utils";

type SectionTone = "default" | "subtle" | "featured";

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

const toneClassName: Record<SectionTone, string> = {
  default: "bg-background",
  subtle: "bg-muted/25",
  featured: "bg-secondary/35",
};

export function Section({
  id,
  tone = "default",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-16 border-b border-border/60 py-14 md:py-20 lg:py-24",
        toneClassName[tone],
        className,
      )}
    >
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  );
}

