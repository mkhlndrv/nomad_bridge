# T.2.11: Build ProfileEditForm

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 30m
**Dependencies:** T.2.09
**Spec References:** PRF-EDIT-01, PRF-EDIT-02, PRF-EDIT-03, PRF-EDIT-04

## Description
Build a client-side `ProfileEditForm` component that allows users to edit their profile fields: name, bio, skills, and location. The form should pre-populate with current values, show the email field as read-only (with a lock icon and explanation), and provide a tag-style input for skills (add/remove individual skill tags). On submit, the form sends a PATCH request to `/api/profile` and shows a success toast or inline confirmation message. Validation errors from the API should be displayed inline next to the relevant field. Include a cancel button that discards changes. The form can be rendered as a modal/drawer triggered from the "Edit Profile" button, or as a separate page at `/profile/edit`.

## Acceptance Criteria
- [ ] Component renders at `components/profile/ProfileEditForm.tsx` with `"use client"` directive
- [ ] Name field: text input, required, max 100 chars, shows error if exceeded
- [ ] Bio field: textarea, optional, max 500 chars, shows character count
- [ ] Skills field: tag input supporting add/remove of individual skills
- [ ] Location field: text input, optional, max 100 chars
- [ ] Email displayed as read-only with lock icon and "Cannot be changed" label
- [ ] Role displayed as read-only badge
- [ ] Submit calls PATCH /api/profile and shows success confirmation
- [ ] API validation errors shown inline next to relevant fields
- [ ] Cancel discards changes and returns to profile view
- [ ] Form is accessible: proper labels, keyboard navigation, error announcements

## Files to Create/Modify
- `components/profile/ProfileEditForm.tsx` — Create client component with form
- `components/profile/SkillTagInput.tsx` — Create client component for tag input
- `app/profile/edit/page.tsx` — Create edit profile page (or integrate as modal)

## Implementation Notes
- This is a Client Component (`"use client"`) since it handles form state and user interaction.
- Use React `useState` for form fields, or consider `useActionState` for form handling.
- For the skill tag input: maintain an array in state, render tags as removable pills, add new tags on Enter key press or comma.
- Call `fetch("/api/profile", { method: "PATCH", body: JSON.stringify(data) })`.
- Show a brief "Profile updated!" success message that auto-dismisses after 2-3 seconds.
- Use `Lock` icon from lucide-react next to the read-only email field.
- Ensure the form handles the skills data conversion: array in the UI, comma-separated string to the API.

## Commit Message
`feat: build ProfileEditForm with skill tag input`
