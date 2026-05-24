import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SiteContent } from "@/lib/content/types";

type FAQSectionProps = {
  content: SiteContent["faq"];
};

const FAQSection = ({ content }: FAQSectionProps) => {
  return (
    <section id="faq" className="w-full scroll-mt-16 py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-primary">{content.eyebrow}</p>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{content.title}</h2>
          </div>
          <div className="flex justify-center lg:justify-start">
            <Link href="#contact">
              <Button size="lg">{content.ctaLabel}</Button>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto lg:mx-0">
          <Accordion type="single" collapsible className="w-full">
            {content.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer ? <p>{item.answer}</p> : null}
                  {item.listItems?.length ? (
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {item.listItems.map((listItem, listIndex) => (
                        <li key={listIndex}>{listItem}</li>
                      ))}
                    </ul>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
