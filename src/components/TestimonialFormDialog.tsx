"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { testimonialSchema, type TestimonialFormValues } from "@/lib/forms/testimonial";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
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

type TestimonialFormDialogProps = {
  triggerClassName?: string;
  /** Use on sections with `bg-primary` so the trigger stays visible */
  onPrimaryBackground?: boolean;
};

const TestimonialFormDialog = ({
  triggerClassName,
  onPrimaryBackground = false,
}: TestimonialFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      testimonial: "",
      rating: undefined,
    },
  });

  const onSubmit = async (values: TestimonialFormValues) => {
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success("Seu depoimento foi enviado com sucesso! Agradecemos sua contribuição.");
      form.reset();
      setIsOpen(false);
    } catch {
      toast.error("Não foi possível enviar o depoimento. Tente novamente.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "rounded-full px-6 py-2",
            onPrimaryBackground
              ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              : "border-primary text-primary hover:bg-accent hover:text-primary-foreground",
            triggerClassName,
          )}
        >
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
          <form
            onSubmit={form.handleSubmit(onSubmit, () => {
              toast.error("Preencha todos os campos, incluindo a avaliação com estrelas.");
            })}
            className="space-y-4"
          >
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