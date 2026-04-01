# T.5.03: Build ThreadCard Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FRM-FEED-02, FRM-FEED-03

## Description
Create a `ThreadCard` server component that displays a single forum thread in the feed. The card should show the thread title (linked to the thread detail page), a category badge with color coding, the author name with their trust score badge, the reply count, the time of last activity displayed in Asia/Bangkok timezone, and a pinned indicator (Pin icon) for pinned threads. Use the existing card styling patterns from other components in the app, with lucide-react icons for the pin and message indicators.

## Acceptance Criteria
- [ ] ThreadCard renders thread title as a link to `/forum/[id]`
- [ ] Category badge displays with distinct color per category (General, Tips, Events, Housing, Coworking)
- [ ] Author name shown with TrustScoreBadge component
- [ ] Reply count displayed with MessageCircle icon
- [ ] Last activity timestamp shown in Asia/Bangkok timezone using relative format (e.g., "2h ago")
- [ ] Pinned threads show a Pin icon indicator
- [ ] Card is responsive: full-width on mobile, proper spacing on desktop
- [ ] Component accepts typed props (thread data object)

## Files to Create/Modify
- `app/forum/_components/ThreadCard.tsx` — New server component for thread card display

## Implementation Notes
- Reuse `TrustScoreBadge` from C.2 for author trust display.
- Use lucide-react icons: `Pin`, `MessageCircle`, `Clock`.
- Category badge colors: General (gray), Tips (blue), Events (purple), Housing (green), Coworking (orange) — use Tailwind classes.
- Format timestamps using a helper that converts UTC to Asia/Bangkok timezone. Consider a shared `formatRelativeTime` utility.
- The card should use a clean card design consistent with other list items in the app (rounded corners, subtle border/shadow, good padding).

## Commit Message
`feat: add ThreadCard component with category badges and pinned indicator`
