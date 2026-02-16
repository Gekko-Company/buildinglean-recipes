---
name: buildinglean-list
description: >-
  Display the catalog of available buildinglean recipes so users can pick the
  workflow they need.
---

# Buildinglean Recipe List Skill

Call this skill when the user asks "What recipes exist?" or wants a quick menu
before kicking off work. It regenerates `recipe-index.md` (if the generator exists)
and prints the catalog to stdout.

## Files
- `list.ts` — TypeScript script that (1) runs `scripts/update-recipe-index.mjs`,
  then (2) dumps `recipe-index.md` to the console.

## How to Run
```bash
cd ~/.openclaw/workspace
npx ts-node buildinglean-recipes/skills/buildinglean-list/list.ts
```

## Output
Example console output:
```
=== Available Recipes ===
# Recipe repository index
  - ./recipes/blog.md: Writing a blog post - Allows the user to write a professional blog post
  - ./recipes/tweet.md: Writing a tweet - Allows the user to draft a tweet
```

## Notes
- Requires Node.js + ts-node (install via `npm install -g ts-node typescript` if needed).
- If `scripts/update-recipe-index.mjs` is missing, the script still reads the last
  committed `recipe-index.md` and warns that regeneration was skipped.