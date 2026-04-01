# Specification: Campus Facility Access Booking

## Intent / Vibe

Make it easy for digital nomads to discover and request university campus spaces — co-working areas, libraries, meeting rooms, cafes, and labs. Unlike a hotel booking, campus venues require coordination with a responsible venue manager who approves requests based on event quality and community interest. The experience should feel collaborative: a nomad proposes an event at a venue, the community shows interest, and the venue manager sees real demand before confirming. Social proof drives bookings — "20 people want to attend your talk at our library? Let's make it happen."

## Core Requirements

### SF1: Venue Directory

| ID | Requirement | Priority |
|----|------------|----------|
| FAC-DIR-01 | Browsable catalog of campus venues with photo cards | Must |
| FAC-DIR-02 | Each venue card shows: name, university, type (Library / Coworking / Gym / Cafe / Lab), location, operating hours, capacity, and price per hour (or "Free") | Must |
| FAC-DIR-03 | Filter by: university, venue type, price range, and capacity | Must |
| FAC-DIR-04 | Search by venue name or university | Should |
| FAC-DIR-05 | Full venue detail page: description, photos, amenities, capacity, operating hours, rules, price, and venue manager name | Must |
| FAC-DIR-06 | Show "Request-based booking" badge — venues are not instant-book | Must |

### SF2: Booking Request & Interest

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

### SF3: Venue Manager Dashboard

| ID | Requirement | Priority |
|----|------------|----------|
| FAC-MGR-01 | Venue managers (VENUE_MANAGER role) see a dashboard of incoming requests for their venues | Must |
| FAC-MGR-02 | Each request shows: requester profile + trust score, event details, interest count, requested dates | Must |
| FAC-MGR-03 | Venue manager can approve a request — confirms the date/time and generates a QR code for the booking | Must |
| FAC-MGR-04 | Venue manager can reject a request with a reason message | Must |
| FAC-MGR-05 | On approval: requester and all interested users are notified | Must |
| FAC-MGR-06 | On rejection: requester is notified with the reason | Must |
| FAC-MGR-07 | Venue manager can suggest alternative dates when rejecting or before approving | Should |

### SF4: My Bookings & Status

| ID | Requirement | Priority |
|----|------------|----------|
| FAC-MYBK-01 | Users can view all their booking requests and confirmed bookings | Must |
| FAC-MYBK-02 | Request lifecycle displayed: Open (gathering interest) → Under Review → Approved / Rejected | Must |
| FAC-MYBK-03 | Approved bookings show: venue, date, time, QR code, status badge | Must |
| FAC-MYBK-04 | Cancellation before venue approval: no penalty | Must |
| FAC-MYBK-05 | Cancellation after approval, 24h+ before event: -2 trust score penalty | Must |
| FAC-MYBK-06 | No-show (approved booking, no check-in): -3 trust score penalty | Must |

## Component Breakdown

### SF1: Venue Directory

- `VenueDirectory` (Server) — Grid of venue cards with filter bar and pagination
  - `VenueFilterBar` (Client) — Type pills, university dropdown, price range, capacity filter
  - `VenueCard` (Server) — Photo card: name, university, type badge, location, capacity, price ("Free" or "฿X/hr"), "Request-based" badge
- `VenueDetail` (Server) — Photos, description, amenities, capacity, hours, rules, price, venue manager name. "Request This Venue" button
  - `ActiveRequestsList` (Server) — Current open requests for this venue with interest counts (so users can join existing requests instead of creating new ones)

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/facilities` | GET | List with filters (type, university, price, capacity) |
| `app/api/facilities/[id]` | GET | Detail with venue manager info and active requests |

### SF2: Booking Request & Interest

- `BookingRequestForm` (Client) — Event title, description, desired date/time range, expected attendance, purpose/category. Venue pre-selected from detail page
- `RequestCard` (Server) — Public proposal: event title, requester name + trust badge, venue, date, interest count, status badge
  - `InterestButton` (Client) — "I'd attend" toggle with count. Heart or Hand icon. Optimistic update
  - `InterestBar` (Client) — Progress bar showing current interest vs venue threshold
- `BookingConfirmation` (Client) — After approval: QR code display, venue details, entry instructions
  - `QrCodeDisplay` (Client) [shared] — Renders QR code from string value

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/booking-requests` | POST | Create request. Validate user is verified. Link to venue |
| `app/api/booking-requests` | GET | List open requests. Filter by venue, status. Paginated |
| `app/api/booking-requests/[id]` | GET | Request detail with interest count and interested users |
| `app/api/booking-requests/[id]/interest` | POST | Toggle interest. Update count. Check threshold → notify venue manager if met |
| `app/api/booking-requests/[id]/submit-review` | POST | Requester manually submits for review before threshold |

