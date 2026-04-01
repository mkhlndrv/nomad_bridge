# SF1: Venue Directory

**Feature:** [Campus Facility Access Booking](overview.md)
**Prefix:** FAC-DIR

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| FAC-DIR-01 | Browsable catalog of campus venues with photo cards | Must |
| FAC-DIR-02 | Each venue card shows: name, university, type (Library / Coworking / Gym / Cafe / Lab), location, operating hours, capacity, and price per hour (or "Free") | Must |
| FAC-DIR-03 | Filter by: university, venue type, price range, and capacity | Must |
| FAC-DIR-04 | Search by venue name or university | Should |
| FAC-DIR-05 | Full venue detail page: description, photos, amenities, capacity, operating hours, rules, price, and venue manager name | Must |
| FAC-DIR-06 | Show "Request-based booking" badge — venues are not instant-book | Must |

## Frontend Components

- `VenueDirectory` (Server) — Grid of venue cards with filter bar and pagination
  - `VenueFilterBar` (Client) — Type pills, university dropdown, price range, capacity filter
  - `VenueCard` (Server) — Photo card: name, university, type badge, location, capacity, price ("Free" or "฿X/hr"), "Request-based" badge
- `VenueDetail` (Server) — Photos, description, amenities, capacity, hours, rules, price, venue manager name. "Request This Venue" button
  - `ActiveRequestsList` (Server) — Current open requests for this venue with interest counts (so users can join existing requests instead of creating new ones)

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/facilities` | GET | List with filters (type, university, price, capacity) |
| `app/api/facilities/[id]` | GET | Detail with venue manager info and active requests |
