/**
 * In-memory fixed-window rate limiter.
 *
 * NOTE: Per-instance only (single Node server process). Not distributed.
 * Acceptable for this SQLite demo app. Do NOT rely on this for
 * multi-instance deployments without a shared Redis/DB backend.
 */
import { performance } from "perf_hooks";

// Map of key → { count, resetAt }
const store = new Map<string, { count: number; resetAt: number }>();

// Last time we ran a full sweep (to avoid O(n) on every call)
let lastSweepMs = 0;
const SWEEP_INTERVAL_MS = 30_000; // once every 30 s
const MAX_STORE_SIZE = 10_000;

function now(): number {
  // performance.now() is monotonic — better for rate-limiting intervals
  return performance.now();
}

function sweepExpired(nowMs: number): void {
  for (const [k, v] of store.entries()) {
    if (v.resetAt <= nowMs) {
      store.delete(k);
    }
  }
}

function ensureSweep(): void {
  const nowMs = now();
  if (nowMs - lastSweepMs > SWEEP_INTERVAL_MS || store.size > MAX_STORE_SIZE) {
    sweepExpired(nowMs);
    // Hard cap: evict oldest entries if the store is still over the limit
    // (Map iteration follows insertion order, so oldest come first).
    if (store.size > MAX_STORE_SIZE) {
      let excess = store.size - MAX_STORE_SIZE;
      for (const key of store.keys()) {
        if (excess-- <= 0) break;
        store.delete(key);
      }
    }
    lastSweepMs = nowMs;
  }
}

/**
 * Pure check — does NOT modify the bucket.
 * Returns { allowed, retryAfterMs }.
 *
 * The window length is baked into each bucket's resetAt at creation time
 * (via recordFailure), so no windowMs argument is needed here.
 */
export function checkRateLimit(
  key: string,
  limit: number
): { allowed: boolean; retryAfterMs: number } {
  ensureSweep();

  const nowMs = now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= nowMs) {
    // No entry or window expired — allowed, no retry needed
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfterMs: entry.resetAt - nowMs };
  }

  return { allowed: true, retryAfterMs: 0 };
}

/**
 * Record one failed attempt in the bucket.
 * Creates the bucket if it doesn't exist.
 */
export function recordFailure(key: string, windowMs: number): void {
  ensureSweep();

  const nowMs = now();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= nowMs) {
    store.set(key, { count: 1, resetAt: nowMs + windowMs });
    return;
  }

  entry.count++;
}

/**
 * Clear / delete the rate-limit bucket (used on successful login).
 */
export function clearRateLimit(key: string): void {
  store.delete(key);
}
