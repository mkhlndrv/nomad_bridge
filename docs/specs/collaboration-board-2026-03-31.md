# Specification: Collaboration Organize Board

## Intent / Vibe

Create a vibrant two-sided marketplace where universities and nomads find meaningful ways to work together — not just guest lectures, but workshops, research projects, mentorship, and more. The board should feel like a curated opportunity hub: universities post what they need, nomads offer what they know, and the matching happens naturally through browse, invite, and apply flows. Every interaction should feel purposeful and collaborative — "Let's build something together."

## Core Requirements

### SF1: Collaboration Board & Discovery

| ID | Requirement | Priority |
|----|------------|----------|
| COL-BOARD-01 | Two clear tabs: "Requests from Universities" and "Offers from Nomads" | Must |
| COL-BOARD-02 | Both tabs show cards with key info at a glance, including collaboration type badge | Must |
| COL-BOARD-03 | Combined "All Opportunities" view available as a third option | Should |
| COL-BOARD-04 | Filter by collaboration type: Lecture, Workshop, Research, Mentorship, Project | Must |
| COL-BOARD-05 | Filter by topic, format, compensation type, university, and status | Must |
| COL-BOARD-06 | Search across titles, descriptions, and tags | Should |

### SF2: Posting (Requests & Offers)

| ID | Requirement | Priority |
|----|------------|----------|
| COL-POST-01 | Support 5 collaboration types: Guest Lecture, Workshop Co-hosting, Research Collaboration, Mentorship, Project Partnership | Must |
| COL-POST-02 | Shared fields for all types: title, description, collaboration type, preferred date range, format (in-person / online / hybrid), compensation type (paid / free / facility access), tags | Must |
| COL-POST-03 | Lecture-specific fields: expected audience size, department, talk format (talk / workshop / panel / Q&A) | Must |
| COL-POST-04 | Research-specific fields: project description, required skills, estimated duration, deliverables | Should |
| COL-POST-05 | Mentorship-specific fields: frequency (weekly / biweekly / monthly), topic area, commitment duration | Should |
| COL-POST-06 | University admins can create, edit, and close their requests | Must |
| COL-POST-07 | Nomads can create, edit, and withdraw their offers | Must |
| COL-POST-08 | Status indicator on each posting: Open, In Discussion, Matched, Completed, Cancelled | Must |
| COL-POST-09 | Skills tags from nomad profile auto-suggested when creating an offer | Should |

### SF3: Matching & Application Flow

| ID | Requirement | Priority |
|----|------------|----------|
| COL-MATCH-01 | Universities can "Invite" a nomad who has posted an offer — sends notification to the nomad | Must |
| COL-MATCH-02 | Nomads can "Apply" to a university request — sends notification to the university | Must |
| COL-MATCH-03 | When either action happens, both parties see the match in a "My Connections" section | Must |
| COL-MATCH-04 | Simple messaging: the invitation/application includes a short message from the sender | Should |
| COL-MATCH-05 | Status updates as the match progresses: Applied → In Discussion → Confirmed → Completed | Must |

### SF4: Feedback System

| ID | Requirement | Priority |
|----|------------|----------|
| COL-FEEDBACK-01 | After a collaboration is marked Completed, both sides can leave feedback | Must |
| COL-FEEDBACK-02 | Rating: 1-5 stars + optional written comment | Must |
| COL-FEEDBACK-03 | Nomad ratings contribute to their trust score (+3 per 4-5 star, -2 per 1-2 star rating) | Must |
| COL-FEEDBACK-04 | Feedback is visible on the nomad's profile (aggregated average + recent comments) | Should |

## Component Breakdown

### SF1: Collaboration Board & Discovery

