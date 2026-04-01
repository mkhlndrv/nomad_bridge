# T.2.10: Connect Profile Page to API

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.2.07, T.2.08
**Spec References:** PRF-DISPLAY-01, PRF-DISPLAY-04, PRF-DISPLAY-07, PRF-EDIT-04

## Description
Refactor the profile pages created in T.2.06 to fetch data from the API routes instead of directly from Prisma. The `/profile` page should call `GET /api/profile` for the current user's data, and the `/profile/[id]` page should call `GET /api/profile/[id]`. Since these are server components, use `fetch()` with the internal API URL. Add loading states using React Suspense boundaries with skeleton placeholders for each profile section (header, skills, activity). Handle error states gracefully: show a "Profile not found" message for 404s and a generic error message for other failures. The page should feel responsive and not flash empty content.

## Acceptance Criteria
- [ ] `/profile` page fetches data from `GET /api/profile`
- [ ] `/profile/[id]` page fetches data from `GET /api/profile/[id]`
- [ ] Loading skeletons shown via Suspense boundaries during data fetch
- [ ] 404 state handled with "Profile not found" message
- [ ] Error state handled gracefully with user-friendly message
- [ ] All profile sections (header, skills, activity) render with live data
- [ ] Activity counts display correctly from API response
- [ ] Page still responsive at mobile and desktop breakpoints

## Files to Create/Modify
- `app/profile/page.tsx` — Refactor to fetch from API, add Suspense
- `app/profile/[id]/page.tsx` — Refactor to fetch from API, add Suspense
- `components/profile/ProfileSkeleton.tsx` — Create skeleton loading component

## Implementation Notes
- For server component data fetching, use `fetch()` with the full internal URL (e.g., `http://localhost:3000/api/profile`). Alternatively, call Prisma directly from the server component (simpler and avoids self-referencing fetch). Choose the direct Prisma approach if API fetch introduces complexity.
- If using direct Prisma approach, the API routes still serve client-side fetches (T.2.11).
- Skeleton component: use Tailwind `animate-pulse bg-gray-200 rounded` for placeholder blocks.
- Use `notFound()` from `next/navigation` in the `[id]` page when user is not found.
- Keep the "Edit Profile" button on own profile, linking to the edit form (T.2.11).

## Commit Message
`feat: connect profile pages to live data with loading states`
