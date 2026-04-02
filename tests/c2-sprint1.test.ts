import { describe, it, expect } from "vitest";
import { getTrustScoreColor } from "../components/shared/TrustScoreBadge";

describe("C.2 Sprint 1 — TrustScoreBadge color bands", () => {
  it("returns green for score >= 30", () => {
    const result = getTrustScoreColor(30);
    expect(result.text).toBe("text-green-700");
  });

  it("returns green for high score (100)", () => {
    const result = getTrustScoreColor(100);
    expect(result.text).toBe("text-green-700");
  });

  it("returns green for score exactly 30", () => {
    const result = getTrustScoreColor(30);
    expect(result.bg).toBe("bg-green-50");
    expect(result.border).toBe("border-green-200");
  });

  it("returns yellow for score 0-29", () => {
    const result = getTrustScoreColor(15);
    expect(result.text).toBe("text-yellow-700");
  });

  it("returns yellow for score exactly 0", () => {
    const result = getTrustScoreColor(0);
    expect(result.text).toBe("text-yellow-700");
    expect(result.bg).toBe("bg-yellow-50");
  });

  it("returns yellow for score 29", () => {
    const result = getTrustScoreColor(29);
    expect(result.text).toBe("text-yellow-700");
  });

  it("returns red for negative score (-3)", () => {
    const result = getTrustScoreColor(-3);
    expect(result.text).toBe("text-red-700");
  });

  it("returns red for score -1", () => {
    const result = getTrustScoreColor(-1);
    expect(result.bg).toBe("bg-red-50");
    expect(result.border).toBe("border-red-200");
  });

  it("returns red for very negative score (-100)", () => {
    const result = getTrustScoreColor(-100);
    expect(result.text).toBe("text-red-700");
  });

  it("all color objects have text, bg, and border keys", () => {
    for (const score of [-50, -1, 0, 15, 29, 30, 50, 100]) {
      const result = getTrustScoreColor(score);
      expect(result).toHaveProperty("text");
      expect(result).toHaveProperty("bg");
      expect(result).toHaveProperty("border");
    }
  });
});

describe("C.2 Sprint 1 — parseTags utility", () => {
  // Import dynamically to avoid module resolution issues in test
  it("parses comma-separated tags", async () => {
    const { parseTags } = await import("../lib/utils");
    expect(parseTags("TypeScript, React, Node.js")).toEqual(["TypeScript", "React", "Node.js"]);
  });

  it("returns empty array for empty string", async () => {
    const { parseTags } = await import("../lib/utils");
    expect(parseTags("")).toEqual([]);
  });

  it("trims whitespace from tags", async () => {
    const { parseTags } = await import("../lib/utils");
    expect(parseTags("  a , b , c  ")).toEqual(["a", "b", "c"]);
  });

  it("handles single tag", async () => {
    const { parseTags } = await import("../lib/utils");
    expect(parseTags("Python")).toEqual(["Python"]);
  });
});
