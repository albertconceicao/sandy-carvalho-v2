import Link from "next/link";
import { Star } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { TestimonialRowActions } from "@/components/admin/TestimonialRowActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAdminDate, getTestimonialsForAdmin, type TestimonialStatus } from "@/lib/admin/data";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Depoimentos — Admin",
  robots: { index: false, follow: false },
};

const filters: { value: TestimonialStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendentes" },
  { value: "approved", label: "Aprovados" },
  { value: "rejected", label: "Rejeitados" },
];

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

function isActiveFilter(current: string, value: TestimonialStatus | "all") {
  return current === value;
}

export default async function AdminTestimonialsPage({ searchParams }: PageProps) {
  const { status: statusParam } = await searchParams;
  const currentFilter = filters.some((f) => f.value === statusParam)
    ? (statusParam as TestimonialStatus)
    : "all";

  if (!isSupabaseConfigured()) {
    return <EmptyState message="Configure o Supabase para gerenciar depoimentos." />;
  }

  let testimonials: Awaited<ReturnType<typeof getTestimonialsForAdmin>> = [];
  let error: string | null = null;

  try {
    testimonials = await getTestimonialsForAdmin(currentFilter);
  } catch (e) {
    error = e instanceof Error ? e.message : "Erro ao carregar depoimentos.";
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-headline text-2xl font-semibold text-primary">Depoimentos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Aprove ou rejeite depoimentos enviados pelo site. Apenas os aprovados aparecem na página
          inicial.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={
              filter.value === "all"
                ? "/admin/testimonials"
                : `/admin/testimonials?status=${filter.value}`
            }
            className={cn(
              "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
              isActiveFilter(currentFilter, filter.value)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary",
            )}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      {error ? (
        <EmptyState message={error} />
      ) : testimonials.length === 0 ? (
        <EmptyState message="Nenhum depoimento encontrado para este filtro." />
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-20">Nota</TableHead>
                <TableHead>Texto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="min-w-[200px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-0.5 text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {item.rating}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs whitespace-normal text-muted-foreground">
                    {item.text}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatAdminDate(item.created_at)}
                  </TableCell>
                  <TableCell>
                    <TestimonialRowActions id={item.id} status={item.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-12 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
