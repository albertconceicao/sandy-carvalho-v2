"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  getAdminSession,
  isAdminAuthConfigured,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin/auth";
import { deleteTestimonial, updateTestimonialStatus } from "@/lib/admin/data";
import type { TestimonialStatus } from "@/lib/admin/data";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Não autorizado.");
  }
}

export async function loginAction(
  _prev: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  if (!isAdminAuthConfigured()) {
    return { error: "ADMIN_PASSWORD não configurada no servidor." };
  }

  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return { error: "Senha incorreta." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateTestimonialStatusAction(id: string, status: TestimonialStatus) {
  await requireAdmin();

  try {
    await updateTestimonialStatus(id, status);
    revalidatePath("/admin/testimonials");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Não foi possível atualizar o depoimento.",
    };
  }
}

export async function deleteTestimonialAction(id: string) {
  await requireAdmin();

  try {
    await deleteTestimonial(id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Não foi possível excluir o depoimento.",
    };
  }
}
