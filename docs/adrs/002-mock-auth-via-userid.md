# ADR-002: Mock Auth via userId for MVP

**Status:** Accepted
**Date:** 2026-03-25
**Feature:** All
**Deciders:** Lead developer

## Context

Every feature in NomadBridge requires knowing the current user (RSVP, posting, booking, profile editing, etc.). A full authentication system (OAuth, JWT, session management) would add significant complexity to the MVP.

The priority is to build and validate all 8 features end-to-end. Authentication can be swapped in later without changing business logic.

## Decision

Use **mock authentication via the `x-user-id` request header**. No auth library.

Every protected API route reads the user ID from the header:

```typescript
const userId = request.headers.get('x-user-id');
if (!userId) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const user = await prisma.user.findUnique({ where: { id: userId } });
if (!user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

Public routes (event listing, forum browsing, venue directory) do not require the header.

## Consequences

### Positive

- **Zero setup:** No OAuth providers, no JWT secrets, no session storage.
- **Easy testing:** Pass any user ID to test different roles (nomad, admin, venue manager).
- **Feature focus:** All business logic is implemented against a `User` object — swapping to real auth later only changes how `userId` is obtained.

### Negative

- **Not production-safe:** Anyone can impersonate any user by setting the header. This is acceptable for MVP/demo only.
- **No login UI:** There's no sign-in page. The "current user" is selected via header or query param.

### Neutral

- Role-based access (admin, venue manager) works the same way — just check `user.role` after lookup.
- When real auth is added, the only change is replacing the header read with session/token verification.

## Alternatives Considered

- **NextAuth.js / Auth.js:** Rejected for MVP — adds OAuth provider config, session management, and database adapter complexity before any feature is built.
- **JWT tokens:** Rejected — still requires token generation, validation, and refresh logic.
- **Cookie-based sessions:** Rejected — requires session store and CSRF protection.
