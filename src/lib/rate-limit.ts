/**
 * In-memory sliding window rate limiter.
 * For production, swap with Redis-based solution.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  /** Max number of requests allowed in the window */
  maxRequests: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export const RATE_LIMIT_DEFAULTS: RateLimitConfig = {
  maxRequests: Number(process.env.AI_RATE_LIMIT_MAX) || 10,
  windowMs: Number(process.env.AI_RATE_LIMIT_WINDOW_MS) || 60_000,
};

/**
 * Check if a given identifier (e.g. userId) has exceeded rate limits.
 * Returns { allowed: true } or { allowed: false, retryAfterMs }.
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = RATE_LIMIT_DEFAULTS
): { allowed: true } | { allowed: false; retryAfterMs: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  let entry = rateLimitStore.get(identifier);

  if (!entry) {
    entry = { timestamps: [] };
    rateLimitStore.set(identifier, entry);
  }

  // Remove expired timestamps
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  if (entry.timestamps.length >= config.maxRequests) {
    const oldestInWindow = entry.timestamps[0]!;
    const retryAfterMs = oldestInWindow + config.windowMs - now;
    return { allowed: false, retryAfterMs };
  }

  entry.timestamps.push(now);
  return { allowed: true };
}

/**
 * Reset rate limit for a given identifier (useful for testing).
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}
