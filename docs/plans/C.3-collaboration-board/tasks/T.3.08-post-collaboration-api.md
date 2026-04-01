# T.3.08: POST /api/collaborations — Create Posting

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.3.01
**Spec References:** COL-POST-01, COL-POST-02, COL-POST-03, COL-POST-04, COL-POST-05, COL-POST-06, COL-POST-07

## Description
Implement the `POST /api/collaborations` API route that creates a new collaboration opportunity. Validate that UNIVERSITY users create requests and NOMAD users create offers. Enforce shared required fields (title, description, collaborationType, format, compensationType) and validate type-specific fields when present: LECTURE requires audienceSize and department; RESEARCH requires requiredSkills and estimatedDuration; MENTORSHIP requires frequency and topicArea. Implement a rate limit of 3 new posts per user per rolling 7-day window. Set initial status to OPEN. Return the created collaboration with 201 status.

## Acceptance Criteria
- [ ] `POST /api/collaborations` creates a new collaboration opportunity
- [ ] Request body validated: title, description, collaborationType, format, compensationType required
- [ ] UNIVERSITY users automatically get postingType "REQUEST"; NOMAD users get "OFFER"
- [ ] Lecture-specific fields validated when type is LECTURE
- [ ] Research-specific fields validated when type is RESEARCH
- [ ] Mentorship-specific fields validated when type is MENTORSHIP
- [ ] Rate limit: returns 429 if user has 3+ posts in the last 7 days
- [ ] Initial status set to OPEN
- [ ] Returns 201 with created collaboration object
- [ ] Returns 400 for missing/invalid fields with descriptive error message
- [ ] Returns 401 if no authenticated user (or mock user ID missing)

## Files to Create/Modify
- `app/api/collaborations/route.ts` — Add POST handler alongside existing GET handler

## Implementation Notes
- For rate limiting, query `prisma.collaborationOpportunity.count()` where `userId` matches and `createdAt >= 7 days ago`. If count >= 3, return 429.
- Validate type-specific fields with a switch on `collaborationType`. Missing required type-specific fields return 400.
- Tags come as a comma-separated string from the form; store as-is.
- For now, user identification can use a `x-user-id` header or hardcoded mock user until auth is implemented.
- Use Prisma `create` with all fields. Optional fields default to null.
- preferredDateStart and preferredDateEnd should be parsed as UTC Date objects.

## Commit Message
`feat: add POST /api/collaborations with validation and rate limiting`
