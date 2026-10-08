import { describe, it, expect } from "vitest";
import { cn, slugify, formatCount, formatRelativeTime } from "./utils";

describe("Utility Functions", () => {
  it("cn merges class names properly with tailwind-merge", () => {
    const result = cn("px-4 py-2", "px-6", { "bg-blue-500": true, "text-red-500": false });
    expect(result).toContain("px-6");
    expect(result).toContain("py-2");
    expect(result).toContain("bg-blue-500");
    expect(result).not.toContain("px-4");
  });

  it("slugify converts text into URL-safe slugs", () => {
    expect(slugify("How to Deploy Next.js 15?")).toBe("how-to-deploy-nextjs-15");
    expect(slugify("Prisma & PostgreSQL Connection Pooling!")).toBe("prisma-postgresql-connection-pooling");
  });

  it("formatCount formats large numbers cleanly", () => {
    expect(formatCount(450)).toBe("450");
    expect(formatCount(1200)).toBe("1.2k");
    expect(formatCount(1500000)).toBe("1.5m");
  });

  it("formatRelativeTime produces valid relative time strings", () => {
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
    expect(formatRelativeTime(tenMinutesAgo)).toContain("m ago");

    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoHoursAgo)).toContain("h ago");
  });
});
