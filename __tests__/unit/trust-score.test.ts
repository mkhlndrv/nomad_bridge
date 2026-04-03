import { describe, it, expect } from 'vitest';
import { adjustTrustScore, calculateVerificationLevel } from '../../lib/trust-score';

describe('Trust Score Logic', () => {
  describe('adjustTrustScore', () => {
    it('should add positive delta correctly', () => {
      expect(adjustTrustScore(5, 3)).toBe(8);
    });

    it('should subtract negative delta correctly', () => {
      expect(adjustTrustScore(5, -3)).toBe(2);
    });

    it('should enforce the -10 floor exactly', () => {
      expect(adjustTrustScore(-5, -6)).toBe(-10);
      expect(adjustTrustScore(-10, -5)).toBe(-10);
    });
  });

  describe('calculateVerificationLevel', () => {
    it('should return COMMUNITY_VERIFIED for scores 30 and above', () => {
      expect(calculateVerificationLevel(false, 30)).toBe('COMMUNITY_VERIFIED');
      expect(calculateVerificationLevel(true, 50)).toBe('COMMUNITY_VERIFIED');
    });

    it('should return EMAIL_VERIFIED if email is verified and score < 30', () => {
      expect(calculateVerificationLevel(true, 10)).toBe('EMAIL_VERIFIED');
      expect(calculateVerificationLevel(true, -5)).toBe('EMAIL_VERIFIED');
    });

    it('should return UNVERIFIED if neither criteria is met', () => {
      expect(calculateVerificationLevel(false, 15)).toBe('UNVERIFIED');
    });
  });
});
