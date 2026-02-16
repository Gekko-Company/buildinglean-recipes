---
title: Managing Buildinglean Recipes
description: This recipe describes the canonical process for writing or updating any recipe inside `buildinglean-recipes`. Power users should follow it before running the automation skills.
private: true
---

# Managing Buildinglean Recipes

## System
  - ALWAYS: mention in your first reply that you are using the "Managing
    Buildinglean Recipes" process.
  - ALWAYS: announce when the process is complete and the repo was pushed.

## Steps
### Intake
- Clarify the request: what workflow are we encoding or modifying?
- Capture desired outcomes, inputs, and constraints.
- Confirm whether this is a new recipe or an update.

### Design
- Break the workflow into deterministic steps that an AI can follow without
  assumptions.
- Identify required scripts/assets; note them in the recipe or skill.
- Decide on slug (kebab-case) and final filename.

### Author
- Populate frontmatter (`title`, `description`), `# Title`, `## System`, `## Steps`, and `### Output`.
- Keep instructions action-oriented: verbs + specifics.
- Add guardrails (e.g., "wait for user approval", "save to path") wherever
  failure would be costly.

### Validate  
- Preview the rendered markdown to ensure headings render correctly.

### Commit & Push
- Stage the new/updated files plus regenerated artifacts.
- Use conventional commits (`feat(recipe): ...`, `fix(recipe): ...`).
- Push directly to `main` (power users only).

### Handoff
- Summarize what changed for the requester.
- Provide next steps (e.g., "Run buildinglean-list to see the new entry").
