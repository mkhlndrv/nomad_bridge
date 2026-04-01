# T.2.14: Build TrustScoreCard + TrustScoreHistory

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.2.13
**Spec References:** PRF-DISPLAY-05, PRF-DISPLAY-09, PRF-TRUST-10, PRF-VERIFY-03

## Description
Build two components: `TrustScoreCard` (server) and `TrustScoreHistory` (client). The `TrustScoreCard` displays the user's current trust score prominently with the color-coded indicator (reusing TrustScoreBadge), a progress bar toward the next verification level (e.g., "12/30 to Community Verified"), the current verification level label, and a "View History" link. The `TrustScoreHistory` is a client component that fetches paginated trust score changes from the API and displays them as a timeline. Each entry shows the date (in Bangkok timezone), the reason, the delta with a +/- prefix and color coding, and the running total. Include a "Load More" button for pagination. For users with score 0, show an encouraging message ("Build your reputation by attending events!").

## Acceptance Criteria
- [ ] `TrustScoreCard` renders at `components/profile/TrustScoreCard.tsx`
- [ ] Shows current score with TrustScoreBadge
- [ ] Shows progress bar toward next verification level
- [ ] Displays current verification level label
- [ ] "View History" link navigates to or reveals TrustScoreHistory
- [ ] `TrustScoreHistory` renders at `components/profile/TrustScoreHistory.tsx`
- [ ] Fetches data from GET /api/profile/trust-history
- [ ] Shows timeline of changes with date, reason, delta, running total
- [ ] Positive deltas shown in green with "+" prefix, negative in red with "-" prefix
- [ ] "Load More" button for pagination
- [ ] Empty state shows encouraging message for new users
- [ ] Dates displayed in Asia/Bangkok timezone

## Files to Create/Modify
- `components/profile/TrustScoreCard.tsx` — Create server component for score overview
- `components/profile/TrustScoreHistory.tsx` — Create client component for score timeline

## Implementation Notes
- TrustScoreCard uses `calculateVerificationLevel` from `lib/trust-score.ts` to determine current level and next target.
- Progress bar: for unverified/email_verified users, show progress toward 30 (community verified). For community verified, show a "Verified" checkmark.
- TrustScoreHistory is `"use client"` — uses `useState` for entries, `useEffect` for initial fetch, and a load more handler.
- Use `formatDateBangkok` from `lib/utils.ts` for date display.
- Timeline styling: use a vertical line with dots, or a simple list with dividers.
- Import `TrendingUp`, `TrendingDown`, `History` icons from lucide-react.

## Commit Message
`feat: build TrustScoreCard and TrustScoreHistory components`
