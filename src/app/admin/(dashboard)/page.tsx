import Link from "next/link";
import { ArrowRight, Clock, MessageSquareQuote, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminStats } from "@/lib/admin/data";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = {
  title: "Visão geral — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <AdminMessage
        title="Supabase não configurado"
        description="Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY para ver os dados."
      />
    );
  }

  let stats = { totalTestimonials: 0, pendingTestimonials: 0, totalContacts: 0 };
  let error: string | null = null;

  try {
    stats = await getAdminStats();
  } catch (e) {
    error = e instanceof Error ? e.message : "Erro ao carregar estatísticas.";
  }

  if (error) {
    return <AdminMessage title="Erro" description={error} />;
  }

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-headline text-2xl font-semibold text-primary">Visão geral</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Resumo de depoimentos e solicitações de atendimento.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Depoimentos pendentes"
          value={stats.pendingTestimonials}
          icon={Clock}
          href="/admin/testimonials?status=pending"
          highlight={stats.pendingTestimonials > 0}
        />
        <StatCard
          title="Total de depoimentos"
          value={stats.totalTestimonials}
          icon={MessageSquareQuote}
          href="/admin/testimonials"
        />
        <StatCard
          title="Solicitações de contato"
          value={stats.totalContacts}
          icon={Users}
          href="/admin/contacts"
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  href,
  highlight,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link href={href} className="group block">
      <Card
        className={
          highlight ? "border-amber-300 bg-amber-50/50 shadow-sm" : "border-border shadow-sm"
        }
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold text-foreground">{value}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Ver detalhes
            <ArrowRight className="h-3 w-3" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function AdminMessage({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-headline text-xl font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
