# Specification: Campus Facility Access Booking

## Intent / Vibe

Make it simple and delightful for digital nomads to find and book university campus spaces — co-working areas, libraries, meeting rooms, cafes, and labs. The experience should feel like booking a hotel room: browse beautiful spaces, see real availability, pick your slot, and get an instant QR code to walk in. No friction, no confusion, no surprises. The cancellation policy should feel fair — flexible enough for nomad lifestyles but firm enough to prevent abuse.

## Core Requirements

### Facility Directory
- Browsable catalog of campus facilities with photo cards.
- Each facility card shows: name, university, type (Library / Coworking / Gym / Cafe / Lab), location, operating hours, price per hour (or "Free"), and availability status.
- Filter by: university, facility type, price range, and current availability.
- Search by facility name or university.

### Facility Detail Page
- Full information: description, photos, amenities, capacity, operating hours, rules, and price.
- Interactive calendar showing available time slots for the next 14 days.
- Booked slots are grayed out; available slots are selectable.
- Clear display of price calculation based on selected duration.

### Booking Flow
- User selects a facility → picks a date → chooses a time slot (start and end time).
- Review screen shows: facility name, date, time, duration, total price.
- Confirm booking → system creates the reservation and generates a QR code.
- QR code is displayed immediately and saved to "My Bookings" for future access.
- Booking confirmation includes facility location and any entry instructions.

### Cancellation Policy
- Users can cancel bookings freely up to 24 hours before the start time.
- Cancellations within 24 hours apply a -2 trust score penalty.
- No-shows (booking expires without check-in) apply a -3 trust score penalty.
- Cancelled slots become immediately available for others to book.

### My Bookings
- Users can view all their upcoming and past bookings.
- Each booking shows: facility, date, time, status (Pending / Confirmed / Cancelled), and QR code.
- Quick access to cancel or view QR code.

## Component Breakdown

### Frontend UI Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `FacilityDirectory` | Server | Grid of facility cards with filter bar and pagination |
| `FacilityFilterBar` | Client | Type pills, university dropdown, price range, availability toggle |
| `FacilityCard` | Server | Photo card: name, university, type badge, location, price ("Free" or "฿X/hr"), availability dot |
| `FacilityDetail` | Server | Photos, description, amenities, capacity, hours, rules, price. Contains BookingCalendar |
| `BookingCalendar` | Client | 14-day calendar grid. Each day shows hourly time slots. Booked = grayed, available = selectable |
| `TimeSlotGrid` | Client | Single day's slots as vertical grid. Selected slots highlighted. Max 4 consecutive hours |
| `BookingReviewPanel` | Client | Summary panel: facility, date, time, duration, calculated price. Confirm/Cancel buttons |
| `BookingConfirmation` | Client | Success: QR code display, facility details, entry instructions |
| `MyBookings` | Server | Two sections: Upcoming and Past bookings |
| `BookingCard` | Client | Facility, date, time, status badge, "Show QR" button, "Cancel" button with 24h warning |
| `CancelBookingButton` | Client | Handles cancellation with trust penalty warning if within 24h |
| `QrCodeDisplay` | Client | Renders QR code from string value (shared UI component) |

### Backend Logic Components / API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/facilities` | GET | List with filters (type, university, price, availability) |
| `app/api/facilities/[id]` | GET | Detail with bookings for next 14 days |
| `app/api/facilities/[id]/availability` | GET | Available time slots for a specific date |
| `app/api/bookings` | GET | Current user's bookings (upcoming + past) |
| `app/api/bookings` | POST | Create booking via `$transaction`: verify slot available, no overlap, trust ≥ -5, generate QR. Notify |
| `app/api/bookings/[id]` | GET | Booking detail with QR code (ownership check) |
| `app/api/bookings/[id]/cancel` | POST | Cancel. If within 24h: -2 trust score. Set CANCELLED. Free slot. Notify |
| `app/api/bookings/[id]/checkin` | POST | QR scan check-in. Validate QR matches booking |

## Edge Cases & Constraints
- No double-booking: if two users try to book the same slot simultaneously, use a database transaction to ensure only one succeeds.
- Past time slots cannot be selected.
- Bookings must fall within facility operating hours.
- Maximum booking duration: 4 hours per session (configurable per facility).
- Users with trust score < -5 cannot make new bookings (show a clear message explaining why).
- Handle facilities that are temporarily unavailable (maintenance, holidays).
- Show clear "No available slots" message when everything is booked.

## Acceptance Criteria
- Users can browse facilities with real-time availability.
- Booking flow creates a reservation and generates a QR code.
- Double-booking is prevented at the database level.
- Cancellation within 24 hours works and updates trust score.
- "My Bookings" page shows accurate booking history.
- The interface is fully responsive on mobile and desktop.
- All validation errors show clear, helpful messages.

## Definition of Done
- End-to-end booking flow works: browse → select → book → QR code
- Calendar and availability logic is accurate
- QR code generation is integrated
- Cancellation policy enforced with trust score updates
- Double-booking prevented via Prisma $transaction
- Responsive design on all devices
- Atomic commits used throughout implementation
