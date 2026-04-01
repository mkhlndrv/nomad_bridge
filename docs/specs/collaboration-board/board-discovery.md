# SF1: Collaboration Board & Discovery

**Feature:** [Collaboration Organize Board](overview.md)
**Prefix:** COL-BOARD

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| COL-BOARD-01 | Two clear tabs: "Requests from Universities" and "Offers from Nomads" | Must |
| COL-BOARD-02 | Both tabs show cards with key info at a glance, including collaboration type badge | Must |
| COL-BOARD-03 | Combined "All Opportunities" view available as a third option | Should |
| COL-BOARD-04 | Filter by collaboration type: Lecture, Workshop, Research, Mentorship, Project | Must |
| COL-BOARD-05 | Filter by topic, format, compensation type, university, and status | Must |
| COL-BOARD-06 | Search across titles, descriptions, and tags | Should |

## Frontend Components

- `CollaborationBoard` (Server) — Main layout with tab bar and filtered collaboration card list
  - `CollaborationTabBar` (Client) — Three tabs: "Requests from Universities", "Offers from Nomads", "All Opportunities"
  - `CollaborationFilterBar` (Client) — Filters: collaboration type, topic, format, compensation, university, status. Search input
  - `CollaborationCard` (Server) — Title, topic tags, type badge (Lecture/Workshop/Research/Mentorship/Project), status badge, poster name, format, compensation
    - `CollaborationStatusBadge` (Server) — Color-coded: Open (green), In Discussion (yellow), Matched (blue), Completed (gray)
    - `CollaborationTypeBadge` (Server) — Icon + label per type (lucide icons: Mic for Lecture, Users for Workshop, FlaskConical for Research, GraduationCap for Mentorship, Handshake for Project)

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/collaborations` | GET | List with filters (type, topic, format, status, university, collaboration type). Paginated |
