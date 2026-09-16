# Codex Repository Guidance

## Shared rules with Claude Code

Before any planning, implementation, or review work, read `CLAUDE.md` at the
repository root: the stack, the layout, the commands, and the rules of the
build. Claude Code imports this file through `.claude/rules/shared-agent-rules.md`
so the main session and every fresh subagent load one shared copy of the
guardrails below.

Guardrails that apply regardless of which file you read first:

- Never run `git commit`, `git push`, `git rebase`, `git merge`, `git stash`,
  `git tag`, or any destructive git command. Never create PRs, issues, or
  comments via `gh`. The human owns all git and GitHub writes, including the
  milestone tags and the Pages deploy.
- Never add AI or assistant authorship attribution to commits, PRs, or code.
- No code comments unless explicitly asked; rationale goes in chat or the docs.
- ASCII only in source edits (no em dashes or smart quotes).
- Every gameplay and feel number lives in `src/tuning.ts`. Nothing else
  hard-codes one. A new number means a new tuning key.
- `src/game/` never imports three. three is imported only under `src/render/`
  and in `src/main.ts`.
- Vitest covers `src/game/` logic only; tests assert behavior, not
  implementation. Everything visual is verified by looking at the running game.
- Never claim a visual or feel change works without looking at it. Claude uses
  the Chrome DevTools MCP (`CLAUDE.md`, Rules of the build). If you cannot look,
  say exactly what was not verified.
- Procedural geometry only. No imported or generated 3D models.
- Human code edits are interventions and are logged in `docs/interventions.md`.
  Agent edits are not interventions.

## Review focus (for `codex review`)

Review as a staff-level TypeScript and Three.js engineer building a real-time
browser game. Prioritize, in order: correctness bugs in the fixed-timestep
simulation under `src/game/`; allocation or per-frame work that will hurt
frame rate with 2000 enemies; gameplay or feel numbers hard-coded outside
`src/tuning.ts`; three imports leaking into `src/game/`; DOM or three code
that would break the `?autoplay=1` bot or `?screenshot=1` mode; missing
Vitest coverage on `src/game/` logic. Cite file paths and line numbers for
every finding. Skip style-only remarks.

## Verify before relying

Stack facts (three 0.186 API shapes, Vite 8 base handling, Chrome DevTools MCP
tools) are pinned in `docs/research/` after verification against primary
sources. A claim about the stack that is not there gets checked against the
primary source before it drives a change. Negative claims ("nothing calls X",
"no test covers Y") get an `rg` first.

## Refresh current state before planning or reviewing

Re-read the current implementation and the tuning defaults before relying on
the platform context doc or an earlier assessment. The context doc is
navigation, not evidence, once code has moved.
