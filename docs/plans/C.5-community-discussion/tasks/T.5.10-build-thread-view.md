# T.5.10: Build ThreadView Page

**Component:** C.5 — Community Discussion Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.5.08
**Spec References:** FRM-REPLY-01, FRM-REPLY-05, FRM-INTERACT-02

## Description
Create the thread detail page at `app/forum/[id]/page.tsx` as a server component. The page displays the original post using the ThreadPost component at the top, followed by a list of replies, and a ReplyForm at the bottom for logged-in users. Fetch thread data from GET `/api/forum/[id]` or directly via Prisma. If the thread has a Best Answer reply, highlight it visually. Include a "Back to Forum" navigation link. Handle the case where the thread does not exist with a 404 page.

## Acceptance Criteria
- [ ] Page is accessible at `/forum/[id]`
- [ ] Original post is rendered using the ThreadPost component
- [ ] Replies are listed below the original post in chronological order
- [ ] Best Answer reply (if any) is visually highlighted or pinned to top of replies
- [ ] ReplyForm is rendered at the bottom for authenticated users
- [ ] "Back to Forum" link navigates to `/forum`
- [ ] 404 is shown if the thread ID does not exist
- [ ] Page displays thread title in the browser tab
- [ ] Reply pagination controls are shown when there are multiple pages
- [ ] Layout is responsive on mobile and desktop

## Files to Create/Modify
- `app/forum/[id]/page.tsx` — New server page for thread detail view

## Implementation Notes
- Use Prisma `findUnique` to fetch the thread with author, replies, and reply authors.
- Accept `searchParams` for `page` to support reply pagination.
- Use `notFound()` from `next/navigation` if the thread doesn't exist.
- Set page metadata dynamically using `generateMetadata` with the thread title.
- The ThreadPost (T.5.11), Reply (T.5.14), and ReplyForm (T.5.13) components will be built in later tasks; use placeholder components or basic markup initially.
- Consider showing the Best Answer reply first in the reply list, regardless of chronological order.

## Commit Message
`feat: add thread detail page with replies and reply form`
