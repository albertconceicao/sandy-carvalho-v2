import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SiteContent } from "@/content/types";

type ServicesSectionProps = {
  content: SiteContent["services"];
};

const ServicesSection = ({ content }: ServicesSectionProps) => {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((service, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{service.title}</CardTitle>
                {service.subtitle ? (
                  <CardDescription className="text-lg text-primary">{service.subtitle}</CardDescription>
                ) : null}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-muted-foreground mb-4">{service.description}</p>

                {service.details ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mt-4 mb-2">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{service.details.title}</DialogTitle>
                        <DialogDescription>{service.details.description}</DialogDescription>
                      </DialogHeader>
                      <ul className="text-muted-foreground list-disc list-inside space-y-2">
                        {service.details.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </DialogContent>
                  </Dialog>
                ) : null}

                <Link href="#contact" className="mt-auto">
                  <Button className="w-full">{service.buttonLabel}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
