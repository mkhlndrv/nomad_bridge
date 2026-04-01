# T.7.07: Add Community Filter to Event API

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 2 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** T.7.01
**Spec References:** COM-DISC-01, COM-DISC-02

## Description
Add `isCommunity` filter parameter to the existing GET /api/events endpoint. When `isCommunity=true`, return only community events. When `isCommunity=false`, return only university events. When omitted, return all events (existing behavior). Also update the EventFilterBar to include a "Community" toggle/pill.

## Acceptance Criteria
- [ ] GET /api/events?isCommunity=true returns only community events
- [ ] GET /api/events?isCommunity=false returns only university events
- [ ] GET /api/events (no filter) returns all events
- [ ] Filter combines with existing filters (category, university, search, date)
- [ ] EventFilterBar UI includes community filter option

## Files to Create/Modify
- `app/api/events/route.ts` — Add isCommunity filter to GET handler's where clause
- `components/events/EventFilterBar.tsx` — Add "Community" pill/toggle

## Implementation Notes
- Parse `isCommunity` query param as boolean
- Add to the Prisma where clause: `isCommunity: isCommunity === 'true' ? true : isCommunity === 'false' ? false : undefined`

## Commit Message
`feat: add community filter to event list API and filter bar`
