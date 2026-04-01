# T.7.04: Build TrustGateMessage

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 1 | **Milestone:** M1+M2
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** COM-CREATE-01

## Description
Build a server component displayed when a user's trust score is below the required threshold (10 for community events, -5 for booking requests). Shows the user's current score, the requirement, and actionable suggestions to build trust (attend events, complete collaborations, participate in forums).

## Acceptance Criteria
- [ ] Displays current trust score with color indicator
- [ ] Shows the required minimum score clearly
- [ ] Lists 3-4 actionable suggestions to increase trust score
- [ ] Uses a friendly, encouraging tone (not punitive)
- [ ] Accepts `currentScore` and `requiredScore` as props for reuse
- [ ] Responsive layout

## Files to Create/Modify
- `components/shared/TrustGateMessage.tsx` — Server component with trust score info and suggestions

## Implementation Notes
- Place in shared/ since both C.7 (trust >= 10) and C.4 (trust >= -5) use trust gates
- Use the TrustScoreBadge component from C.2 for score display
- Suggestions: "Attend university events (+5 trust)", "Complete a collaboration (+10 trust)", etc.

## Commit Message
`feat: add trust gate message component with improvement suggestions`
