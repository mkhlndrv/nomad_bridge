# T.2.13: GET /api/profile/trust-history

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.2.12
**Spec References:** PRF-DISPLAY-09, PRF-TRUST-10

## Description
Create the GET `/api/profile/trust-history` API route that returns a paginated list of trust score changes for the current user. Each entry includes the delta (positive or negative), the reason for the change, the resulting score after the change, and the timestamp. Results should be ordered newest-first and support cursor-based or offset pagination. This endpoint enables users to see their trust score breakdown and understand which actions contributed to their current score, fulfilling the transparency requirement.

## Acceptance Criteria
- [ ] Route handler at `app/api/profile/trust-history/route.ts` responds to GET
- [ ] Returns array of TrustScoreLog entries for the current user
- [ ] Each entry includes: `id`, `delta`, `reason`, `newScore`, `createdAt`
- [ ] Results ordered by `createdAt` descending (newest first)
- [ ] Supports pagination via `?page=1&limit=20` query parameters
- [ ] Default limit is 20, maximum limit is 50
- [ ] Returns total count for pagination UI
- [ ] Returns 401 if no user identified
- [ ] Returns empty array (not error) if user has no trust history

## Files to Create/Modify
- `app/api/profile/trust-history/route.ts` — Create GET route handler

## Implementation Notes
- Use `lib/prisma.ts` for database access.
- Parse query params: `const { searchParams } = new URL(request.url)`.
- Use Prisma `findMany` with `where: { userId }`, `orderBy: { createdAt: "desc" }`, `skip` and `take` for pagination.
- Get total count with `prisma.trustScoreLog.count({ where: { userId } })`.
- Return shape: `{ data: TrustScoreLog[], total: number, page: number, limit: number }`.
- Same temporary auth pattern as T.2.07.
- Clamp the limit: `Math.min(Math.max(parseInt(limitParam) || 20, 1), 50)`.

## Commit Message
`feat: add GET /api/profile/trust-history with pagination`
