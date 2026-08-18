export const SESSION_COOKIE_NAME = "deateka_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

export function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET no está definido. Generá uno con: openssl rand -base64 32"
    );
  }
  if (secret.length < 32) {
    throw new Error(
      "AUTH_SECRET debe tener al menos 32 caracteres. Generá uno nuevo con: openssl rand -base64 32"
    );
  }
  return new TextEncoder().encode(secret);
}
