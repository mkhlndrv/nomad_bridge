# Campus Facility Access Booking

## Intent / Vibe

Make it easy for digital nomads to discover and request university campus spaces — co-working areas, libraries, meeting rooms, cafes, and labs. Unlike a hotel booking, campus venues require coordination with a responsible venue manager who approves requests based on event quality and community interest. The experience should feel collaborative: a nomad proposes an event at a venue, the community shows interest, and the venue manager sees real demand before confirming. Social proof drives bookings — "20 people want to attend your talk at our library? Let's make it happen."

## Sub-Features

- [SF1: Venue Directory](venue-directory.md)
- [SF2: Booking Request & Interest](booking-request.md)
- [SF3: Venue Manager Dashboard](venue-manager.md)
- [SF4: My Bookings & Status](my-bookings.md)

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
