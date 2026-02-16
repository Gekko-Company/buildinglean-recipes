---
name: create-recipe
description: >-
  Create a brand-new buildinglean recipe (file scaffold, authoring checklist,
  commit, and push) after power-user credentials are configured.
---

# Create a Recipe

Use this skill only after `identify-power-user` has succeeded (check for
`buildinglean-recipes/.power-user-config.json`). This workflow turns a brief into
an executable recipe committed directly to `main`.

## Workflow
1. **Confirm power state** – Abort if `.power-user-config.json` is missing or
   `git -C buildinglean-recipes status` shows uncommitted changes not part of the
   new recipe.
2. **Collect inputs** – Gather:
   - Recipe title
   - One-line description (user-facing)
   - Target outcome / required steps
   - Any special constraints (style, outputs)
3. **Plan structure** – Map the process into the standard recipe sections. When
   unclear, reference `recipes/manage-recipes.md` and collaborate with the user
   until each step is explicit and testable.
4. **Scaffold file** – Use the helper script to create the markdown skeleton:
   ```bash
   cd ~/.openclaw/workspace
   npx ts-node buildinglean-recipes/skills/create-recipe/scaffold-recipe.ts <slug> "<Title>"
   ```
   Slug: lowercase kebab-case (e.g., `landing-page-audit`).
5. **Author content** – Edit the new file to fully capture the workflow:
   - Include `## Description`, `## System`, `## Steps`, and `### Output`
   - Keep instructions deterministic; break complex flows into numbered steps
   - Note any helper scripts or assets the recipe depends on
6. **Validate** – Run `node hooks/lint-recipes.mjs` (if available) or at least
   `markdownlint` to ensure formatting consistency. Re-run `recipe-index`
   generator if required.
7. **Commit + push** – Once satisfied:
   ```bash
   git -C buildinglean-recipes add recipes/<slug>.md
   git -C buildinglean-recipes commit -m "feat(recipe): add <slug>"
   git -C buildinglean-recipes push origin main
   ```
8. **Announce completion** – Summarize the new recipe (title, slug, key steps)
   and remind the user it’s live in `main`.

## Notes
- If the generator (`~/.github/scripts/update-recipe-index.mjs`) exists, run it before
  committing so `recipe-index.md` stays current.
- If slug collisions occur, prompt the user to pick a unique name or deprecate
  the older recipe intentionally.
- All conversations that led to the recipe should be captured in the commit
  message or description when possible.