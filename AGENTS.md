# AGENTS.md — Framework-Specific Warnings

> Last updated: 2026-04-01

<!-- BEGIN:nextjs-agent-rules -->
## Next.js 16

**This is NOT the Next.js you know.** This project uses Next.js 16.2 (NOT Next.js 15). APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.

Key differences:
- App Router is the only router (Pages Router removed)
- `next.config.ts` (TypeScript) is preferred over `next.config.js`
- Server Components are the default — add `"use client"` only when needed
- Route handlers use `export async function GET(request: Request)`
- Dynamic route params are accessed via the second argument: `{ params }: { params: Promise<{ id: string }> }` — params is a Promise, must be awaited
- Metadata API: use `export const metadata` or `export function generateMetadata()`
<!-- END:nextjs-agent-rules -->

## Prisma 7.5

This project uses Prisma 7.5 (NOT Prisma 5.x or 6.x). Key differences:

- Datasource URL is configured in `prisma.config.ts`, NOT in `schema.prisma`
- The `url` field in the datasource block is no longer supported
- Use `npx prisma db push` for development (no migration files with SQLite)
- Import from `@prisma/client` as usual
- `prisma.config.ts` must be present for Prisma CLI to work

## React 19

This project uses React 19.2. Key differences:

- `use()` hook for reading promises and context
- Server Components are first-class
- Actions (`"use server"`) for form handling
- `ref` is a regular prop (no `forwardRef` needed)

## Tailwind CSS 4

This project uses Tailwind CSS 4. Key differences:

- CSS-first configuration (no `tailwind.config.js` — config is in `globals.css`)
- Use `@import "tailwindcss"` instead of `@tailwind` directives
- New default color palette
