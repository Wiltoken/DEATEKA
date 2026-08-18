export const SESSION_COOKIE_NAME = "deateka_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

export function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET no está definido en las variables de entorno.");
  }
  return new TextEncoder().encode(secret);
}
