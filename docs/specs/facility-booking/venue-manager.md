# SF3: Venue Manager Dashboard

**Feature:** [Campus Facility Access Booking](overview.md)
**Prefix:** FAC-MGR

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FAC-MGR-01 | Venue managers (VENUE_MANAGER role) see a dashboard of incoming requests for their venues | Must |
| FAC-MGR-02 | Each request shows: requester profile + trust score, event details, interest count, requested dates | Must |
| FAC-MGR-03 | Venue manager can approve a request — confirms the date/time and generates a QR code for the booking | Must |
| FAC-MGR-04 | Venue manager can reject a request with a reason message | Must |
| FAC-MGR-05 | On approval: requester and all interested users are notified | Must |
| FAC-MGR-06 | On rejection: requester is notified with the reason | Must |
| FAC-MGR-07 | Venue manager can suggest alternative dates when rejecting or before approving | Should |

## Frontend Components

- `VenueManagerDashboard` (Server) — Summary stats + list of requests for managed venues, grouped by status
  - `ManagerRequestCard` (Client) — Requester info + trust badge, event details, interest count + bar, requested dates. Approve/Reject buttons
    - `ApproveRequestModal` (Client) — Confirm date/time, optional message. On confirm: creates booking + QR
    - `RejectRequestModal` (Client) — Reason textarea, optional alternative date suggestion
  - `VenueManagerStats` (Server) — Total requests, approval rate, upcoming confirmed events

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/booking-requests/managed` | GET | Venue manager's requests across all managed venues. Filter by status |
| `app/api/booking-requests/[id]/approve` | POST | Approve: set APPROVED, generate QR, create booking, notify requester + interested users |
| `app/api/booking-requests/[id]/reject` | POST | Reject: set REJECTED, send reason to requester |
