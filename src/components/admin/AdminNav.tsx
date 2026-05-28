"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LayoutDashboard, MessageSquareQuote, Newspaper, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard, exact: true },
  { href: "/admin/testimonials", label: "Depoimentos", icon: MessageSquareQuote },
  { href: "/admin/contacts", label: "Contatos", icon: Users },
] as const;

type AdminNavProps = {
  strapiAdminUrl?: string;
};

export function AdminNav({ strapiAdminUrl }: AdminNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:flex-col lg:px-3">
      {navItems.map(({ href, label, icon: Icon, ...item }) => {
        const exact = "exact" in item && item.exact;
        const active = exact ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
      {strapiAdminUrl ? (
        <a
          href={strapiAdminUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
        >
          <Newspaper className="h-4 w-4" />
          Blog (Strapi)
          <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
        </a>
      ) : null}
    </nav>
  );
}
