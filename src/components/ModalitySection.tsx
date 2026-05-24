import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type { SiteContent } from "@/lib/content/types";
import { SectionImage } from "./SectionImage";

type ModalitySectionProps = {
  content: SiteContent["modality"];
};

const ModalitySection = ({ content }: ModalitySectionProps) => {
  return (
    <section id="modality" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col justify-center space-y-8 lg:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              {content.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            <Card className="bg-muted/50">
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

            <Card className="bg-muted/50">
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
        <div className="relative h-[300px] w-full lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <SectionImage image={content.image} className="rounded-lg object-cover" />
        </div>
      </div>
    </section>
  );
};

export default ModalitySection;
