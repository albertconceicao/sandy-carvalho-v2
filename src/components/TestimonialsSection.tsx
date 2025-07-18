"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"; // Importar o plugin Autoplay
import TestimonialFormDialog from "./TestimonialFormDialog";

const testimonials = [
  {
    name: "Mylena Pereira",
    date: "23/06/2023",
    rating: 5,
    text: "Não tenho palavras para descrever a gratidão que sinto. Comecei a fazer acompanhamento psicológico com Stefany num momento muito delicado da minha vida e ela foi essencial nesse processo.",
  },
  {
    name: "Nicolle Castilho",
    date: "23/06/2023",
    rating: 5,
    text: "A Stefany é uma excelente profissional! Me senti acolhida e confortável desde a primeira sessão e sou muito grata tê-la como auxílio.",
  },
  {
    name: "João Silva",
    date: "15/05/2023",
    rating: 4,
    text: "A terapia me ajudou a ver as coisas de uma nova perspectiva. Recomendo muito!",
  },
  {
    name: "Ana Costa",
    date: "01/07/2023",
    rating: 5,
    text: "Profissionalismo e empatia definem o trabalho da Sandy. Me sinto muito melhor após as sessões.",
  },
];

const TestimonialsSection = () => {
  // Adicionar o plugin Autoplay ao useEmblaCarousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="relative w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4 mb-12">
          <p className="text-lg font-semibold text-secondary-foreground">DEPOIMENTOS</p>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground">
            O que meus clientes falam de mim
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-none w-full md:w-1/2 lg:w-1/3 pl-4">
                  <Card className="bg-card text-card-foreground h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                        </div>
                        {/* Placeholder for Google icon */}
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold">G</span>
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

          {/* Navigation Buttons */}
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
        </div>

        <div className="mt-12">
          <TestimonialFormDialog />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;