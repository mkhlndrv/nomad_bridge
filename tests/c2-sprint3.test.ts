import { describe, it, expect } from "vitest";
import { calculateVerificationLevel, TRUST_DELTAS } from "../lib/trust-score";

describe("C.2 Sprint 3 — calculateVerificationLevel", () => {
  it("returns 'unverified' when email not verified and score 0", () => {
    expect(calculateVerificationLevel({ emailVerified: false, trustScore: 0 })).toBe("unverified");
  });

  it("returns 'unverified' when email not verified even with high score", () => {
    expect(calculateVerificationLevel({ emailVerified: false, trustScore: 50 })).toBe("unverified");
  });

  it("returns 'email_verified' when email verified but score < 30", () => {
    expect(calculateVerificationLevel({ emailVerified: true, trustScore: 15 })).toBe("email_verified");
  });

  it("returns 'email_verified' when email verified and score 0", () => {
    expect(calculateVerificationLevel({ emailVerified: true, trustScore: 0 })).toBe("email_verified");
  });

  it("returns 'email_verified' when email verified and score 29", () => {
    expect(calculateVerificationLevel({ emailVerified: true, trustScore: 29 })).toBe("email_verified");
  });

  it("returns 'community_verified' when email verified and score >= 30", () => {
    expect(calculateVerificationLevel({ emailVerified: true, trustScore: 30 })).toBe("community_verified");
  });

  it("returns 'community_verified' when email verified and score 100", () => {
    expect(calculateVerificationLevel({ emailVerified: true, trustScore: 100 })).toBe("community_verified");
  });

  it("returns 'email_verified' when email verified and score negative", () => {
    expect(calculateVerificationLevel({ emailVerified: true, trustScore: -5 })).toBe("email_verified");
  });

  it("returns 'unverified' when email not verified and score negative", () => {
    expect(calculateVerificationLevel({ emailVerified: false, trustScore: -10 })).toBe("unverified");
  });
});

describe("C.2 Sprint 3 — TRUST_DELTAS constants", () => {
  it("EVENT_ATTENDANCE is 5", () => {
    expect(TRUST_DELTAS.EVENT_ATTENDANCE).toBe(5);
  });

  it("LECTURE_COMPLETED is 10", () => {
    expect(TRUST_DELTAS.LECTURE_COMPLETED).toBe(10);
  });

  it("POSITIVE_RATING is 3", () => {
    expect(TRUST_DELTAS.POSITIVE_RATING).toBe(3);
  });

  it("NO_SHOW is -3", () => {
    expect(TRUST_DELTAS.NO_SHOW).toBe(-3);
  });

  it("LATE_CANCELLATION is -2", () => {
    expect(TRUST_DELTAS.LATE_CANCELLATION).toBe(-2);
  });

  it("NEGATIVE_RATING is -2", () => {
    expect(TRUST_DELTAS.NEGATIVE_RATING).toBe(-2);
  });
});
