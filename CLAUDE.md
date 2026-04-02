## Project Overview

NomadBridge connects digital nomads in Bangkok with local universities for academic events, campus facility access, guest lectures, and community discussions.

## Tech Stack

- **Framework:** Next.js 16.2 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4 + lucide-react icons
- **Database:** Prisma 7.5 + SQLite
- **Runtime:** React 19.2

## Core Principles

- Keep the codebase simple, clean, and maintainable.
- Store all dates in UTC. Display them in Asia/Bangkok timezone (`lib/utils.ts` has `formatDateBangkok`/`formatTimeBangkok`).
- UI: Clean, modern cards with good spacing.
- Never commit secrets or API keys.

## Features (8 Components)

| # | Feature | Prefix | Spec Folder | Plan Folder |
|---|---------|--------|-------------|-------------|
| 1 | Event Discovery & RSVP | EVT | `docs/specs/event-discovery-rsvp/` | `docs/plans/C.1-event-discovery-rsvp/` |
| 2 | Participant Profile & Verification | PRF | `docs/specs/participant-profile/` | `docs/plans/C.2-participant-profile/` |
| 3 | Collaboration Organize Board | COL | `docs/specs/collaboration-board/` | `docs/plans/C.3-collaboration-board/` |
| 4 | Campus Facility Access Booking | FAC | `docs/specs/facility-booking/` | `docs/plans/C.4-facility-booking/` |
| 5 | Community Discussion Board | FRM | `docs/specs/community-discussion/` | `docs/plans/C.5-community-discussion/` |
| 6 | Notifications (Email, LINE, Telegram) | NTF | `docs/specs/notifications/` | `docs/plans/C.6-notifications/` |
| 7 | Non-University Events Organizer | COM | `docs/specs/non-university-events/` | `docs/plans/C.7-non-university-events/` |
| 8 | Manage Recordings (tl;dv) | REC | `docs/specs/manage-recordings/` | `docs/plans/C.8-manage-recordings/` |

**Build order:** C.2 (Profile) → C.1 (Events) → C.6 (Notifications) → C.4 (Booking) → C.7 (Community Events) → C.3 (Collaboration) → C.5 (Forum) → C.8 (Recordings)

## Documentation Authority

See `docs/specs/_index.md` § Documentation Authority for the full priority ladder. Quick version:

1. `docs/target-schema.prisma` — canonical for models, fields, enums
2. `docs/specs/**` — canonical for feature requirements
3. `docs/knowledge-base.md` — canonical for business rules and constants
4. This file (`CLAUDE.md`) — canonical for conventions and API patterns
5. `docs/plans/**` — canonical for task sequencing

## Documentation Structure

```
docs/
├── target-schema.prisma            # Complete target Prisma schema (canonical)
├── specs/                          # Feature specifications
│   ├── _index.md                   # Master index, doc authority, cross-deps
│   ├── project-setup.md            # Seed data definitions, vitest config, test helpers
│   └── <feature>/                  # One folder per feature
│       ├── overview.md             # Intent, sub-feature links, edge cases, DoD
│       └── <sub-feature>.md        # SF requirements, components, API routes
├── plans/                          # Implementation plans
│   ├── overview.md                 # Wave plan, dependency map, milestones
│   ├── release-gate.md             # Sprint completion checklist
│   └── C.<N>-<feature>/           # One folder per component
│       ├── plan.md                 # Sprint breakdown, task tables, DoD checklists
│       ├── test-map.md             # Unit + integration test definitions
│       └── tasks/T.<N>.<NN>-*.md  # Individual task files (~168 total)
├── coursework/                     # Human-audience course deliverables (not for agents)
└── knowledge-base.md               # Project context, locked decisions, entities, NFRs
```

- Specs are organized by **feature** (folder) → **sub-feature** (SF .md files)
- Plans are organized by **component** (C.1-C.8) → **sprint** → **tasks** (T.X.XX)
- Specs and knowledge-base must include `> Last updated: YYYY-MM-DD`. Plans are recommended.
- 32 sub-features across 8 features, 196 total requirements

## Schema

- **Current state:** `prisma/schema.prisma` — the working schema applied to the database
- **Target state:** `docs/target-schema.prisma` — the complete canonical schema with all 21 models and 19 enums
- Each task file (T.X.XX) specifies which schema changes it introduces
- Always run `npx prisma db push` after schema changes

## Development Workflow

- Always start with a clear specification before implementing a feature.
- Break work into small, focused tasks (<30 min each).
- Reference task files in `docs/plans/` for acceptance criteria and implementation notes.
- Use iterative refinement: implement → test → review → improve.

## Git & Commit Rules

- Follow atomic commits: one logical change per commit.
- **Commit frequently** — after each small, working change. Do not batch up multiple features.
- Use this commit message format: `<type>: <short description>`
  - `feat: add event rsvp with capacity check`
  - `fix: prevent negative trust score on no-show`
  - `chore: update prisma schema with booking model`
  - `docs: split event-discovery-rsvp spec into feature folder`
- Never mix unrelated changes in one commit.

## Code Quality

