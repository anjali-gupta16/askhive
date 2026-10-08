import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimit } from "./rate-limit";

describe("Rate Limiter", () => {
  beforeEach(() => {
    resetRateLimit("test-user-1");
    resetRateLimit("test-user-2");
  });

  it("permits requests within limit", () => {
    const key = "test-user-1";
    const res1 = checkRateLimit(key, { maxRequests: 2, windowMs: 1000 });
    expect(res1.allowed).toBe(true);

    const res2 = checkRateLimit(key, { maxRequests: 2, windowMs: 1000 });
    expect(res2.allowed).toBe(true);
  });

  it("blocks requests that exceed the limit", () => {
    const key = "test-user-2";
    checkRateLimit(key, { maxRequests: 1, windowMs: 1000 });
    const blocked = checkRateLimit(key, { maxRequests: 1, windowMs: 1000 });
    expect(blocked.allowed).toBe(false);
    if (!blocked.allowed) {
      expect(blocked.retryAfterMs).toBeGreaterThan(0);
    }
  });
});