- `CollaborationBoard` (Server) — Main layout with tab bar and filtered collaboration card list
  - `CollaborationTabBar` (Client) — Three tabs: "Requests from Universities", "Offers from Nomads", "All Opportunities"
  - `CollaborationFilterBar` (Client) — Filters: collaboration type, topic, format, compensation, university, status. Search input
  - `CollaborationCard` (Server) — Title, topic tags, type badge (Lecture/Workshop/Research/Mentorship/Project), status badge, poster name, format, compensation
    - `CollaborationStatusBadge` (Server) — Color-coded: Open (green), In Discussion (yellow), Matched (blue), Completed (gray)
    - `CollaborationTypeBadge` (Server) — Icon + label per type (lucide icons: Mic for Lecture, Users for Workshop, FlaskConical for Research, GraduationCap for Mentorship, Handshake for Project)

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/collaborations` | GET | List with filters (type, topic, format, status, university, collaboration type). Paginated |

### SF2: Posting (Requests & Offers)

- `CreateCollaborationForm` (Client) — Step 1: select collaboration type. Step 2: fill shared + type-specific fields based on user role (UNIVERSITY → request, NOMAD → offer)
  - `CollaborationTypeSelector` (Client) — Visual selector for 5 types with lucide icons

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/collaborations` | POST | Create posting. Validate role matches type. Rate limit: 3/week |
| `app/api/collaborations/[id]` | GET | Detail with poster profile |
| `app/api/collaborations/[id]` | PATCH | Update or change status. Enforce lifecycle: OPEN → MATCHED → COMPLETED |

### SF3: Matching & Application Flow

- `CollaborationDetail` (Server) — Page-level for viewing a posting
  - `ApplyButton` (Client) — Nomad applies to university request. Opens modal with message textarea
  - `InviteButton` (Client) — University invites nomad. Opens modal with message textarea
  - `CollaborationStatusBadge` (Server) — Reused from SF1
- `MyConnections` (Server) — All applications/invitations grouped by status with action buttons
  - `ConnectionCard` (Client) — Other party info, collaboration type badge, status, action buttons (Accept/Reject/Mark Complete)

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/collaborations/[id]/apply` | POST | Nomad applies (NOMAD role only). Create application, notify university |
| `app/api/collaborations/[id]/invite` | POST | University invites (UNIVERSITY role only). Create invitation, notify nomad |
| `app/api/collaborations/[id]/respond` | POST | Accept/reject application. On accept: status → MATCHED |
| `app/api/collaborations/[id]/complete` | POST | Mark completed. Trust score +10 for nomad |

### SF4: Feedback System

- `FeedbackForm` (Client) — Post-completion: StarRating (1-5) + comment textarea
- `FeedbackDisplay` (Server) — Aggregated average rating + recent comments

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/collaborations/[id]/feedback` | POST | Submit rating. One per party. Trust: +3 for 4-5 stars, -2 for 1-2 stars |

## Edge Cases & Constraints
- Requests and offers should only show future availability by default; past ones move to an archive.
- Prevent spam: limit to 3 new posts per user per week.
- Clear status lifecycle for each post: Open → In Discussion → Matched → Completed → Archived.
- Handle "facility access" compensation type — display it clearly, don't show a dollar amount.
- A nomad cannot apply to their own university's request (if they have a university role).
- Closed/cancelled posts should be clearly marked and non-interactive.
- Form fields adapt dynamically based on selected collaboration type — don't show irrelevant fields.
- Research and mentorship types may have longer durations — show estimated commitment clearly.

## Acceptance Criteria
- Universities and nomads can post and browse all 5 collaboration types easily [COL-BOARD-01, COL-BOARD-04, COL-POST-01]
- Form adapts fields based on selected collaboration type [COL-POST-02, COL-POST-03, COL-POST-04, COL-POST-05]
- Invite and Apply flows work with proper notifications [COL-MATCH-01, COL-MATCH-02, COL-MATCH-03]
- Feedback system updates trust scores correctly [COL-FEEDBACK-01, COL-FEEDBACK-02, COL-FEEDBACK-03]
- Status transitions are enforced — can't skip from Open to Completed [COL-POST-08, COL-MATCH-05]
- Collaboration type filter works correctly alongside other filters [COL-BOARD-04, COL-BOARD-05]
- The interface is clean, responsive, and intuitive on mobile and desktop
- All data is correctly persisted in the database

## Definition of Done
- End-to-end flow works: post → browse → apply/invite → confirm → complete → feedback
- All 5 collaboration types supported with appropriate form fields
- Responsive design on all devices
- Basic validation and error handling
- Trust score updates after feedback
- Post status lifecycle enforced
- Atomic commits used throughout implementation
