# T.5.09: Build CreateThreadForm Component

**Component:** C.5 — Community Discussion Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** FRM-CREATE-01, FRM-CREATE-02, FRM-CREATE-04, FRM-CREATE-05, FRM-CREATE-06

## Description
Create a `CreateThreadForm` client component for composing new forum threads. The form includes a title input with a 120-character limit and live character counter, a category dropdown with the five ForumCategory options, and a content text area with basic formatting support and a 5000-character limit. Display a rate limit indicator that shows remaining cooldown time if the user posted recently (30-second window). On submission, POST to `/api/forum` and redirect to the new thread on success.

## Acceptance Criteria
- [ ] Title input with 120-character max and live character counter (e.g., "45/120")
- [ ] Category dropdown with options: General, Tips, Events, Housing, Coworking
- [ ] Content text area with 5000-character limit and live character counter
- [ ] Submit button disabled while form is submitting or rate limited
- [ ] Rate limit countdown displayed if user is within the 30-second cooldown
- [ ] On successful creation, user is redirected to the new thread page (`/forum/[id]`)
- [ ] Validation errors from the API are displayed inline (title too long, content too long, rate limited)
- [ ] Form requires authentication — shows a message or redirect if not logged in
- [ ] Form is responsive and well-styled on mobile and desktop

## Files to Create/Modify
- `app/forum/new/page.tsx` — New page that renders the CreateThreadForm
- `app/forum/_components/CreateThreadForm.tsx` — New client component for thread creation

## Implementation Notes
- Use `"use client"` directive for interactive form handling.
- Use `fetch` to POST to `/api/forum` with JSON body.
- For the rate limit indicator, track the last post time in component state and show a countdown timer using `setInterval`.
- Use `useRouter` from `next/navigation` to redirect after successful creation.
- Consider adding a "New Thread" button on the forum feed page that links to `/forum/new`.
- Content editor can be a simple `<textarea>` for now; rich text formatting (bold, italic, links) can be enhanced later if needed.

## Commit Message
`feat: add CreateThreadForm with validation and rate limiting`
