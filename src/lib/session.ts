import { SignJWT, jwtVerify } from "jose";
import { getAuthSecret, SESSION_MAX_AGE } from "@/lib/auth-config";

export type SessionPayload = {
  userId: string;
  role: string;
  name: string;
  tokenVersion: number;
};

export async function createSessionToken(
  payload: SessionPayload
): Promise<string> {
  return new SignJWT({
    role: payload.role,
    name: payload.name,
    tokenVersion: payload.tokenVersion,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getAuthSecret());
}

// W4: explicitly validate payload shape — fail closed on contract violation
function isValidPayload(
  payload: Record<string, unknown>
): payload is { sub: string; role: string; name: string; tokenVersion: number } {
  return (
    typeof payload.sub === "string" &&
    typeof payload.role === "string" &&
    typeof payload.name === "string" &&
    typeof payload.tokenVersion === "number"
  );
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    if (!isValidPayload(payload)) return null;
    return {
      userId: payload.sub,
      role: payload.role,
      name: payload.name,
      tokenVersion: payload.tokenVersion,
    };
  } catch {
    return null;
  }
}
