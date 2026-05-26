"use client";

import { useTransition } from "react";
import { Check, Trash2, X } from "lucide-react";
import {
  deleteTestimonialAction,
  updateTestimonialStatusAction,
} from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import type { TestimonialStatus } from "@/lib/admin/data";

type TestimonialRowActionsProps = {
  id: string;
  status: TestimonialStatus;
};

export function TestimonialRowActions({ id, status }: TestimonialRowActionsProps) {
  const [isPending, startTransition] = useTransition();

  function run(action: () => Promise<{ success?: boolean; error?: string }>) {
    startTransition(async () => {
      const result = await action();
      if (result.error) {
        window.alert(result.error);
      }
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status !== "approved" && (
        <Button
          type="button"
          size="sm"
          variant="default"
          disabled={isPending}
          className="h-8 gap-1"
          onClick={() => run(() => updateTestimonialStatusAction(id, "approved"))}
        >
          <Check className="h-3.5 w-3.5" />
          Aprovar
        </Button>
      )}
      {status !== "rejected" && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isPending}
          className="h-8 gap-1"
          onClick={() => run(() => updateTestimonialStatusAction(id, "rejected"))}
        >
          <X className="h-3.5 w-3.5" />
          Rejeitar
        </Button>
      )}
      {status !== "pending" && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={isPending}
          className="h-8 gap-1"
          onClick={() => run(() => updateTestimonialStatusAction(id, "pending"))}
        >
          Pendente
        </Button>
      )}
      <Button
        type="button"
        size="sm"
        variant="ghost"
        disabled={isPending}
        className="h-8 gap-1 text-destructive hover:text-destructive"
        onClick={() => {
          if (!window.confirm("Excluir este depoimento permanentemente?")) return;
          run(() => deleteTestimonialAction(id));
        }}
      >
        <Trash2 className="h-3.5 w-3.5" />
        Excluir
      </Button>
    </div>
  );
}
