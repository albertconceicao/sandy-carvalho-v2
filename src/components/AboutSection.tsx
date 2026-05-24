import type { SiteContent } from "@/lib/content/types";
import { SectionImage } from "./SectionImage";

type AboutSectionProps = {
  content: SiteContent["about"];
};

const AboutSection = ({ content }: AboutSectionProps) => {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <SectionImage image={content.image} className="rounded-lg object-cover" />
        </div>
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0 ${
                  index === content.paragraphs.length - 1 ? "font-bold" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
