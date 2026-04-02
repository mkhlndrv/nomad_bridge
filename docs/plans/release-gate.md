# Release Gate Checklist

> Last updated: 2026-04-02

Use this checklist before marking any sprint as complete. Every item must pass.

## Schema & Data

- [ ] `prisma/schema.prisma` updated per task file (T.X.XX) requirements
- [ ] `npx prisma db push` succeeds without errors
- [ ] `npx prisma db seed` runs cleanly (no duplicate key errors)
- [ ] New seed data added for any new models introduced

## API Contracts

- [ ] All new API routes follow the response envelope defined in `CLAUDE.md` § API Response Contracts:
  - Success (single): `{ data: { ... } }`
  - Success (list): `{ data: [...], total, page, pageSize }`
  - Error: `{ error: "Human-readable message" }`
- [ ] Auth: protected routes check `x-user-id` header, return 401 if missing/invalid
- [ ] Status codes match contract: 201 (created), 400 (validation), 403 (forbidden), 404 (not found), 409 (conflict), 429 (rate limit)

## Tests

- [ ] `npx vitest run` passes (all existing + new tests)
- [ ] New business logic has unit tests in `__tests__/unit/`
- [ ] New API routes have integration tests in `__tests__/integration/`
- [ ] Tests use helpers from `__tests__/helpers/` (prisma, request, seed)

## Documentation

- [ ] `> Last updated:` date bumped on any modified spec or knowledge-base file
- [ ] If new enums/models added: `docs/target-schema.prisma` was the source (not invented during implementation)
- [ ] If business rules changed: `docs/knowledge-base.md` updated
- [ ] Task file marked as done in the corresponding `plan.md`

## Code Quality

- [ ] Atomic commit with clear message: `<type>: <description>`
- [ ] No `console.log` left in production code (except mock notification dispatchers)
- [ ] No hardcoded IDs except in seed/test files
- [ ] Error messages are human-readable and actionable

## Quick Commands

```bash
# Full gate check
npx prisma db push && npx prisma db seed && npx vitest run

# Reset database if needed
rm dev.db && npx prisma db push && npx prisma db seed
```
