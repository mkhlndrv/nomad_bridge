# SF3: Matching & Application Flow

**Feature:** [Collaboration Organize Board](overview.md)
**Prefix:** COL-MATCH
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| COL-MATCH-01 | Universities can "Invite" a nomad who has posted an offer — sends notification to the nomad | Must |
| COL-MATCH-02 | Nomads can "Apply" to a university request — sends notification to the university | Must |
| COL-MATCH-03 | When either action happens, both parties see the match in a "My Connections" section | Must |
| COL-MATCH-04 | Simple messaging: the invitation/application includes a short message from the sender | Should |
| COL-MATCH-05 | Status updates as the match progresses: Applied → In Discussion → Confirmed → Completed | Must |

## Frontend Components

- `CollaborationDetail` (Server) — Page-level for viewing a posting
  - `ApplyButton` (Client) — Nomad applies to university request. Opens modal with message textarea
  - `InviteButton` (Client) — University invites nomad. Opens modal with message textarea
  - `CollaborationStatusBadge` (Server) — Reused from SF1
- `MyConnections` (Server) — All applications/invitations grouped by status with action buttons
  - `ConnectionCard` (Client) — Other party info, collaboration type badge, status, action buttons (Accept/Reject/Mark Complete)

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/collaborations/[id]/apply` | POST | Nomad applies (NOMAD role only). Create application, notify university |
| `app/api/collaborations/[id]/invite` | POST | University invites (UNIVERSITY role only). Create invitation, notify nomad |
| `app/api/collaborations/[id]/respond` | POST | Accept/reject application. On accept: status → MATCHED |
| `app/api/collaborations/[id]/complete` | POST | Mark completed. Trust score +10 for nomad |
