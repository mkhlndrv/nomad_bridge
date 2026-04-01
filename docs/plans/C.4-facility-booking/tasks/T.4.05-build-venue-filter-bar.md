# T.4.05: Build VenueFilterBar Mockup

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FAC-DIR-03, FAC-DIR-04

## Description
Build a `VenueFilterBar` client component that provides filtering controls for the venue directory. Include type filter pills (All, Library, Coworking, Gym, Cafe, Lab), a university dropdown populated with known universities, a price range selector (Free / Under ฿100 / Under ฿500 / Any), a capacity filter (Any / 1-10 / 11-50 / 50+), and a search input for venue name or university text search. Use URL search params to persist filter state across navigation. The component should use `useRouter` and `useSearchParams` to update the URL when filters change.

## Acceptance Criteria
- [ ] Type filter pills render for all FacilityType values plus "All"
- [ ] Active type pill is visually highlighted
- [ ] University dropdown lists available universities
- [ ] Price range selector works with predefined ranges
- [ ] Capacity filter works with predefined ranges
- [ ] Search input has a debounced text field (300ms delay)
- [ ] Filter changes update URL search params
- [ ] Filters can be combined (type + university + price)
- [ ] "Clear filters" button resets all filters
- [ ] Component is responsive: stacks on mobile, inline on desktop

## Files to Create/Modify
- `app/components/facilities/VenueFilterBar.tsx` — New client component

## Implementation Notes
- Mark as `"use client"` for interactivity.
- Use `useSearchParams()` to read current filter state from URL.
- Use `useRouter().push()` or `useRouter().replace()` to update URL params.
- Debounce search input with a `setTimeout`/`clearTimeout` pattern or a small utility.
- Type pills: horizontal scrollable on mobile (`overflow-x-auto flex gap-2`).
- Price ranges: `[{ label: "Free", max: 0 }, { label: "Under ฿100", max: 100 }, ...]`.
- Use lucide-react `Search` icon in the search input.

## Commit Message
`feat: build venue filter bar with type pills and search`
