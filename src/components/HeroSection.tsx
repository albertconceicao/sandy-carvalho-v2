import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { SiteContent } from "@/content/types";
import { SectionImage } from "./SectionImage";
import { Section } from "./Section";

type HeroSectionProps = {
  content: SiteContent["hero"];
};

const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <Section
      id="hero"
      tone="featured"
      className="relative overflow-hidden"
      containerClassName="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center"
    >
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{content.title}</h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">{content.subtitle}</p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
            <Link href="#contact">
              <Button size="lg" className="w-full min-[400px]:w-auto">
                {content.primaryCta}
              </Button>
            </Link>
            <Link href="#services">
              <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto">
                {content.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-xl overflow-hidden shadow-md ring-1 ring-border/40">
          <SectionImage image={content.image} className="rounded-lg object-cover" priority />
        </div>
    </Section>
  );
};

export default HeroSection;
