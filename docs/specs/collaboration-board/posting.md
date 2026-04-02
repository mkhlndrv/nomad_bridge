# SF2: Posting (Requests & Offers)

**Feature:** [Collaboration Organize Board](overview.md)
**Prefix:** COL-POST
> Last updated: 2026-04-01

## Requirements

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

## Frontend Components

- `CreateCollaborationForm` (Client) — Step 1: select collaboration type. Step 2: fill shared + type-specific fields based on user role (UNIVERSITY → request, NOMAD → offer)
  - `CollaborationTypeSelector` (Client) — Visual selector for 5 types with lucide icons

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/collaborations` | POST | Create posting. Validate role matches type. Rate limit: 3/week |
| `app/api/collaborations/[id]` | GET | Detail with poster profile |
| `app/api/collaborations/[id]` | PATCH | Update or change status. Enforce lifecycle: OPEN → MATCHED → COMPLETED |

## Precision Clarifications

- **Research duration (COL-POST-04):** The `estimatedDuration` field is a free-text String (e.g., "2-3 months", "1 semester", "6 weeks"). No structured date validation — stored as-is
- **Mentorship commitment (COL-POST-05):** The `commitmentDuration` field is a free-text String (e.g., "3 months weekly", "1 hour biweekly for a semester"). The `frequency` field uses predefined options: "weekly", "biweekly", "monthly"
- **Skill tag auto-suggest (COL-POST-09):** When a NOMAD creates an offer, the frontend pre-populates skill tag suggestions from the user's own `skills` array (fetched from their profile via `GET /api/profile`). The user can accept, remove, or type new tags. Tags are stored as a comma-separated String on the CollaborationOpportunity model
- **Rate limit:** Maximum 3 collaboration postings per user per rolling 7-day window. The API checks count of user's collaborations with `createdAt > (now - 7 days)`. Return 429 if exceeded
