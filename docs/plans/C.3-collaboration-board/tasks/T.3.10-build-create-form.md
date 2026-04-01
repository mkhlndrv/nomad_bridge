# T.3.10: Build CreateCollaborationForm

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 30m
**Dependencies:** None
**Spec References:** COL-POST-01, COL-POST-02, COL-POST-03, COL-POST-04, COL-POST-05, COL-POST-06, COL-POST-07, COL-POST-09

## Description
Build the `CreateCollaborationForm` client component as a two-step form on the `/collaborations/new` page. Step 1: select a collaboration type using the `CollaborationTypeSelector` (T.3.11). Step 2: fill in shared fields (title, description, preferred date range, format, compensation type, tags) plus type-specific fields that appear dynamically based on the selected type. LECTURE shows: audience size, department, talk format (talk/workshop/panel/Q&A). RESEARCH shows: required skills, estimated duration, deliverables. MENTORSHIP shows: frequency (weekly/biweekly/monthly), topic area, commitment duration. WORKSHOP and PROJECT show only shared fields. On submit, POST to `/api/collaborations`. Show success toast and redirect to the new collaboration detail page.

## Acceptance Criteria
- [ ] `/collaborations/new` page renders the creation form
- [ ] Step 1: type selector is shown; advancing to step 2 requires a selection
- [ ] Step 2: shared fields rendered for all types (title, description, dates, format, compensation, tags)
- [ ] LECTURE type shows audience size, department, talk format fields
- [ ] RESEARCH type shows required skills, estimated duration, deliverables fields
- [ ] MENTORSHIP type shows frequency, topic area, commitment duration fields
- [ ] WORKSHOP and PROJECT types show only shared fields
- [ ] Form validates required fields before submission
- [ ] Submits to POST /api/collaborations
- [ ] On success: shows success message and redirects to `/collaborations/[id]`
- [ ] On error: displays error message from API (validation errors, rate limit)
- [ ] Form is responsive on mobile

## Files to Create/Modify
- `app/collaborations/new/page.tsx` — Page wrapper for the creation form
- `app/collaborations/components/CreateCollaborationForm.tsx` — Client component with two-step form logic

## Implementation Notes
- Use React `useState` for step management and form state. Consider a `formData` object with all possible fields.
- Type-specific fields: conditionally render based on `formData.collaborationType`. Use a switch or lookup object.
- For date inputs, use `<input type="date">` for preferredDateStart and preferredDateEnd.
- Tags input: simple text input with comma separation. Display a hint: "Separate tags with commas".
- Format and compensation: use `<select>` dropdowns with enum values.
- On submit, use `fetch('/api/collaborations', { method: 'POST', body: JSON.stringify(formData) })`.
- Handle 429 rate limit error with a specific message: "You've reached the limit of 3 posts per week."

## Commit Message
`feat: build CreateCollaborationForm with type-specific fields`
