## Project Overview
NomadBridge connects digital nomads in Bangkok with local universities for academic events, campus facility access, guest lectures, and community discussions.

## Core Principles
- Keep the codebase simple, clean, and maintainable.
- Use Next.js 15 App Router + TypeScript + Tailwind CSS.
- Database: Prisma + SQLite.
- Store all dates in UTC. Display them in Asia/Bangkok timezone.
- UI: Clean, modern cards with good spacing. Use lucide-react icons.
- Never commit secrets or API keys.

## Development Workflow
- Always start with a clear specification before implementing a feature.
- Break work into small, focused tasks.
- Provide acceptance criteria and edge cases when requesting changes.
- Use iterative refinement: implement → test → review → improve.

## Git & Commit Rules
- Follow atomic commits: one logical change per commit.
- Use this commit message format: `<type>: <short description>`
  - Examples: `feat: add event rsvp with capacity check`
  - `fix: prevent negative trust score on no-show`
  - `chore: update prisma schema with booking model`
- Commit frequently after small, working changes.
- Never mix unrelated changes in one commit.

## Code Quality
- Write clear, readable code with good variable names.
- Handle errors gracefully.
- Keep functions small and single-purpose.
- Add basic tests for important business logic (RSVP, booking, trust score).

## Documentation
- Feature specifications go in `docs/specs/`
- Architecture decisions go in `docs/adrs/`
- Keep this CLAUDE.md concise and up-to-date.
- Update it when new patterns or rules are established.

## MCP Usage
- Use the `nomadbridge-tools` MCP server when relevant.
- Prefer MCP tools for file operations, QR generation, or custom utilities.
- Always validate inputs in custom tools.

## Definition of Done
- Feature works end-to-end in development
- Fully responsive on mobile and desktop
- Basic error handling included
- Database updated via Prisma (if models changed)
- At least one atomic commit with clear message
- Relevant documentation updated if needed

## When in Doubt
- Prioritize clarity and simplicity.
- Reference `docs/knowledge-base.md` for project details.
- Ask for clarification if requirements are ambiguous.