"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, verifyPassword, getSession, getDummyHash } from "@/lib/auth";
import { checkRateLimit, recordFailure, clearRateLimit } from "@/lib/rate-limit";

export type LoginState = {
  error: string;
};

// ---------------------------------------------------------------------------
// Safe redirect helper — W1: strict whitelist, blocks backslash bypass
// ---------------------------------------------------------------------------
function safeRedirectFrom(from: string): string {
  // Reject empty / unsafe values; only allow /admin and sub-paths
  if (/^\/admin(?:\/.*)?$/.test(from) && !from.includes("\\")) {
    return from;
  }
  return "/admin";
}

// ---------------------------------------------------------------------------
// Login — C2: email-keyed rate limit BEFORE bcrypt; best-effort IP throttle
// ---------------------------------------------------------------------------
async function getClientIP(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = h.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }
  return "unknown";
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  // 1. Cheap validation first
  const rawEmail = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!rawEmail || !password) {
    return { error: "Ingresá tu email y contraseña." };
  }
  const email = rawEmail.toLowerCase();

  // 2. Email-keyed rate limit — authoritative, before any bcrypt work
  const emailKey = `login:email:${email}`;
  const emailLimit = checkRateLimit(emailKey, 5);
  if (!emailLimit.allowed) {
    const mins = Math.max(1, Math.ceil(emailLimit.retryAfterMs / 60_000));
    return {
      error: `Demasiados intentos. Intentá de nuevo en ${mins} min.`,
    };
  }

  // 3. Best-effort IP throttle — only behind a trusted reverse proxy.
  //    Proxy headers are client-controllable; without a trusted proxy an
  //    attacker could spoof x-forwarded-for to fill/lock IP buckets. The
  //    email-keyed limit is the authoritative protection either way.
  const trustProxy = process.env.TRUST_PROXY === "true";
  const rawIP = trustProxy ? await getClientIP() : "";
  const isPlausibleIP = rawIP !== "" && rawIP !== "unknown" && /^[\d.:a-f]+$/i.test(rawIP);
  const ipKey = `login:ip:${rawIP}`;
  if (isPlausibleIP) {
    const ipLimit = checkRateLimit(ipKey, 15);
    if (!ipLimit.allowed) {
      const mins = Math.max(1, Math.ceil(ipLimit.retryAfterMs / 60_000));
      return {
        error: `Demasiados intentos. Intentá de nuevo en ${mins} min.`,
      };
    }
  }

  // 4. Fetch user; ALWAYS run bcrypt.compare (timing equity)
  const user = await prisma.user.findUnique({ where: { email } });
  const hash = user ? user.password : await getDummyHash();
  const valid = await verifyPassword(password, hash);

  if (!valid || !user) {
    // On failure: record for email key, and for IP key if plausible
    recordFailure(emailKey, 15 * 60 * 1000);
    if (isPlausibleIP) recordFailure(ipKey, 15 * 60 * 1000);
    return { error: "Credenciales inválidas." };
  }

  // 5. On success: clear both buckets
  clearRateLimit(emailKey);
  if (isPlausibleIP) clearRateLimit(ipKey);

  // 6. Create session and redirect
  await createSession({
    userId: user.id,
    role: user.role,
    name: user.name,
    tokenVersion: user.tokenVersion,
  });

  const from = String(formData.get("from") ?? "").trim();
  redirect(safeRedirectFrom(from));
}

// ---------------------------------------------------------------------------
// Logout — W3: updateMany instead of update to avoid P2025 on deleted user
// ---------------------------------------------------------------------------
export async function logout(): Promise<void> {
  const session = await getSession();
  if (session) {
    // updateMany returns {{ count: 0 }} instead of throwing when user is gone
    await prisma.user.updateMany({
      where: { id: session.userId },
      data: { tokenVersion: { increment: 1 } },
    });
  }
  await destroySession();
  redirect("/login");
}
