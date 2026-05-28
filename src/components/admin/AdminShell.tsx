import { LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin/AdminNav";
import { logoutAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

type AdminShellProps = {
  children: React.ReactNode;
};

function safeStrapiAdminUrl(raw: string | undefined) {
  if (!raw) return undefined;
  const trimmed = raw.replace(/\/$/, "");
  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:" || url.protocol === "https:") return trimmed;
  } catch {
    return undefined;
  }
  return undefined;
}

export function AdminShell({ children }: AdminShellProps) {
  const strapiAdminUrl = safeStrapiAdminUrl(process.env.STRAPI_ADMIN_URL);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-border bg-card lg:w-64 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-4 px-6 py-5 lg:flex-col lg:items-stretch">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Painel
              </p>
              <h1 className="font-headline text-xl font-semibold text-primary">
                Sandy Carvalho
              </h1>
            </div>
            <form action={logoutAction} className="lg:mt-2">
              <Button type="submit" variant="outline" size="sm" className="w-full gap-2">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </form>
          </div>
          <AdminNav strapiAdminUrl={strapiAdminUrl || undefined} />
        </aside>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
