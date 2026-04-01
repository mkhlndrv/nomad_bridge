# T.7.03: Build EventTypeSelector

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 1 | **Milestone:** M1+M2
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** COM-CREATE-05

## Description
Build a visual selector component for the 5 community event types. Each type displays as a card with a lucide-react icon, label, and short description. Types: Meetup (Users icon), Workshop (Wrench), Skill Share (BookOpen), Social (PartyPopper), Coworking Session (Coffee). The selected type is highlighted with a border/background change.

## Acceptance Criteria
- [ ] Renders 5 type cards in a responsive grid
- [ ] Each card shows: lucide icon, type label, brief description
- [ ] Clicking a card selects it (highlighted border/background)
- [ ] Only one type can be selected at a time
- [ ] Calls onChange callback with selected type value
- [ ] Icons: Users, Wrench, BookOpen, PartyPopper, Coffee from lucide-react

## Files to Create/Modify
- `components/community/EventTypeSelector.tsx` — Client component with type selection grid

## Implementation Notes
- Use a map of type→{icon, label, description} for clean rendering
- Tailwind ring or border classes for selection state
- Keep the component generic enough to reuse if needed

## Commit Message
`feat: add event type selector with lucide icons`
