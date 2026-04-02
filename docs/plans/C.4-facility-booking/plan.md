# C.4: Campus Facility Access Booking — Implementation Plan

**Spec:** `docs/specs/facility-booking/overview.md`
**Prefix:** FAC | **Sub-features:** 4 | **Requirements:** 26
**Dependencies:** C.2 (trust checks), C.6 (notifications)
**Sprints:** 5 | **Tasks:** 27

---

## Sprint 1 — Schema + Venue Directory Mockup [M1: Mockup Ready]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.4.01](tasks/T.4.01-update-facility-schema.md) | Update Prisma schema for facility booking | 30m | — |
| [T.4.02](tasks/T.4.02-create-venue-seed-data.md) | Create venue seed data | 20m | T.4.01 |
| [T.4.03](tasks/T.4.03-build-venue-card.md) | Build VenueCard mockup | 20m | — |
| [T.4.04](tasks/T.4.04-build-venue-directory.md) | Build VenueDirectory page | 25m | T.4.03 |
| [T.4.05](tasks/T.4.05-build-venue-filter-bar.md) | Build VenueFilterBar mockup | 20m | — |

### M1 DOD
- [ ] VENUE_MANAGER role, BookingRequest, BookingInterest models in Prisma
- [ ] `/facilities` page renders venue cards with seed data
- [ ] Cards show name, type badge, capacity, price, "Request-based" badge
- [ ] Responsive layout

---

## Sprint 2 — Venue Detail + Booking Requests [M2 partial]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.4.06](tasks/T.4.06-get-facilities-api.md) | GET /api/facilities — list with filters | 25m | T.4.01 |
| [T.4.07](tasks/T.4.07-get-facility-detail-api.md) | GET /api/facilities/[id] — detail | 25m | T.4.06 |
| [T.4.08](tasks/T.4.08-build-venue-detail-page.md) | Build VenueDetail page | 25m | T.4.07 |
| [T.4.09](tasks/T.4.09-build-booking-request-form.md) | Build BookingRequestForm | 25m | — |
| [T.4.10](tasks/T.4.10-post-booking-request-api.md) | POST /api/booking-requests — create | 25m | T.4.01 |

---

## Sprint 3 — Interest System [M2: Basic Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.4.11](tasks/T.4.11-build-interest-button.md) | Build InterestButton shared component | 25m | — |
| [T.4.12](tasks/T.4.12-build-interest-bar.md) | Build InterestBar component | 20m | — |
| [T.4.13](tasks/T.4.13-post-interest-api.md) | POST /api/booking-requests/[id]/interest | 25m | T.4.10 |
| [T.4.14](tasks/T.4.14-build-request-card.md) | Build RequestCard component | 25m | T.4.11, T.4.12 |
| [T.4.15](tasks/T.4.15-get-booking-requests-api.md) | GET /api/booking-requests — list | 20m | T.4.10 |

### M2 DOD
- [ ] Venue directory with filters and pagination
- [ ] Venue detail with manager info and active requests
- [ ] Booking request creation works
- [ ] Interest toggle updates count, threshold triggers UNDER_REVIEW
- [ ] Request cards show interest count and status

---

## Sprint 4 — Venue Manager Dashboard [towards M3]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.4.16](tasks/T.4.16-build-manager-dashboard.md) | Build VenueManagerDashboard page | 25m | T.4.15 |
| [T.4.17](tasks/T.4.17-build-manager-request-card.md) | Build ManagerRequestCard | 25m | T.4.16 |
| [T.4.18](tasks/T.4.18-build-approve-modal.md) | Build ApproveRequestModal | 20m | — |
| [T.4.19](tasks/T.4.19-build-reject-modal.md) | Build RejectRequestModal | 15m | — |
| [T.4.20](tasks/T.4.20-post-approve-api.md) | POST /api/booking-requests/[id]/approve | 30m | T.4.10 |
| [T.4.21](tasks/T.4.21-post-reject-api.md) | POST /api/booking-requests/[id]/reject | 20m | T.4.10 |

---

## Sprint 5 — My Bookings + Polish [M3: Full Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.4.22](tasks/T.4.22-build-qr-code-display.md) | Build QrCodeDisplay shared component | 20m | — |
| [T.4.23](tasks/T.4.23-build-my-bookings-page.md) | Build MyBookings page | 25m | T.4.20 |
| [T.4.24](tasks/T.4.24-build-booking-cards.md) | Build BookingCard + MyRequestCard | 25m | T.4.22 |
| [T.4.25](tasks/T.4.25-post-cancel-api.md) | POST /api/booking-requests/[id]/cancel | 20m | T.4.10 |
| [T.4.26](tasks/T.4.26-get-managed-requests-api.md) | GET /api/booking-requests/managed | 20m | T.4.01 |
| [T.4.27](tasks/T.4.27-edge-cases-trust-gate.md) | Edge cases + trust gate | 25m | T.4.10 |

### M3 DOD
- [ ] End-to-end: browse → request → interest → approval → QR code
- [ ] Venue manager dashboard with approve/reject
- [ ] Interest threshold tracking and notification
- [ ] QR code generation on approval
- [ ] Cancellation policy: no penalty before approval, -2 trust after, -3 no-show
- [ ] Trust gate: score < -5 cannot create requests
- [ ] All 26 FAC-* requirements satisfied
