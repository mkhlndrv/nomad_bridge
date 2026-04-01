# T.2.01: Update User Schema for Profile Fields

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** PRF-DISPLAY-01, PRF-DISPLAY-03, PRF-DISPLAY-06, PRF-TRUST-01, PRF-TRUST-09, PRF-DISPLAY-09

## Description
Add new fields to the User model in the Prisma schema to support the full participant profile. The current User model already has `name`, `email`, `bio`, `role`, and `trustScore`. This task adds `avatarUrl` (optional String for profile photo), `skills` (comma-separated String, matching the SQLite pattern used for Event tags), `location` (optional String for current city), and `emailVerified` (Boolean, default false). Additionally, create a new `TrustScoreLog` model to track every trust score adjustment with fields: `id`, `userId`, `delta` (Int), `reason` (String), `newScore` (Int), and `createdAt`. After updating the schema, run `npx prisma db push` to apply changes to the SQLite database.

## Acceptance Criteria
- [ ] User model includes `avatarUrl String?` field
- [ ] User model includes `skills String?` field (comma-separated, like Event.tags)
- [ ] User model includes `location String?` field
- [ ] User model includes `emailVerified Boolean @default(false)` field
- [ ] New `TrustScoreLog` model exists with `id`, `userId`, `delta`, `reason`, `newScore`, `createdAt`
- [ ] TrustScoreLog has a relation back to User (and User has `trustScoreLogs TrustScoreLog[]`)
- [ ] `npx prisma db push` succeeds without errors
- [ ] Prisma Client regenerated and imports work

## Files to Create/Modify
- `prisma/schema.prisma` — Add new fields to User model; add TrustScoreLog model

## Implementation Notes
- Follow the existing pattern in schema.prisma: use `String?` for optional fields, `@default()` for defaults.
- Skills are stored as a comma-separated string (SQLite has no array type), matching the `tags` pattern on the Event model. Use `parseTags`/`formatTags` from `lib/utils.ts` when reading/writing.
- The `TrustScoreLog` model enables PRF-DISPLAY-09 (trust score breakdown) and is consumed by `lib/trust-score.ts` in T.2.12.
- No migration file needed for SQLite dev — `prisma db push` is sufficient.

## Commit Message
`chore: add profile fields and TrustScoreLog to prisma schema`
