import { SignJWT, jwtVerify } from "jose";
import { getAuthSecret, SESSION_MAX_AGE } from "@/lib/auth-config";

export type SessionPayload = {
  userId: string;
  role: string;
  name: string;
};

export async function createSessionToken(
  payload: SessionPayload
): Promise<string> {
  return new SignJWT({ role: payload.role, name: payload.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getAuthSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    return {
      userId: payload.sub as string,
      role: payload.role as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}
