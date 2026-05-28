import type { SiteContent } from "@/content/types";
import { SectionImage } from "./SectionImage";
import { Section } from "./Section";

type AboutSectionProps = {
  content: SiteContent["about"];
};

const AboutSection = ({ content }: AboutSectionProps) => {
  return (
    <Section id="about" tone="default" containerClassName="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-xl overflow-hidden shadow-md ring-1 ring-border/40">
          <SectionImage image={content.image} className="rounded-lg object-cover" />
        </div>
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed mx-auto lg:mx-0 ${
                  index === content.paragraphs.length - 1 ? "font-bold" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
    </Section>
  );
};

export default AboutSection;
