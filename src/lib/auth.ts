import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth-config";
import {
  createSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/session";

// Lazily-computed memoized dummy hash — computed once, promise cached
let dummyHashPromise: Promise<string> | null = null;
export async function getDummyHash(): Promise<string> {
  if (!dummyHashPromise) {
    dummyHashPromise = bcrypt.hash("dummy-password-for-timing-equity", 10);
  }
  return dummyHashPromise;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await createSessionToken(payload);
  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}

// Note: middleware cannot query the DB (runs at the edge), so it remains
// signature/expiry-only verification. requireAdmin is the authoritative check.
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/login");
  }
  // Authoritative check: verify tokenVersion matches DB (revocation check)
  const { prisma } = await import("@/lib/prisma");
  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || user.tokenVersion !== session.tokenVersion) {
    redirect("/login");
  }
  return session;
}
