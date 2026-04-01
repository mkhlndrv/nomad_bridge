# T.4.02: Create Venue Seed Data

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** T.4.01
**Spec References:** FAC-DIR-01, FAC-DIR-02, FAC-DIR-05

## Description
Create a seed script that populates the database with realistic Bangkok university venue data. Include at least 8 facilities across 3 universities, covering all 5 facility types (Library, Coworking, Gym, Cafe, Lab). Create 2 users with the VENUE_MANAGER role and assign them as managers of the facilities. Include varied data: some venues are free, others have hourly rates; some have high capacity, others are small meeting rooms. Include realistic operating hours, amenities, and rules for each venue. Also seed 2-3 sample BookingRequests with different statuses and some BookingInterest entries to demonstrate the interest system.

## Acceptance Criteria
- [ ] Seed script creates at least 8 Facility records across 3 universities
- [ ] All 5 FacilityType values are represented (LIBRARY, COWORKING, GYM, CAFE, LAB)
- [ ] At least 2 users have VENUE_MANAGER role and are linked as facility managers
- [ ] Facilities have varied pricePerHour values (including 0 for free venues)
- [ ] Each facility has realistic operatingHours, amenities, and capacity
- [ ] 2-3 sample BookingRequests exist in different statuses (OPEN, UNDER_REVIEW, APPROVED)
- [ ] At least one BookingRequest has BookingInterest entries from multiple users
- [ ] Seed script is idempotent (can be re-run without duplicating data)
- [ ] `npx prisma db seed` runs successfully

## Files to Create/Modify
- `prisma/seed.ts` — Add facility, venue manager, booking request, and booking interest seed data

## Implementation Notes
- Use realistic Bangkok university names: Chulalongkorn, Thammasat, KMUTT, Mahidol.
- Example amenities: "WiFi,Projector,Whiteboard,Power outlets,Air conditioning".
- Example operating hours: "Mon-Fri 08:00-20:00, Sat 09:00-17:00".
- Set interestThreshold between 3 and 10 depending on venue capacity.
- Use `upsert` or `createMany` with `skipDuplicates` for idempotency.
- Reference existing seed users as booking request creators and interest expressors.

## Commit Message
`feat: add venue and booking request seed data`
