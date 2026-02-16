---
name: update-recipe
description: >-
  Modify an existing buildinglean recipe with the standardized review → edit →
  commit → push flow (power users only).
---

# Update a Recipe

Use this skill to alter an existing recipe once power credentials are configured.

## Workflow
1. **Preflight** – Ensure `.power-user-config.json` exists and `git status` is
   clean. Clarify the change request with the user (bugfix, scope expansion,
   deprecation, etc.).
2. **Load the recipe** – Display the current contents using:
   ```bash
   cd ~/.openclaw/workspace
   npx ts-node buildinglean-recipes/skills/update-recipe/update-recipe.ts <slug>
   ```
   This prints the file for quick review; open it in an editor to apply changes.
3. **Apply edits** – Follow the guidance in `recipes/manage-recipes.md` to keep
   structure consistent. Highlight any new steps, updated outputs, or removed
   sections.
4. **Validate** – Run available linters (recipe generator, markdownlint). Confirm
   the recipe still meets deterministic, testable standards.
5. **Commit + push** –
   ```bash
   git -C buildinglean-recipes add recipes/<slug>.md
   git -C buildinglean-recipes commit -m "fix(recipe): <short summary>"
   git -C buildinglean-recipes push origin main
   ```
6. **Report back** – Summarize the edits (before/after bullet points) so the
   requester can confirm the change.

## Tips
- For large rewrites, use separate commits (one for restructuring, one for new
  content) to keep history readable.
- If a recipe is obsolete, coordinate with the owner about archiving versus
  updating; this skill assumes the file remains active.