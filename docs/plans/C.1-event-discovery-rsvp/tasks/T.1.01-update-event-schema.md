# T.1.01: Update Event Schema

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** C.2-S1 (User model with trustScore must exist)
**Spec References:** EVT-FEED-02, EVT-FEED-06, EVT-FEED-09, EVT-FEED-10, EVT-RSVP-02, EVT-RSVP-04, EVT-PHOTO-03, EVT-MAT-01

## Description
Extend the existing Prisma schema to support the full Event Discovery & RSVP feature set. The current `Event` and `EventRsvp` models need additional fields and two new models must be added: `EventPhoto` for board/gallery photos and `EventMaterial` for post-event content (slides, PDFs, links). The `EventRsvp` model needs a `status` field to distinguish between confirmed and waitlisted RSVPs, plus a `waitlistPosition` for ordering. Add an `EventStatus` enum to support draft events created from photo uploads. Run `npx prisma db push` to sync the schema to the local SQLite database.

## Acceptance Criteria
- [ ] `Event` model has new fields: `status` (EventStatus enum: DRAFT, PUBLISHED, CANCELLED, default PUBLISHED), `schedule` (String?, for agenda/timeline text), `speakers` (String?, comma-separated), `locationDetail` (String?, for map/directions)
- [ ] `EventRsvp` model has new fields: `status` (RsvpStatus enum: CONFIRMED, WAITLISTED, CANCELLED, default CONFIRMED), `waitlistPosition` (Int?, nullable)
- [ ] New `EventPhoto` model: id, eventId, uploaderId, imageUrl, caption?, createdAt. Relation to Event and User
- [ ] New `EventMaterial` model: id, eventId, uploaderId, title, fileUrl, fileType (String — "pdf", "slides", "video", "link"), createdAt. Relation to Event and User
- [ ] `@@unique([userId, eventId])` constraint preserved on EventRsvp
- [ ] `npx prisma db push` succeeds without errors
- [ ] Existing seed data (if any) remains compatible

## Files to Create/Modify
- `prisma/schema.prisma` — Add EventStatus enum, RsvpStatus enum; extend Event and EventRsvp models; add EventPhoto and EventMaterial models

## Implementation Notes
- SQLite does not support native enums, but Prisma handles this transparently. Keep using enum declarations.
- The `tags` field on Event remains as a comma-separated String since SQLite has no array type.
- The `speakers` field also uses comma-separated String for the same reason.
- Add `photos EventPhoto[]` and `materials EventMaterial[]` relations to the Event model.
- Add `uploadedPhotos EventPhoto[]` and `uploadedMaterials EventMaterial[]` relations to the User model.
- The `waitlistPosition` on EventRsvp is nullable because confirmed RSVPs do not have a position.

## Commit Message
`chore: extend prisma schema with event photos, materials, and rsvp status`
