"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Instagram, Mail, Linkedin, Youtube } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import TestimonialFormDialog from "./TestimonialFormDialog"; // Importar o novo componente

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  whatsapp: z.string().min(10, { message: "WhatsApp inválido." }),
  email: z.string().email({ message: "Email inválido." }),
  service: z.enum(["individual_adolescent", "individual_adult", "couple", "family", "lectures"], {
    errorMap: () => ({ message: "Selecione um serviço." }),
  }),
  reason: z.string().optional(), // Conditionally required
  availability: z.enum(["morning", "afternoon", "night"], {
    errorMap: () => ({ message: "Selecione um período." }),
  }),
  therapyBefore: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Selecione uma opção." }),
  }),
  message: z.string().optional(),
});

const ContactSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      email: "",
      service: undefined,
      reason: "",
      availability: undefined,
      therapyBefore: undefined,
      message: "",
    },
  });

  const selectedService = form.watch("service");
  const showReasonField = selectedService && selectedService !== "lectures";

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Mensagem enviada com sucesso!");
    form.reset();
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Left Side: Contact Info */}
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Entre em contato
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Sua mensagem será respondida em breve!
            </p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Phone className="h-5 w-5 text-foreground" />
              <span>(31) 99118-1825</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Instagram className="h-5 w-5 text-foreground" />
              <span>@psiluizaaguiar</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Mail className="h-5 w-5 text-foreground" />
              <span>psi.luiza.aguiar@gmail.com</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Linkedin className="h-5 w-5 text-foreground" />
              <span>Luiza Aguiar</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Youtube className="h-5 w-5 text-foreground" />
              <span>@psiluizaaguiar</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full max-w-2xl mx-auto lg:mx-0 bg-card p-8 rounded-lg shadow-lg">
          <div className="flex justify-center space-x-4 mb-6">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2">
              Entre Em Contato
            </Button>
            {/* Usar o novo componente TestimonialFormDialog */}
            <TestimonialFormDialog />
          </div>

          <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Entre Em Contato Comigo</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="(XX) XXXXX-XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual serviço você está procurando?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual_adolescent">Psicoterapia individual para adolescentes</SelectItem>
                        <SelectItem value="individual_adult">Psicoterapia individual para adultos</SelectItem>
                        <SelectItem value="couple">Psicoterapia para casais</SelectItem>
                        <SelectItem value="family">Psicoterapia para famílias</SelectItem>
                        <SelectItem value="lectures">Palestras</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {showReasonField && (
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivo da busca pela psicoterapia</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descreva brevemente o motivo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Qual período você tem disponibilidade?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="morning" />
                          </FormControl>
                          <FormLabel className="font-normal">Manhã</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="afternoon" />
                          </FormControl>
                          <FormLabel className="font-normal">Tarde</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="night" />
                          </FormControl>
                          <FormLabel className="font-normal">Noite</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="therapyBefore"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Já fez terapia antes?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem (opcional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Sua mensagem será enviada por E-mail e WhatsApp." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Enviar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;