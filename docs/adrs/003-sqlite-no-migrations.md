# ADR-003: SQLite for Development, No Migrations

**Status:** Accepted
**Date:** 2026-03-25
**Feature:** Infrastructure
**Deciders:** Lead developer

## Context

NomadBridge is in early development with a single developer. The schema is evolving rapidly as features are specified and built. We need a database that:

1. Requires no external service or Docker container
2. Supports fast iteration on schema changes
3. Works on any developer machine without setup

## Decision

Use **SQLite** as the database with **`prisma db push`** for schema changes (no migration files).

- Database file: `prisma/dev.db` (gitignored)
- Schema changes: edit `prisma/schema.prisma`, then run `npx prisma db push`
- Reset: delete `dev.db` and re-push + re-seed

## Consequences

### Positive

- **Zero infrastructure:** No PostgreSQL/MySQL install, no Docker, no connection strings.
- **Fast iteration:** `prisma db push` applies schema changes instantly without migration history.
- **Portable:** Database is a single file. Clone + push + seed = running in seconds.
- **No migration conflicts:** No migration files to merge or resolve during parallel development.

### Negative

- **No migration history:** Can't replay migrations to reach a specific schema state. If the schema diverges, the only fix is reset + re-seed.
- **SQLite limitations:** No native `TIME` type (see ADR-004), limited concurrent write support, no `ALTER TABLE` for some operations (Prisma handles this by recreating tables).
- **Not production-ready:** Would need to migrate to PostgreSQL before production deployment.

### Neutral

- `prisma db push` may drop data on destructive schema changes. This is acceptable in development with seed data.
- The schema itself is database-agnostic — switching to PostgreSQL later requires only changing the datasource provider.

## Alternatives Considered

- **PostgreSQL via Docker:** Rejected — adds setup complexity, Docker dependency, and connection management for a single-developer MVP.
- **Prisma Migrate (migration files):** Rejected — migration files add merge conflict surface and aren't needed when the database can be freely reset.
