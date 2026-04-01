# T.3.01: Update Prisma Schema for Collaborations

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 30m
**Dependencies:** None
**Spec References:** COL-POST-01, COL-POST-02, COL-POST-03, COL-POST-04, COL-POST-05, COL-POST-08

## Description
Add the `CollaborationType` enum (LECTURE, WORKSHOP, RESEARCH, MENTORSHIP, PROJECT), `CollaborationStatus` enum (OPEN, IN_DISCUSSION, MATCHED, COMPLETED, CANCELLED), `CompensationType` enum (PAID, FREE, FACILITY_ACCESS), and `CollaborationFormat` enum (IN_PERSON, ONLINE, HYBRID) to the Prisma schema. Create the `CollaborationOpportunity` model with shared fields (title, description, collaborationType, preferredDateStart, preferredDateEnd, format, compensationType, tags, status) and type-specific optional fields: lecture fields (audienceSize, department, talkFormat), research fields (requiredSkills, estimatedDuration, deliverables), and mentorship fields (frequency, topicArea, commitmentDuration). Add a `CollaborationApplication` model to track apply/invite interactions (collaborationId, applicantId, message, type: APPLY|INVITE, status: PENDING|ACCEPTED|REJECTED). Add a `CollaborationFeedback` model (collaborationId, fromUserId, toUserId, rating 1-5, comment). Add relation fields on User for collaborations, applications, and feedback. Run `npx prisma db push` to apply.

## Acceptance Criteria
- [ ] `CollaborationType` enum has 5 values: LECTURE, WORKSHOP, RESEARCH, MENTORSHIP, PROJECT
- [ ] `CollaborationStatus` enum has 5 values: OPEN, IN_DISCUSSION, MATCHED, COMPLETED, CANCELLED
- [ ] `CollaborationOpportunity` model exists with all shared fields from COL-POST-02
- [ ] Type-specific optional fields present for LECTURE (COL-POST-03), RESEARCH (COL-POST-04), MENTORSHIP (COL-POST-05)
- [ ] `CollaborationApplication` model tracks both applies and invites
- [ ] `CollaborationFeedback` model supports 1-5 star rating + comment
- [ ] User model has relation fields for collaborations, applications, sentFeedback, receivedFeedback
- [ ] `npx prisma db push` succeeds without errors
- [ ] Prisma Client regenerated successfully

## Files to Create/Modify
- `prisma/schema.prisma` — Add enums (CollaborationType, CollaborationStatus, CompensationType, CollaborationFormat, ApplicationType, ApplicationStatus), models (CollaborationOpportunity, CollaborationApplication, CollaborationFeedback), and User relation fields

## Implementation Notes
- SQLite does not support native enums; Prisma handles this via string storage. No special handling needed.
- Use `String?` for comma-separated tags since SQLite lacks array types (consistent with existing Event.tags pattern).
- The `CollaborationApplication` model uses a `type` field (APPLY or INVITE) to distinguish direction; an apply is nomad-to-university, an invite is university-to-nomad.
- Add `@@unique([collaborationId, fromUserId])` on CollaborationFeedback to enforce one feedback per user per collaboration.
- Keep the existing `LectureOpportunity` model intact — the new collaboration system is a broader replacement but we don't remove legacy models yet.

## Commit Message
`chore: add collaboration schema with types, applications, and feedback models`
