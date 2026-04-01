# T.5.21: POST /api/forum/replies/[id]/best-answer — Mark Best Answer API

**Component:** C.5 — Community Discussion Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.5.01
**Spec References:** FRM-INTERACT-02

## Description
Create the POST endpoint at `app/api/forum/replies/[id]/best-answer/route.ts` that allows the thread author to mark or unmark a reply as the Best Answer. Only the author of the parent thread can perform this action. If the targeted reply is not currently the Best Answer, mark it as such and unmark any previously marked Best Answer in the same thread. If the targeted reply is already the Best Answer, unmark it (toggle off). Only one reply per thread can be the Best Answer at any time.

## Acceptance Criteria
- [ ] POST `/api/forum/replies/[id]/best-answer` toggles the Best Answer status
- [ ] If reply is not Best Answer: sets `isBestAnswer: true` and unsets any previous Best Answer in the thread
- [ ] If reply is already Best Answer: sets `isBestAnswer: false` (toggle off)
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 404 if the reply does not exist
- [ ] Returns 403 if the authenticated user is not the author of the parent thread
- [ ] Response includes `{ isBestAnswer: boolean, replyId: string }`
- [ ] Only one reply in a thread has `isBestAnswer: true` at any time
- [ ] Works correctly even if no previous Best Answer exists

## Files to Create/Modify
- `app/api/forum/replies/[id]/best-answer/route.ts` — New POST handler for best answer toggle

## Implementation Notes
- First, fetch the reply with its parent thread to verify the current user is the thread author.
- Use a Prisma transaction: (1) set all replies in the thread to `isBestAnswer: false`, (2) if toggling on, set the target reply to `isBestAnswer: true`.
- The two-step transaction approach (reset all, then set one) is simpler than tracking the previous Best Answer ID.
- The transaction ensures no race condition where two replies could both be marked as Best Answer.
- Return the final state of the targeted reply so the client knows whether it was marked or unmarked.

## Commit Message
`feat: add POST /api/forum/replies/[id]/best-answer toggle endpoint`
