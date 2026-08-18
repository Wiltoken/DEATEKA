"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export type LoginState = {
  error: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Ingresá tu email y contraseña." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await verifyPassword(password, user.password))) {
    return { error: "Credenciales inválidas." };
  }

  await createSession({ userId: user.id, role: user.role, name: user.name });
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
