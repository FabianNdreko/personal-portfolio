import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const SHORT_LIMIT = 10;
const SHORT_WINDOW_MS = 10 * 60 * 1000;
const DAILY_LIMIT = 20;

type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

type MemoryBucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, MemoryBucket>();

function memoryLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const current = memoryBuckets.get(key);

  if (!current || now >= current.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (current.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { ok: true };
}

function isUpstashConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}

let shortLimiter: Ratelimit | null = null;
let dailyLimiter: Ratelimit | null = null;

function getUpstashLimiters() {
  if (!isUpstashConfigured()) return null;

  if (!shortLimiter || !dailyLimiter) {
    const redis = Redis.fromEnv();
    shortLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(SHORT_LIMIT, "10 m"),
      prefix: "rl:chat:short",
      analytics: false,
    });
    dailyLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(DAILY_LIMIT, "1 d"),
      prefix: "rl:chat:daily",
      analytics: false,
    });
  }

  return { shortLimiter, dailyLimiter };
}

/**
 * Chat rate limits per client key (usually IP).
 * Uses Upstash Redis when configured; falls back to in-memory for local/dev.
 */
export async function rateLimitChat(clientKey: string): Promise<RateLimitResult> {
  const upstash = getUpstashLimiters();

  if (!upstash) {
    const short = memoryLimit(
      `chat:short:${clientKey}`,
      SHORT_LIMIT,
      SHORT_WINDOW_MS,
    );
    if (!short.ok) return short;

    return memoryLimit(
      `chat:daily:${clientKey}`,
      DAILY_LIMIT,
      24 * 60 * 60 * 1000,
    );
  }

  const short = await upstash.shortLimiter.limit(clientKey);
  if (!short.success) {
    return {
      ok: false,
      retryAfterSec: Math.max(
        1,
        Math.ceil((short.reset - Date.now()) / 1000),
      ),
    };
  }

  const daily = await upstash.dailyLimiter.limit(clientKey);
  if (!daily.success) {
    return {
      ok: false,
      retryAfterSec: Math.max(
        1,
        Math.ceil((daily.reset - Date.now()) / 1000),
      ),
    };
  }

  return { ok: true };
}

export function isDurableRateLimitConfigured() {
  return isUpstashConfigured();
}
