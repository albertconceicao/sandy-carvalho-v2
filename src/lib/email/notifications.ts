import { getServiceLabel } from "@/lib/content/labels";
import { getNotificationRecipient, sendNotificationEmail } from "@/lib/email/resend";
import { adminUrl } from "@/lib/site-url";

function whatsAppLink(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function notifyNewContact(input: {
  name: string;
  whatsapp: string;
  email: string;
  service: string;
}) {
  const to = getNotificationRecipient();
  const panelUrl = adminUrl("/admin/contacts");
  const wa = whatsAppLink(input.whatsapp);
  const serviceLabel = getServiceLabel(input.service);

  const subject = `Novo contato no site — ${input.name}`;
  const text = [
    "Novo contato no site Sandy Carvalho",
    "",
    `Nome: ${input.name}`,
    `Serviço: ${serviceLabel}`,
    `Email: ${input.email}`,
    wa ? `WhatsApp: ${wa}` : `WhatsApp: ${input.whatsapp}`,
    "",
    panelUrl
      ? `Ver detalhes no painel: ${panelUrl}`
      : "Acesse o painel /admin/contacts no site.",
  ].join("\n");

  const html = [
    "<p>Novo contato no site <strong>Sandy Carvalho</strong>.</p>",
    "<ul>",
    `<li><strong>Nome:</strong> ${escapeHtml(input.name)}</li>`,
    `<li><strong>Serviço:</strong> ${escapeHtml(serviceLabel)}</li>`,
    `<li><strong>Email:</strong> ${escapeHtml(input.email)}</li>`,
    wa
      ? `<li><strong>WhatsApp:</strong> <a href="${wa}">${escapeHtml(input.whatsapp)}</a></li>`
      : `<li><strong>WhatsApp:</strong> ${escapeHtml(input.whatsapp)}</li>`,
    "</ul>",
    panelUrl
      ? `<p><a href="${panelUrl}">Abrir painel de contatos</a></p>`
      : "<p>Acesse o painel /admin/contacts no site.</p>",
  ].join("");

  return sendNotificationEmail({ to, subject, text, html });
}

export async function notifyNewTestimonial(input: { name: string; rating: number }) {
  const to = getNotificationRecipient();
  const panelUrl = adminUrl("/admin/testimonials");

  const subject = `Novo depoimento pendente — ${input.name}`;
  const text = [
    "Novo depoimento aguardando moderação.",
    "",
    `Nome: ${input.name}`,
    `Avaliação: ${input.rating}/5`,
    "",
    "O texto completo só aparece no painel após revisão.",
    "",
    panelUrl
      ? `Moderar depoimentos: ${panelUrl}`
      : "Acesse o painel /admin/testimonials no site.",
  ].join("\n");

  const html = [
    "<p>Novo <strong>depoimento pendente</strong> no site Sandy Carvalho.</p>",
    "<ul>",
    `<li><strong>Nome:</strong> ${escapeHtml(input.name)}</li>`,
    `<li><strong>Avaliação:</strong> ${input.rating}/5</li>`,
    "</ul>",
    "<p>O texto completo está disponível apenas no painel, para moderação.</p>",
    panelUrl
      ? `<p><a href="${panelUrl}">Abrir painel de depoimentos</a></p>`
      : "<p>Acesse o painel /admin/testimonials no site.</p>",
  ].join("");

  return sendNotificationEmail({ to, subject, text, html });
}
