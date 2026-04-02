# ADR-005: Align EventCategory with Knowledge Base & Add CommunityEventType

**Status:** Accepted
**Date:** 2026-04-02
**Feature:** Events, Non-University Events
**Deciders:** Project team

## Context

The current `prisma/schema.prisma` defines EventCategory with values: `WORKSHOP, SEMINAR, SOCIAL, SPORTS, CULTURAL, OTHER`. However, the knowledge base (`docs/knowledge-base.md`) specifies different values: `ACADEMIC, NETWORKING, WORKSHOP, SOCIAL, CAREER`. Additionally, the non-university events spec (COM-CREATE-05) introduces 5 community event types (Meetup, Workshop, Skill Share, Social, Coworking Session) that overlap with but are distinct from the broad EventCategory.

This creates ambiguity for coding agents about which enum values to use.

## Decision

1. **Align EventCategory** with the knowledge base values: `ACADEMIC, NETWORKING, WORKSHOP, SOCIAL, CAREER`. These represent broad event classification used by both university and community events.

2. **Add a separate CommunityEventType enum** with values: `MEETUP, WORKSHOP, SKILL_SHARE, SOCIAL, COWORKING_SESSION`. This is only set when `Event.isCommunity === true`.

3. The canonical target schema is documented in `docs/target-schema.prisma`.

## Consequences

### Positive
- Single source of truth for enum values eliminates agent confusion
- Clean separation: EventCategory is "what kind of event" vs CommunityEventType is "what format of community gathering"
- Both university and community events can share the same broad categories for unified filtering

### Negative
- The current schema must be migrated (enum values change)
- Some overlap exists (WORKSHOP appears in both enums) which could confuse users in the UI

### Neutral
- Community events will have two classification fields (category + type) which adds a form field but provides richer filtering

## Alternatives Considered

- **Merge into one large enum:** Rejected because university events and community events serve different purposes — one giant enum would be unwieldy and confusing
- **Keep current schema values:** Rejected because they don't match the knowledge base, and "SEMINAR" and "SPORTS" are less relevant to the NomadBridge audience than "ACADEMIC" and "CAREER"
