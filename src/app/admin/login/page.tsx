import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSession, isAdminAuthConfigured } from "@/lib/admin/auth";

export const metadata = {
  title: "Login — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const configured = isAdminAuthConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {configured ? (
        <LoginForm />
      ) : (
        <div className="max-w-md rounded-lg border border-border bg-card p-6 text-center shadow-sm">
          <h1 className="font-headline text-xl font-semibold text-primary">Admin indisponível</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Defina <code className="text-foreground">ADMIN_PASSWORD</code> no{" "}
            <code className="text-foreground">.env.local</code> para habilitar o painel.
          </p>
        </div>
      )}
    </div>
  );
}
