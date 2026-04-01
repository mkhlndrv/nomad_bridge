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

## Documentation Structure

```
docs/
├── specs/                          # Feature specifications
│   ├── _index.md                   # Master index with cross-deps & shared resources
│   └── <feature>/                  # One folder per feature
│       ├── overview.md             # Intent, sub-feature links, edge cases, DoD
│       └── <sub-feature>.md        # SF requirements, components, API routes
├── plans/                          # Implementation plans
│   ├── overview.md                 # Wave plan, dependency map, milestones
│   └── C.<N>-<feature>/           # One folder per component
│       ├── plan.md                 # Sprint breakdown, task tables, DoD checklists
│       ├── test-map.md             # Unit + integration test definitions
│       └── tasks/T.<N>.<NN>-*.md  # Individual task files (~168 total)
├── knowledge-base.md               # Project context, entities, NFRs
└── adrs/                           # Architecture decision records
```

- Specs are organized by **feature** (folder) → **sub-feature** (SF .md files)
- Plans are organized by **component** (C.1-C.8) → **sprint** → **tasks** (T.X.XX)
- Every .md file includes a `> Last updated: YYYY-MM-DD` date line
- 32 sub-features across 8 features, 196 total requirements

## Current Schema Status

The Prisma schema (`prisma/schema.prisma`) has basic models but significant gaps vs specs:
- **Missing roles:** VENUE_MANAGER
- **Missing User fields:** skills, avatarUrl, location, emailVerified, verificationLevel
- **Missing models:** BookingRequest, BookingInterest, TrustScoreLog, Notification, NotificationPreference, Recording, RecordingNote, ForumReply, ForumVote, ForumBookmark, CollaborationApplication
- **Needs rename:** LectureOpportunity → CollaborationOpportunity + CollaborationType enum
- **Missing Event fields:** isCommunity, eventType
- **Missing ForumPost fields:** pinned, lastActivity, isDeleted, netScore

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

- Use the `nomadbridge-tools` MCP server when relevant.
- Prefer MCP tools for file operations, QR generation, or custom utilities.
- Always validate inputs in custom tools.

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
- Reference `docs/knowledge-base.md` for project context.
- Reference `docs/specs/_index.md` for feature index and cross-dependencies.
- Reference `docs/plans/overview.md` for implementation wave plan.
- Ask for clarification if requirements are ambiguous.
