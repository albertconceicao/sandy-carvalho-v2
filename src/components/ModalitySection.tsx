import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type { SiteContent } from "@/content/types";
import { SectionImage } from "./SectionImage";
import { Section } from "./Section";

type ModalitySectionProps = {
  content: SiteContent["modality"];
};

const ModalitySection = ({ content }: ModalitySectionProps) => {
  return (
    <Section id="modality" tone="default" containerClassName="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
        <div className="flex flex-col justify-center space-y-8 lg:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed mx-auto lg:mx-0">
              {content.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <Card className="bg-background/50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{content.requirementsTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-muted-foreground">
                  {content.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background/50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{content.advantagesTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-muted-foreground">
                  {content.advantages.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-xl overflow-hidden shadow-md ring-1 ring-border/40">
          <SectionImage image={content.image} className="rounded-lg object-cover" />
        </div>
    </Section>
  );
};

export default ModalitySection;
