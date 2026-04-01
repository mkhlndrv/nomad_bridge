# SF2: Posting (Requests & Offers)

**Feature:** [Collaboration Organize Board](overview.md)
**Prefix:** COL-POST

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
