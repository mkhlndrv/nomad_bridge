# T.1.22: Empty States and Error Handling

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.1.11
**Spec References:** EVT-FEED-01, EVT-FEED-03

## Description
Add comprehensive empty states and error handling across all event-related pages and components. Create reusable `EmptyState` and `ErrorState` components. The event feed needs an empty state for "No upcoming events" and "No events match your filters" (differentiated based on whether filters are active). The event detail page needs error states for failed API calls. RSVP operations need inline error messages. Network errors should suggest retrying. All error messages must be clear, actionable, and user-friendly — never expose raw error codes or stack traces.

## Acceptance Criteria
- [ ] Reusable `EmptyState` component with: icon, title, description, optional action button
- [ ] Reusable `ErrorState` component with: error icon, title, description, retry button
- [ ] Event feed with no events: shows illustration + "No upcoming events" + "Check back soon or adjust your filters"
- [ ] Event feed with active filters but no results: shows "No events match your filters" + "Clear Filters" button
- [ ] Event detail 404: shows "Event not found" + "Back to Events" link
- [ ] Event detail API error: shows ErrorState with "Something went wrong" + "Try Again" button
- [ ] RSVP API error: shows inline toast/banner below the button with specific error message
- [ ] Network error (fetch fails): shows "Unable to connect. Check your internet and try again"
- [ ] All empty states use lucide-react icons: `Calendar` for no events, `Search` for no results, `AlertCircle` for errors
- [ ] Empty and error states are responsive and centered

## Files to Create/Modify
- `app/components/shared/EmptyState.tsx` — Reusable empty state component
- `app/components/shared/ErrorState.tsx` — Reusable error state component
- `app/events/page.tsx` — Integrate empty states for no events / no results
- `app/events/[id]/page.tsx` — Integrate error state for failed detail fetch
- `app/components/events/RsvpButton.tsx` — Add inline error display for failed RSVP

## Implementation Notes
- `EmptyState` props: `icon` (LucideIcon), `title` (string), `description` (string), `action?: { label: string, href?: string, onClick?: () => void }`.
- `ErrorState` props: `title` (string), `description` (string), `onRetry?: () => void`.
- Differentiate "no events at all" vs "no filtered results" by checking if any search params are present in the URL.
- For the retry button on ErrorState, use `router.refresh()` in a client wrapper or simply reload the page.
- Keep error messages generic and friendly — do not expose internal error details.
- The RSVP inline error can use a `useState<string | null>(null)` for the error message, displayed below the button with a red info bar that auto-dismisses after 5 seconds.
- Consider using `error.tsx` convention for Next.js error boundaries on the events pages.

## Commit Message
`feat: add empty states and error handling for event pages`
