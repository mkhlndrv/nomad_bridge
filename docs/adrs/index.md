# Architecture Decision Records

> Last updated: 2026-04-01

| ID | Title | Status | Date | Feature |
|----|-------|--------|------|---------|
| [001](001-explicit-rsvp-join.md) | Use explicit EventRsvp join table | Accepted | 2026-03-25 | Event RSVP |
| [002](002-mock-auth-via-userid.md) | Mock auth via userId for MVP | Accepted | 2026-03-25 | All |
| [003](003-sqlite-no-migrations.md) | SQLite for development, no migrations | Accepted | 2026-03-25 | Infrastructure |
| [004](004-explicit-booking-times.md) | Store booking times as strings not DateTime | Accepted | 2026-03-25 | Facility Booking |

## How to Add an ADR

1. Copy the template below
2. Number sequentially (next: 005)
3. Status: Proposed → Accepted / Rejected / Superseded
4. Never edit an accepted ADR — create a new one that supersedes it

## Template

```markdown
# ADR-NNN: [Title]

**Status:** Proposed | Accepted | Rejected | Superseded by ADR-NNN
**Date:** YYYY-MM-DD
**Feature:** [Feature name]
**Deciders:** [Who made this decision]

## Context
[What is the problem or situation that requires a decision?]

## Decision
[What was decided and why?]

## Consequences
### Positive
- [Benefit 1]

### Negative
- [Trade-off 1]

### Neutral
- [Observation 1]

## Alternatives Considered
- **[Alternative A]:** [Why rejected]
```
