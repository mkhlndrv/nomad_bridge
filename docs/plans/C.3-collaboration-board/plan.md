# C.3: Collaboration Organize Board — Implementation Plan

**Spec:** `docs/specs/collaboration-board/overview.md`
**Prefix:** COL | **Sub-features:** 4 | **Requirements:** 24
**Dependencies:** C.2 (trust, feedback), C.6 (invite/apply notifications)
**Sprints:** 4 | **Tasks:** 23

---

## Sprint 1 — Schema + Board Mockup [M1: Mockup Ready]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.3.01](tasks/T.3.01-update-collaboration-schema.md) | Update Prisma schema for collaborations | 30m | — |
| [T.3.02](tasks/T.3.02-create-collab-seed-data.md) | Create collaboration seed data | 20m | T.3.01 |
| [T.3.03](tasks/T.3.03-build-collaboration-card.md) | Build CollaborationCard mockup | 25m | — |
| [T.3.04](tasks/T.3.04-build-collaboration-board.md) | Build CollaborationBoard page | 25m | T.3.03 |
| [T.3.05](tasks/T.3.05-build-tab-and-filter-bar.md) | Build CollaborationTabBar + FilterBar | 20m | — |
| [T.3.06](tasks/T.3.06-build-type-status-badges.md) | Build type + status badge components | 15m | — |

### M1 DOD
- [ ] CollaborationOpportunity model with CollaborationType enum in Prisma
- [ ] `/collaborations` page renders with tabs (Requests/Offers/All) and cards
- [ ] Type badges: correct icon per type (Mic/Users/Flask/GraduationCap/Handshake)
- [ ] Status badges: color-coded (green/yellow/blue/gray)
- [ ] Responsive layout

---

## Sprint 2 — API + Creation Form [M2: Basic Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.3.07](tasks/T.3.07-get-collaborations-api.md) | GET /api/collaborations — list with filters | 25m | T.3.01 |
| [T.3.08](tasks/T.3.08-post-collaboration-api.md) | POST /api/collaborations — create posting | 25m | T.3.01 |
| [T.3.09](tasks/T.3.09-get-collaboration-detail-api.md) | GET /api/collaborations/[id] — detail | 20m | T.3.07 |
| [T.3.10](tasks/T.3.10-build-create-form.md) | Build CreateCollaborationForm | 30m | — |
| [T.3.11](tasks/T.3.11-build-type-selector.md) | Build CollaborationTypeSelector | 20m | — |

### M2 DOD
- [ ] List/create/view collaborations via API
- [ ] Form adapts fields based on collaboration type
- [ ] UNIVERSITY creates requests, NOMAD creates offers
- [ ] Rate limit: max 3 posts/week

---

## Sprint 3 — Matching & Application [towards M3]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.3.12](tasks/T.3.12-build-collaboration-detail.md) | Build CollaborationDetail page | 25m | T.3.09 |
| [T.3.13](tasks/T.3.13-post-apply-api.md) | POST /api/collaborations/[id]/apply | 20m | T.3.08 |
| [T.3.14](tasks/T.3.14-post-invite-api.md) | POST /api/collaborations/[id]/invite | 20m | T.3.08 |
| [T.3.15](tasks/T.3.15-post-respond-api.md) | POST /api/collaborations/[id]/respond | 25m | T.3.13 |
| [T.3.16](tasks/T.3.16-build-my-connections.md) | Build MyConnections page | 25m | T.3.15 |
| [T.3.17](tasks/T.3.17-build-connection-card.md) | Build ConnectionCard component | 20m | — |

---

## Sprint 4 — Feedback + Completion [M3: Full Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.3.18](tasks/T.3.18-post-complete-api.md) | POST /api/collaborations/[id]/complete | 20m | T.3.15 |
| [T.3.19](tasks/T.3.19-post-feedback-api.md) | POST /api/collaborations/[id]/feedback | 25m | T.3.18 |
| [T.3.20](tasks/T.3.20-build-feedback-form.md) | Build FeedbackForm component | 20m | — |
| [T.3.21](tasks/T.3.21-build-feedback-display.md) | Build FeedbackDisplay component | 20m | — |
| [T.3.22](tasks/T.3.22-patch-status-api.md) | PATCH /api/collaborations/[id] — status | 20m | T.3.08 |
| [T.3.23](tasks/T.3.23-wire-filter-bar.md) | Wire filter bar interactivity | 20m | T.3.07 |

### M3 DOD
- [ ] End-to-end: post → browse → apply/invite → confirm → complete → feedback
- [ ] All 5 collaboration types with type-specific form fields
- [ ] Status lifecycle enforced: OPEN → IN_DISCUSSION → MATCHED → COMPLETED
- [ ] Feedback updates trust: +3 for 4-5 stars, -2 for 1-2 stars
- [ ] Completion awards +10 trust to nomad
- [ ] All 24 COL-* requirements satisfied

### 🛑 M3 Stop Point (Phase 3 - Track B)
**A nomad can post an offer/request and another user can apply/invite/respond.**

### 📋 M3 Contract Check
- [ ] Ensure the 5 collaboration types mirror the knowledge base definition exactly (SkillShare vs Hackathon vs LanguageExchange vs etc).
- [ ] `TrustScore` updates from feedback are handled atomically via Prisma `$transaction`.
