# T.7.05: Enhance POST /api/events for Community Events

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 1 | **Milestone:** M1+M2
**Estimated Time:** 25m
**Dependencies:** T.7.01
**Spec References:** COM-CREATE-01, COM-CREATE-04, COM-CREATE-06

## Description
Enhance the existing POST /api/events endpoint to handle community event creation. When `isCommunity=true` is included in the body, apply additional validations: trust score must be >= 10, organizer must have <= 5 active (upcoming, non-cancelled) community events. Auto-set the creator as organizer and mark isCommunity=true. The university field becomes optional for community events.

## Acceptance Criteria
- [ ] When `isCommunity=true`, validates trust score >= 10 (returns 403 if not)
- [ ] When `isCommunity=true`, counts active community events for user (returns 400 if >= 5)
- [ ] Community events don't require `university` field
- [ ] Sets `eventType` from the CommunityEventType enum
- [ ] Returns 201 with created event on success
- [ ] Non-community event creation still works as before
- [ ] Proper error messages for each validation failure

## Files to Create/Modify
- `app/api/events/route.ts` — Enhance POST handler with community event logic

## Implementation Notes
- Active events = future date + not CANCELLED status
- Use prisma.event.count with where clause for the active event check
- Trust score check: query user.trustScore directly
- Keep existing university event creation logic unchanged

## Commit Message
`feat: enhance event creation API with community event support`