### SF3: Venue Manager Dashboard

- `VenueManagerDashboard` (Server) — Summary stats + list of requests for managed venues, grouped by status
  - `ManagerRequestCard` (Client) — Requester info + trust badge, event details, interest count + bar, requested dates. Approve/Reject buttons
    - `ApproveRequestModal` (Client) — Confirm date/time, optional message. On confirm: creates booking + QR
    - `RejectRequestModal` (Client) — Reason textarea, optional alternative date suggestion
  - `VenueManagerStats` (Server) — Total requests, approval rate, upcoming confirmed events

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/booking-requests/managed` | GET | Venue manager's requests across all managed venues. Filter by status |
| `app/api/booking-requests/[id]/approve` | POST | Approve: set APPROVED, generate QR, create booking, notify requester + interested users |
| `app/api/booking-requests/[id]/reject` | POST | Reject: set REJECTED, send reason to requester |

### SF4: My Bookings & Status

- `MyBookings` (Server) — Two sections: Active Requests and Confirmed Bookings
  - `MyRequestCard` (Client) — Event title, venue, date, status badge (Open/Under Review/Approved/Rejected), interest count, cancel button
  - `BookingCard` (Client) — Venue, date, time, status badge, "Show QR" button, cancel button with trust penalty warning
    - `QrCodeDisplay` (Client) [shared] — Renders QR code from string value

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/booking-requests/mine` | GET | Current user's requests (all statuses) |
| `app/api/bookings` | GET | Current user's confirmed bookings (upcoming + past) |
| `app/api/bookings/[id]` | GET | Booking detail with QR code (ownership check) |
| `app/api/booking-requests/[id]/cancel` | POST | Cancel request. No penalty if before approval. -2 trust if after approval within 24h |
| `app/api/bookings/[id]/checkin` | POST | QR scan check-in. Validate QR matches booking |

## Edge Cases & Constraints
- If two users create overlapping requests for the same venue/time, venue manager decides which to approve.
- Venue managers should respond to requests within 48 hours — show "Awaiting response" indicator.
- Past time slots cannot be requested.
- Requests must fall within venue operating hours.
- Users with trust score < -5 cannot create booking requests (show a clear message explaining why).
- Handle venues that are temporarily unavailable (maintenance, holidays).
- Show clear messaging when a request is rejected — include the venue manager's reason.
- Interested users who expressed "I'd attend" are NOT committed — it's a soft signal, not a binding RSVP.
- Venue manager can manage multiple venues from a single dashboard.
- If a venue has no manager assigned, show "Contact university directly" message.

## Acceptance Criteria
- Users can browse venues with clear information and manager details [FAC-DIR-01, FAC-DIR-05]
- Booking request flow creates a public proposal that others can express interest in [FAC-REQ-01, FAC-REQ-03, FAC-REQ-04]
- Interest threshold triggers venue manager notification [FAC-REQ-07]
- Venue managers can approve/reject requests from their dashboard [FAC-MGR-01, FAC-MGR-03, FAC-MGR-04]
- Approval generates QR code and notifies all interested users [FAC-MGR-05]
- "My Bookings" shows request lifecycle and confirmed bookings [FAC-MYBK-01, FAC-MYBK-02]
- Cancellation policy enforced with trust score penalties [FAC-MYBK-04, FAC-MYBK-05, FAC-MYBK-06]
- The interface is fully responsive on mobile and desktop
- All validation errors show clear, helpful messages

## Definition of Done
- End-to-end flow works: browse → request → gather interest → venue approval → QR code
- Venue manager dashboard functional with approve/reject actions
- Interest system with threshold tracking works
- QR code generation on approval
- Cancellation policy enforced with trust score updates
- Responsive design on all devices
- Atomic commits used throughout implementation
