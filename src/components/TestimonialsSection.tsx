"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback } from "react";
import type { SiteContent, Testimonial } from "@/content/types";
import TestimonialFormDialog from "./TestimonialFormDialog";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/motion/SectionWatermark";

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
    <section id="testimonials" className="relative w-full overflow-x-hidden py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <SectionWatermark className="opacity-[0.10]" position="center" align="left" />
      <div className="container px-4 md:px-6 text-center">
        <Reveal className="space-y-4 mb-12" y={12}>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
            {content.title}
          </h2>
        </Reveal>

        {hasTestimonials ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="flex-none w-full md:w-1/2 lg:w-1/3 pl-4">
                    <Card className="bg-card text-card-foreground h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                          </div>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold">
                            G
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 rounded-full p-2 z-10 hidden md:flex"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 rounded-full p-2 z-10 hidden md:flex"
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </Button>
              </>
            ) : null}
          </div>
        ) : (
          <p className="text-primary-foreground/80 max-w-md mx-auto">
            Em breve novos depoimentos serão publicados aqui.
          </p>
        )}

        <div className="mt-12">
          <TestimonialFormDialog onPrimaryBackground />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
