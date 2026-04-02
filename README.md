# NomadBridge

Connects digital nomads in Bangkok with universities for events, facility access, and community.

## Documentation (start here for humans and agents)

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Agent rules: stack, auth mock, API contracts, git, testing |
| [AGENTS.md](AGENTS.md) | Next.js / Prisma / React version notes |
| [docs/specs/\_index.md](docs/specs/_index.md) | Feature specs and cross-dependencies |
| [docs/plans/overview.md](docs/plans/overview.md) | Implementation waves and task index |
| [docs/knowledge-base.md](docs/knowledge-base.md) | Business rules, enums, **locked architecture decisions** |
| [docs/target-schema.prisma](docs/target-schema.prisma) | Canonical target database schema |

## Development

```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run tests: `npx vitest run`.

---

This app uses [Next.js](https://nextjs.org) (App Router). Default template notes from `create-next-app` were replaced by the links above.
