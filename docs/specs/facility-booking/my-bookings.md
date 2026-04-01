# SF4: My Bookings & Status

**Feature:** [Campus Facility Access Booking](overview.md)
**Prefix:** FAC-MYBK

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FAC-MYBK-01 | Users can view all their booking requests and confirmed bookings | Must |
| FAC-MYBK-02 | Request lifecycle displayed: Open (gathering interest) → Under Review → Approved / Rejected | Must |
| FAC-MYBK-03 | Approved bookings show: venue, date, time, QR code, status badge | Must |
| FAC-MYBK-04 | Cancellation before venue approval: no penalty | Must |
| FAC-MYBK-05 | Cancellation after approval, 24h+ before event: -2 trust score penalty | Must |
| FAC-MYBK-06 | No-show (approved booking, no check-in): -3 trust score penalty | Must |

## Frontend Components

- `MyBookings` (Server) — Two sections: Active Requests and Confirmed Bookings
  - `MyRequestCard` (Client) — Event title, venue, date, status badge (Open/Under Review/Approved/Rejected), interest count, cancel button
  - `BookingCard` (Client) — Venue, date, time, status badge, "Show QR" button, cancel button with trust penalty warning
    - `QrCodeDisplay` (Client) [shared] — Renders QR code from string value

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/booking-requests/mine` | GET | Current user's requests (all statuses) |
| `app/api/bookings` | GET | Current user's confirmed bookings (upcoming + past) |
| `app/api/bookings/[id]` | GET | Booking detail with QR code (ownership check) |
| `app/api/booking-requests/[id]/cancel` | POST | Cancel request. No penalty if before approval. -2 trust if after approval within 24h |
| `app/api/bookings/[id]/checkin` | POST | QR scan check-in. Validate QR matches booking |
