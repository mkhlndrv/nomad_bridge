# T.2.02: Create Profile Seed Data

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** T.2.01
**Spec References:** PRF-DISPLAY-01, PRF-DISPLAY-02, PRF-DISPLAY-03, PRF-DISPLAY-04, PRF-DISPLAY-05, PRF-DISPLAY-06, PRF-VERIFY-01, PRF-VERIFY-02, PRF-VERIFY-03

## Description
Create a seed script that populates the database with 5 users representing different profile states, trust score ranges, and roles. The seed data should cover all verification levels and trust score color bands so the mockup components can be visually tested. Include users with: a high trust score community-verified nomad (>=30), a mid-range email-verified nomad (0-29), a brand-new unverified nomad (score 0), a negative trust score nomad (<0), and a university staff member. Each user should have varying bio content, skills, and location fields. Also seed some related records (EventRsvp, Booking, LectureOpportunity, ForumPost) so the ActivitySummary component has real counts to display.

## Acceptance Criteria
- [ ] Seed script creates 5 users with distinct profiles
- [ ] At least one user per trust score band: green (>=30), yellow (0-29), red (<0)
- [ ] At least one user per role: NOMAD, UNIVERSITY, ADMIN
- [ ] At least one user per verification level: unverified, email verified, community verified
- [ ] Users have varying bio, skills (comma-separated), and location values
- [ ] Related records exist so activity counts are non-zero for at least 2 users
- [ ] Script is idempotent (uses `upsert` or deletes before seeding)
- [ ] Runs via `npx prisma db seed`

## Files to Create/Modify
- `prisma/seed.ts` — Create seed script with 5 users and related activity records
- `package.json` — Add `prisma.seed` config if not present

## Implementation Notes
- Use `prisma.user.upsert` keyed on `email` to make the script idempotent.
- Store skills as comma-separated strings, e.g., `"Machine Learning, UX Design, Photography"`.
- Dates should be in UTC as per project conventions.
- Reference `lib/prisma.ts` pattern for PrismaClient usage, but the seed script will import directly from `@prisma/client`.
- Include at least 1 TrustScoreLog entry for users with non-zero trust scores to support T.2.14 mockup.

## Commit Message
`chore: add profile seed data with 5 diverse users`