- Write clear, readable code with good variable names.
- Handle errors gracefully.
- Keep functions small and single-purpose.
- Add basic tests for important business logic (RSVP, booking, trust score).

## Authentication (Mock — MVP)

- No auth library. Mock auth via `x-user-id` request header.
- Every protected API route: `const userId = request.headers.get('x-user-id')`
- If no userId → return `NextResponse.json({ error: "Unauthorized" }, { status: 401 })`
- Look up user: `await prisma.user.findUnique({ where: { id: userId } })`
- If user not found → 401
- Admin check: `user.role === 'ADMIN'`
- Venue manager check: `user.role === 'VENUE_MANAGER'`
- Public routes (no auth required): GET event list, GET forum threads, GET venue directory

## API Response Contracts

- Success (single): `{ data: { ... } }`
- Success (list): `{ data: [...], total: number, page: number, pageSize: number }`
- Error: `{ error: "Human-readable message" }`
- Created: 201 status + `{ data: { ... } }`
- Validation: 400 + `{ error: "Title is required" }`
- Auth: 401 + `{ error: "Unauthorized" }`
- Forbidden: 403 + `{ error: "Only the author can edit this" }`
- Not found: 404 + `{ error: "Event not found" }`
- Conflict: 409 + `{ error: "Already RSVPed to this event" }`
- Rate limited: 429 + `{ error: "Please wait before posting again" }`

## Project File Structure

```
app/
├── api/                          # API routes
│   ├── forum/                    # Feature-grouped
│   │   ├── route.ts              # GET list, POST create
│   │   └── [id]/
│   │       ├── route.ts          # GET detail, PATCH edit, DELETE
│   │       ├── vote/route.ts
│   │       └── replies/route.ts
│   ├── events/route.ts
│   ├── profile/route.ts
│   └── ...
├── forum/                        # Feature pages
│   ├── page.tsx                  # Feed/list page
│   └── [id]/page.tsx             # Detail page
├── events/page.tsx
├── profile/page.tsx
├── layout.tsx
├── page.tsx                      # Landing/home
└── globals.css
components/                       # Shared UI components (PascalCase)
├── ThreadCard.tsx
├── TrustScoreBadge.tsx
└── ...
lib/                              # Shared utilities (camelCase)
├── prisma.ts
├── utils.ts
└── ...
```

## Testing

- **Framework:** Vitest
- **Test location:** `__tests__/` directory at project root
- **Unit tests:** `__tests__/unit/` — business logic (trust-score, RSVP logic)
- **Integration tests:** `__tests__/integration/` — API route handlers
- **Run:** `npx vitest run`
- **Naming:** `<module>.test.ts`

## Seed Data

Run `npx prisma db seed` to populate development data.
Seed file: `prisma/seed.ts`

Default test users:
- Alice (NOMAD, trustScore: 25) — active nomad
- Bob (NOMAD, trustScore: 5) — new nomad
- Carol (UNIVERSITY, trustScore: 0) — university admin
- Dave (ADMIN, trustScore: 0) — platform admin
- Eve (VENUE_MANAGER, trustScore: 0) — facility manager

## Key Shared Libraries (planned)

- `lib/prisma.ts` — Prisma client singleton (exists)
- `lib/utils.ts` — Date formatting, tag parsing (exists)
- `lib/trust-score.ts` — adjustTrustScore(), calculateVerificationLevel()
- `lib/notifications.ts` — sendNotification() with channel dispatch
- `lib/mock-email.ts`, `lib/mock-line.ts`, `lib/mock-telegram.ts` — Mock notification services

## Key Shared Components (planned)

- `TrustScoreBadge` — Color-coded trust score (green >=30, yellow 0-29, red <0)
- `CapacityBar` — RSVP count vs capacity progress bar
- `QrCodeDisplay` — QR code renderer for bookings/RSVPs
- `VoteButtons` — Reddit-style up/down voting
- `InterestButton` — "I'd attend" toggle for booking requests

## MCP Usage

- The `nomadbridge-tools` MCP server is optional and not required for core development.
- It may provide convenience tools for file operations or QR generation but is not a dependency for any feature.

## Definition of Done

- Feature works end-to-end in development
- Fully responsive on mobile (375px) and desktop (1280px)
- Basic error handling included
- Database updated via Prisma (if models changed)
- At least one atomic commit with clear message
- Relevant documentation updated if needed
- All files include last updated date

## When in Doubt

- Prioritize clarity and simplicity.
- **Conflicts between docs?** Follow the authority ladder in `docs/specs/_index.md` § Documentation Authority.
- Reference `docs/target-schema.prisma` for the complete target database schema.
- Reference `docs/specs/project-setup.md` for seed data, test configuration, and test helpers.
- Reference `docs/knowledge-base.md` for project context, business rules, locked architecture decisions, and constants.
- Reference `docs/specs/_index.md` for feature index, cross-dependencies, and doc authority.
- Reference `docs/plans/overview.md` for implementation wave plan.
- Reference `docs/plans/release-gate.md` for sprint completion checklist.
- **Ignore** files in `docs/coursework/` — those are human-audience course deliverables.
- Ask for clarification if requirements are ambiguous.
