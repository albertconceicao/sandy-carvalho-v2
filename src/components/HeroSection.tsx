import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { SectionImage } from "./SectionImage";

type HeroSectionProps = {
  content: SiteContent["hero"];
};

const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
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
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <SectionImage image={content.image} className="rounded-lg object-cover" priority />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
