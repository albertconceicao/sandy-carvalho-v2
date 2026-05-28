"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback } from "react";
import type { SiteContent, Testimonial } from "@/content/types";
import TestimonialFormDialog from "./TestimonialFormDialog";
import { Section } from "./Section";

type TestimonialsSectionProps = {
  content: SiteContent["testimonials"];
  testimonials: Testimonial[];
};

const TestimonialsSection = ({ content, testimonials }: TestimonialsSectionProps) => {
  const hasTestimonials = testimonials.length > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: hasTestimonials && testimonials.length > 1, align: "start" },
    hasTestimonials ? [Autoplay({ delay: 5000, stopOnInteraction: false })] : [],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Section
      id="testimonials"
      tone="featured"
      className="relative overflow-x-hidden"
      containerClassName="text-center"
    >
      <div className="space-y-3 mb-10">
        <p className="text-sm font-semibold tracking-wide text-primary/80">Depoimentos</p>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
      </div>

      {hasTestimonials ? (
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-none w-full md:w-1/2 lg:w-1/3 pl-4">
                  <Card className="h-full flex flex-col bg-card/70 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-left">
                          <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                        </div>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-background/70 ring-1 ring-border/50 text-xs font-bold text-foreground">
                          G
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow text-left">
                      <div className="flex items-center mb-2">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{testimonial.text}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {testimonials.length > 1 ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background rounded-full p-2 z-10 hidden md:flex ring-1 ring-border/50"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background rounded-full p-2 z-10 hidden md:flex ring-1 ring-border/50"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </Button>
            </>
          ) : null}
        </div>
      ) : (
        <p className="text-muted-foreground max-w-md mx-auto">
          Em breve novos depoimentos serão publicados aqui.
        </p>
      )}

      <div className="mt-10">
        <TestimonialFormDialog />
      </div>
    </Section>
  );
};

export default TestimonialsSection;
