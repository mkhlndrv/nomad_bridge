# T.2.09: PATCH /api/profile — Update Profile

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.2.07
**Spec References:** PRF-EDIT-01, PRF-EDIT-02, PRF-EDIT-03, PRF-EDIT-04

## Description
Create the PATCH `/api/profile` API route that allows the current user to update their profile fields. Editable fields are: `name`, `bio`, `skills`, and `location`. The endpoint must validate inputs: name is required and max 100 characters, bio is optional and max 500 characters, skills is an optional comma-separated string, and location is optional and max 100 characters. The endpoint must reject any attempt to change `email` or `role` — these fields should be silently stripped from the request body or explicitly rejected with an error. Return the updated user profile on success.

## Acceptance Criteria
- [ ] Route handler at `app/api/profile/route.ts` responds to PATCH
- [ ] Accepts and saves: `name`, `bio`, `skills`, `location`
- [ ] Validates `name` is present and <= 100 characters
- [ ] Validates `bio` is <= 500 characters (if provided)
- [ ] Validates `location` is <= 100 characters (if provided)
- [ ] Rejects or strips `email` field — cannot be changed
- [ ] Rejects or strips `role` field — cannot be changed
- [ ] Returns 400 with validation error messages for invalid input
- [ ] Returns 401 if no user identified
- [ ] Returns updated user profile on success

## Files to Create/Modify
- `app/api/profile/route.ts` — Add PATCH handler alongside existing GET handler

## Implementation Notes
- Parse the request body with `request.json()` and validate before updating.
- Explicitly pick only allowed fields: `const { name, bio, skills, location } = body`.
- Use `prisma.user.update` with only the validated fields.
- Return `NextResponse.json()` with the updated user, status 200.
- For validation errors, return `NextResponse.json({ error: "..." }, { status: 400 })`.
- Consider creating a small validation helper, but inline validation is fine for this scope.
- Same temporary auth pattern as T.2.07 (`X-User-Id` header).

## Commit Message
`feat: add PATCH /api/profile with input validation`
