# T.3.11: Build CollaborationTypeSelector

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** COL-POST-01

## Description
Build a `CollaborationTypeSelector` client component that presents the 5 collaboration types as a visual selector grid. Each option is a clickable card showing the type's lucide icon, name, and a brief description: LECTURE ("Share knowledge through talks and presentations"), WORKSHOP ("Co-host hands-on learning sessions"), RESEARCH ("Collaborate on academic research projects"), MENTORSHIP ("Guide or be guided in your field"), PROJECT ("Partner on real-world projects"). The selected type has a highlighted border and background. This component is used as Step 1 of the CreateCollaborationForm.

## Acceptance Criteria
- [ ] Renders 5 type options as clickable cards in a responsive grid
- [ ] Each card shows: lucide icon (Mic/Users/FlaskConical/GraduationCap/Handshake), type name, short description
- [ ] Selected card has distinct visual state (highlighted border, colored background)
- [ ] Unselected cards have subtle hover effect
- [ ] Calls `onSelect(type)` callback when a card is clicked
- [ ] Grid layout: 2 columns on mobile, 3 on tablet, 5 on desktop (or 2x3 with last row centered)
- [ ] Uses `"use client"` directive
- [ ] Keyboard accessible: can tab and select with Enter/Space

## Files to Create/Modify
- `app/collaborations/components/CollaborationTypeSelector.tsx` — Client component with visual type grid

## Implementation Notes
- Define a `COLLABORATION_TYPES` constant array with `{ value, label, icon, description, colorClass }` for each type. Reuse the same icon mapping from T.3.06.
- Props: `{ selected: CollaborationType | null, onSelect: (type: CollaborationType) => void }`.
- Selected state styling: `border-blue-500 bg-blue-50` (or type-specific colors for extra polish).
- Use `role="radiogroup"` and `role="radio"` with `aria-checked` for accessibility.
- Icon size: `w-8 h-8` for the selector (larger than badges since this is a primary interaction).
- Consider extracting the type metadata (icon, label, description, color) into a shared constants file that both this component and the badges can use.

## Commit Message
`feat: build CollaborationTypeSelector with visual type grid`
