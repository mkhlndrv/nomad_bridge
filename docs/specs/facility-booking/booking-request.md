# SF2: Booking Request & Interest

**Feature:** [Campus Facility Access Booking](overview.md)
**Prefix:** FAC-REQ
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FAC-REQ-01 | Any verified user can create a booking request for a venue | Must |
| FAC-REQ-02 | Request fields: venue, desired date/time range, event title, event description, expected attendance, purpose/category | Must |
| FAC-REQ-03 | Submitted requests appear as public proposals visible to all users | Must |
| FAC-REQ-04 | Community members can express interest ("I'd attend") on any open request | Must |
| FAC-REQ-05 | Interest counter displayed prominently on each request | Must |
| FAC-REQ-06 | Each venue has a configurable minimum interest threshold (e.g., 5 people) | Should |
| FAC-REQ-07 | When interest threshold is met, request status moves to "Under Review" and venue manager is notified | Must |
| FAC-REQ-08 | Requester can manually submit for review before threshold is met | Should |

## Frontend Components

- `BookingRequestForm` (Client) — Event title, description, desired date/time range, expected attendance, purpose/category. Venue pre-selected from detail page
- `RequestCard` (Server) — Public proposal: event title, requester name + trust badge, venue, date, interest count, status badge
  - `InterestButton` (Client) — "I'd attend" toggle with count. Heart or Hand icon. Optimistic update
  - `InterestBar` (Client) — Progress bar showing current interest vs venue threshold
- `BookingConfirmation` (Client) — After approval: QR code display, venue details, entry instructions
  - `QrCodeDisplay` (Client) [shared] — Renders QR code from string value

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/booking-requests` | POST | Create request. Validate user is verified. Link to venue |
| `app/api/booking-requests` | GET | List open requests. Filter by venue, status. Paginated |
| `app/api/booking-requests/[id]` | GET | Request detail with interest count and interested users |
| `app/api/booking-requests/[id]/interest` | POST | Toggle interest. Update count. Check threshold → notify venue manager if met |
| `app/api/booking-requests/[id]/submit-review` | POST | Requester manually submits for review before threshold |
