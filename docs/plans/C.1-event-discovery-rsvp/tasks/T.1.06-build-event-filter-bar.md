# T.1.06: Build EventFilterBar Mockup

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** EVT-FEED-03, EVT-FEED-04

## Description
Build the `EventFilterBar` as a client component that renders the UI for filtering events. For the M1 mockup milestone, the filter bar renders all visual elements but does not yet update URL params or trigger actual filtering (interactivity is added in T.1.17). The bar includes: a university dropdown (Chulalongkorn, Thammasat, Mahidol, All), category pills for each EventCategory, a date range picker (two date inputs), and a search text input. The layout is horizontal on desktop and stacks vertically on mobile.

## Acceptance Criteria
- [ ] Component renders a university select dropdown with options: "All Universities", "Chulalongkorn University", "Thammasat University", "Mahidol University"
- [ ] Category pills render for: Workshop, Seminar, Social, Sports, Cultural — clickable style with active/inactive states
- [ ] Search input with a `Search` icon from lucide-react and placeholder text "Search events..."
- [ ] Date range: two `input[type="date"]` fields for "From" and "To"
- [ ] Uses `"use client"` directive since it will eventually handle user interactions
- [ ] Layout: horizontal flex-wrap on desktop, vertical stack on mobile
- [ ] Visual-only for M1 — no state management or URL param updates yet
- [ ] Category pills use Tailwind classes for selected state: filled background vs outlined

## Files to Create/Modify
- `app/components/events/EventFilterBar.tsx` — Filter bar client component

## Implementation Notes
- Mark as `"use client"` from the start since this component will manage filter state in T.1.17.
- For category pills, use a simple array of `EventCategory` values and map them to styled buttons.
- Use Tailwind for pill styling: active = `bg-blue-600 text-white`, inactive = `bg-white text-gray-700 border border-gray-300`.
- The search input should have a `Search` icon (lucide-react) positioned inside with `absolute` positioning.
- Keep all filter values as local component state (useState) even though they won't be connected yet — this prepares for T.1.17.
- No external date picker library needed; native HTML date inputs are sufficient.

## Commit Message
`feat: build EventFilterBar mockup with filter controls`
