# Collaboration Organize Board

## Intent / Vibe

Create a vibrant two-sided marketplace where universities and nomads find meaningful ways to work together — not just guest lectures, but workshops, research projects, mentorship, and more. The board should feel like a curated opportunity hub: universities post what they need, nomads offer what they know, and the matching happens naturally through browse, invite, and apply flows. Every interaction should feel purposeful and collaborative — "Let's build something together."

## Sub-Features

- [SF1: Collaboration Board & Discovery](board-discovery.md)
- [SF2: Posting (Requests & Offers)](posting.md)
- [SF3: Matching & Application Flow](matching.md)
- [SF4: Feedback System](feedback.md)

## Edge Cases & Constraints

- Requests and offers should only show future availability by default; past ones move to an archive.
- Prevent spam: limit to 3 new posts per user per week.
- Clear status lifecycle for each post: Open → In Discussion → Matched → Completed → Archived.
- Handle "facility access" compensation type — display it clearly, don't show a dollar amount.
- A nomad cannot apply to their own university's request (if they have a university role).
- Closed/cancelled posts should be clearly marked and non-interactive.
- Form fields adapt dynamically based on selected collaboration type — don't show irrelevant fields.
- Research and mentorship types may have longer durations — show estimated commitment clearly.

## Acceptance Criteria

- Universities and nomads can post and browse all 5 collaboration types easily [COL-BOARD-01, COL-BOARD-04, COL-POST-01]
- Form adapts fields based on selected collaboration type [COL-POST-02, COL-POST-03, COL-POST-04, COL-POST-05]
- Invite and Apply flows work with proper notifications [COL-MATCH-01, COL-MATCH-02, COL-MATCH-03]
- Feedback system updates trust scores correctly [COL-FEEDBACK-01, COL-FEEDBACK-02, COL-FEEDBACK-03]
- Status transitions are enforced — can't skip from Open to Completed [COL-POST-08, COL-MATCH-05]
- Collaboration type filter works correctly alongside other filters [COL-BOARD-04, COL-BOARD-05]
- The interface is clean, responsive, and intuitive on mobile and desktop
- All data is correctly persisted in the database

## Definition of Done

- End-to-end flow works: post → browse → apply/invite → confirm → complete → feedback
- All 5 collaboration types supported with appropriate form fields
- Responsive design on all devices
- Basic validation and error handling
- Trust score updates after feedback
- Post status lifecycle enforced
- Atomic commits used throughout implementation
