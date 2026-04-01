# T.7.02: Build CommunityEventForm

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 1 | **Milestone:** M1+M2
**Estimated Time:** 30m
**Dependencies:** None
**Spec References:** COM-CREATE-01, COM-CREATE-02, COM-CREATE-04, COM-CREATE-06

## Description
Build a client component for creating community events. The form includes: title, description, date/time pickers, venue (free text — community events aren't at universities), capacity (optional, 0=unlimited), event type selector, category, cover image upload, topic tags, and free/paid toggle. The form validates trust score >= 10 before allowing submission and checks that the organizer has fewer than 5 active events.

## Acceptance Criteria
- [ ] Form renders all fields: title, description, date/time, venue, capacity, event type, category, cover image, tags, free/paid
- [ ] Trust score check: if user trust < 10, form is disabled with TrustGateMessage shown instead
- [ ] Active event limit: shows warning if user already has 5 active events
- [ ] Client-side validation: title required, date must be future, capacity >= 0
- [ ] Capacity 0 displays as "Unlimited" in the form
- [ ] Submit calls POST /api/events with isCommunity=true
- [ ] Success redirects to the created event detail page
- [ ] Responsive layout on mobile and desktop

## Files to Create/Modify
- `components/community/CommunityEventForm.tsx` — Client component with form state, validation, and submission
- `app/events/create/community/page.tsx` — Page wrapping the form with auth check

## Implementation Notes
- Use `"use client"` directive for form interactivity
- Reuse the EventTypeSelector sub-component (T.7.03) for type selection
- Date/time can use native HTML inputs for simplicity
- Tags use comma-separated input similar to existing tag handling in lib/utils.ts
- The form should prefetch user trust score and active event count on mount

## Commit Message
`feat: add community event creation form with trust gate`
