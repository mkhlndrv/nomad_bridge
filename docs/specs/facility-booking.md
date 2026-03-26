# Specification: Campus Facility Access Booking

## Intent / Vibe
Make it simple and convenient for digital nomads to find and book available university campus spaces (co-working areas, libraries, meeting rooms) for focused work or meetings. The booking experience should feel reliable, transparent, and professional.

## Core Requirements

### Facility Directory
- Show a browsable catalog of available campus facilities.
- Each facility card includes: name, university, photos, location, operating hours, capacity, and price (free or paid).
- Support filtering by university, facility type, and availability.

### Booking Flow
- User selects a facility and views available time slots on a calendar.
- User can book a specific time slot (with duration limits if applicable).
- Upon successful booking, generate a QR code as an entry pass.
- Show booking confirmation with all details.

### Cancellation Policy
- Allow cancellation up to 24 hours before the booking.
- If cancelled too late, apply a small penalty to the user’s trust score.

## Edge Cases & Constraints
- No double bookings for the same time slot.
- Handle fully booked facilities gracefully.
- Past time slots should not be bookable.
- Show clear messages when no slots are available.
- Respect facility operating hours.

## Acceptance Criteria
- Users can browse facilities and see real availability.
- Booking successfully reserves the slot and updates the database.
- QR code is generated for the booking.
- Cancellation works within the allowed window.
- The interface is clean and fully responsive.

## Definition of Done
- End-to-end booking flow works correctly
- Calendar and availability logic is accurate
- QR code generation is integrated
- Responsive design on all devices
- Basic validation and error handling
- Atomic commits used throughout implementation

This specification expresses clear user intent and detailed functional requirements.