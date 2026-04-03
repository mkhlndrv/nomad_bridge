# Agentic Development Playbook

> ⚠️ **Coursework document** — not an implementation reference. Canonical docs are in `docs/specs/` and `docs/plans/`.

## Tool Selection

After comparing the main agentic tools, I have chosen **Claude Code (VS Code Extension)** as the primary development tool for this project, with the Claude Code CLI as a strong backup when deeper reasoning or longer autonomous sessions are required.

**Rationale for Claude Code:**
- Excellent reasoning capabilities and long context handling
- Visual diffs make it easy to review and understand changes
- Smooth integration within VS Code for fast iteration
- Strong support for MCP tools

Windsurf is good for rapid flow-state development but has weaker deep reasoning compared to Claude.  
Google Antigravity is powerful for multi-agent orchestration but introduces unnecessary complexity and a different IDE for this course project.

## Decision Framework

For every feature in NomadBridge, I will follow this decision process:
1. Write a clear and detailed specification first (including acceptance criteria and edge cases).
2. Evaluate the complexity of the task.
3. Decide whether to use the VS Code Extension (for most work) or switch to CLI (for complex logic or heavy planning).
4. Consider if MCP tools would help (e.g., QR code generation).
5. Always maintain good context through CLAUDE.md and the docs folder.

## Chosen Development Workflow

The main workflow will be **Spec-First Iterative Development**:

- Start with a detailed specification
- Break the feature into small, focused tasks
- Implement one task at a time using atomic commits
- Review changes carefully
- Test the implementation
- Refine iteratively based on results

Additional supporting practices:
- Atomic commits: one logical change per commit with clear messages
- Maintain strong documentation (CLAUDE.md, specs, and knowledge base)
- Use MCP tools when custom capabilities are needed

## Lessons Learned

- Providing clear, well-structured specifications dramatically improves the quality and relevance of Claude Code’s output.
- Visual diffs in the VS Code Extension significantly speed up code review and validation.
- Atomic commits create a clean git history that is easy to follow and demonstrate.
- Keeping CLAUDE.md updated serves as persistent memory and effective guardrails for the agent.
- Iterative refinement after testing leads to more reliable and higher-quality features.

## Action Plan for NomadBridge

- Primary agent: Claude Code VS Code Extension
- Context management: Strong CLAUDE.md + docs/knowledge-base.md + specs folder
- Development style: Spec-first approach combined with atomic commits and iterative testing
- Tool extension: Use custom MCP tools for utilities such as QR code generation
- Quality control: Add basic tests for core logic (RSVP, booking, trust score)
- Documentation: Keep feature specifications in docs/specs/ and major decisions well documented

This playbook will be reviewed and updated as the project progresses.