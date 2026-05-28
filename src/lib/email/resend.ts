type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

function getNotifyEmail() {
  return process.env.NOTIFY_EMAIL ?? "contato@sandycarvalho.com.br";
}

export async function sendNotificationEmail(input: SendEmailInput) {
  if (!isResendConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[email] Resend não configurado — notificação não enviada.");
    }
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: input.to || getNotifyEmail(),
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("[email] Resend failed", response.status, body);
    return false;
  }

  return true;
}

export function getNotificationRecipient() {
  return process.env.NOTIFY_EMAIL ?? "contato@sandycarvalho.com.br";
}
