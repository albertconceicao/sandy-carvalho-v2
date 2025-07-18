"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const testimonialFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  rating: z.number().min(1, { message: "Por favor, dê uma nota de 1 a 5 estrelas." }).max(5),
  testimonial: z.string().min(10, { message: "Seu depoimento deve ter pelo menos 10 caracteres." }),
});

const TestimonialFormDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      rating: 0,
      testimonial: "",
    },
  });

  const onSubmit = (values: z.infer<typeof testimonialFormSchema>) => {
    console.log("Depoimento enviado:", values);
    toast.success("Seu depoimento foi enviado com sucesso! Agradecemos sua contribuição.");
    form.reset();
    setIsOpen(false); // Fecha o diálogo após o envio
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary text-primary hover:bg-accent hover:text-primary-foreground rounded-full px-6 py-2">
          Escrever Depoimento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Escrever Depoimento</DialogTitle>
          <DialogDescription>
            Compartilhe sua experiência e ajude outras pessoas.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua Avaliação</FormLabel>
                  <FormControl>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <Star
                          key={starValue}
                          className={`h-6 w-6 cursor-pointer transition-colors ${
                            (field.value || 0) >= starValue
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                          onClick={() => field.onChange(starValue)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testimonial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu Depoimento</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escreva seu depoimento aqui..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Enviar Depoimento</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialFormDialog;