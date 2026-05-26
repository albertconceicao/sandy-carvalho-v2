import {
  formatAdminDate,
  getAvailabilityLabel,
  getContactSubmissions,
  getServiceLabel,
  getTherapyBeforeLabel,
} from "@/lib/admin/data";
import { isSupabaseConfigured } from "@/lib/supabase/server";
export const metadata = {
  title: "Contatos — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminContactsPage() {
  if (!isSupabaseConfigured()) {
    return <EmptyState message="Configure o Supabase para ver as solicitações de contato." />;
  }

  let contacts: Awaited<ReturnType<typeof getContactSubmissions>> = [];
  let error: string | null = null;

  try {
    contacts = await getContactSubmissions();
  } catch (e) {
    error = e instanceof Error ? e.message : "Erro ao carregar contatos.";
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-headline text-2xl font-semibold text-primary">
          Solicitações de atendimento
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pessoas que preencheram o formulário de contato no site.
        </p>
      </header>

      {error ? (
        <EmptyState message={error} />
      ) : contacts.length === 0 ? (
        <EmptyState message="Nenhuma solicitação de contato ainda." />
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <article
              key={contact.id}
              className="rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatAdminDate(contact.created_at)}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    WhatsApp: {contact.whatsapp}
                  </a>
                  <p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-muted-foreground hover:text-primary hover:underline"
                    >
                      {contact.email}
                    </a>
                  </p>
                </div>
              </div>

              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Detail label="Serviço" value={getServiceLabel(contact.service)} />
                <Detail label="Disponibilidade" value={getAvailabilityLabel(contact.availability)} />
                <Detail
                  label="Já fez terapia?"
                  value={getTherapyBeforeLabel(contact.therapy_before)}
                />
                {contact.reason ? <Detail label="Motivo" value={contact.reason} className="sm:col-span-2" /> : null}
              </dl>

              {contact.message ? (
                <div className="mt-4 rounded-md bg-secondary/60 p-3 text-sm text-secondary-foreground">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Mensagem
                  </p>
                  <p className="whitespace-pre-wrap">{contact.message}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-foreground">{value}</dd>
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
