# T.6.14: Build NotificationPreferences Settings Page

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 30m
**Dependencies:** None
**Spec References:** NTF-CENTER-06, NTF-CENTER-07, NTF-CENTER-08, NTF-CENTER-09

## Description
Create the `/notifications/preferences` page with a `NotificationPreferences` client component that renders a settings grid of toggle switches. The grid has 5 category rows (Events, Bookings, Lectures, Community, Trust Score) and 3 channel columns (Email, LINE, Telegram). Each cell is a `NotificationToggle` component — a styled toggle switch that calls `PUT /api/notifications/preferences` on change to persist the setting immediately (optimistic UI with rollback on failure). The page fetches the current preference matrix on mount via `GET /api/notifications/preferences`. All toggles default to ON (NTF-CENTER-08). Include a "Reset to defaults" button that turns all toggles back on. The grid should be responsive: on mobile, each category becomes a card with three toggles stacked vertically; on desktop, the full grid table is shown.

## Acceptance Criteria
- [ ] Page at `app/notifications/preferences/page.tsx` renders the preferences settings
- [ ] Settings grid shows 5 rows (Events, Bookings, Lectures, Community, Trust) x 3 columns (Email, LINE, Telegram)
- [ ] Each cell contains a toggle switch that can be independently toggled on/off
- [ ] Toggling a switch immediately calls PUT /api/notifications/preferences to persist the change
- [ ] Optimistic UI: toggle updates visually before the API confirms, rolls back on error
- [ ] Current preferences are loaded on mount via GET /api/notifications/preferences
- [ ] "Reset to defaults" button sets all toggles to ON and persists via the API
- [ ] Loading state shown while preferences are being fetched
- [ ] Error toast/message shown if a toggle update fails
- [ ] Responsive: stacked card layout on mobile, full grid table on desktop
- [ ] Back link to `/notifications` is visible in the page header
- [ ] Each category row has a descriptive label and icon (using lucide-react)

## Files to Create/Modify
- `app/notifications/preferences/page.tsx` — Create new preferences page
- `components/notifications/NotificationPreferences.tsx` — Create client component with settings grid
- `components/notifications/NotificationToggle.tsx` — Create reusable toggle switch component

## Implementation Notes
- Use `useState` for the preference matrix, initialized from the GET response.
- On toggle change, update local state immediately (optimistic), then fire the PUT request. On failure, revert the local state.
- The preference matrix shape from the API: `{ category: string, emailEnabled: boolean, lineEnabled: boolean, telegramEnabled: boolean }[]`.
- For the toggle switch, use a styled `<button>` with `role="switch"` and `aria-checked` for accessibility.
- Use Tailwind for the responsive grid: `grid-cols-4` on desktop (label + 3 toggles), stack on mobile with `md:grid` breakpoint.
- Categories should use descriptive labels: "Events & RSVPs", "Facility Bookings", "Guest Lectures", "Community & Forums", "Trust Score".

## Commit Message
`feat: add NotificationPreferences page with toggle grid for channel settings`
