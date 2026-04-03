# NomadBridge

Connects digital nomads in Bangkok with universities for events, facility access, and community.

## Documentation (start here for humans and agents)

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Agent rules: stack, auth mock, API contracts, doc authority, git, testing |
| [AGENTS.md](AGENTS.md) | Next.js / Prisma / React / Tailwind version notes |
| [docs/specs/\_index.md](docs/specs/_index.md) | Feature specs, **doc authority ladder**, cross-dependencies |
| [docs/plans/overview.md](docs/plans/overview.md) | Implementation waves and task index |
| [docs/knowledge-base.md](docs/knowledge-base.md) | Business rules, enums, **locked architecture decisions** |
| [docs/target-schema.prisma](docs/target-schema.prisma) | Canonical target database schema (21 models, 19 enums) |
| [docs/manifest.json](docs/manifest.json) | Machine-readable doc index for programmatic retrieval |
| [docs/plans/release-gate.md](docs/plans/release-gate.md) | Sprint completion checklist |

> Files in `docs/coursework/` are human-audience course deliverables — not implementation references.

## Development

```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run tests: `npx vitest run`.

## Agentic Development Infrastructure

This project is equipped with a suite of agent-ready development tools that provide high-signal documentation search and real-time project health metrics.

### 1. Documentation Indexing
Builds a comprehensive structural mapping (`docs/index.json`) of all documentation files. This index is deeply leveraged by the local cascade environment to trace context and architecture dependencies.
```bash
npm run docs:index
```

### 2. Semantic Search
Perform powerful, content-aware semantic searches across the entire generated documentation map right from the terminal.
```bash
# Example: querying the system for "events" logic
npm run docs:search "events"
```

### 3. Testing & Coverage Reporting
Execute the Vitest framework across unit layers to generate real-time metrics and dynamic HTML/JSON test coverage reports locally.
```bash
npm run test:report
```

### 4. Cascade Development Dashboard
Once the indexing and testing reports are generated, you can view the unified real-time health data visually. While running the Next.js development server (`npm run dev`), navigate directly to local path:
[http://localhost:3000/cascade](http://localhost:3000/cascade)
