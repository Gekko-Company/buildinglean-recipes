---
name: refresh
description: >-
  Update the local buildinglean-recipes repository.
---

# Buildinglean Refresh Skill

Use this skill whenever the user says "Update buildinglean", "Refresh recipes", or
asks for the latest workflow instructions. It performs a `git pull` inside the
`buildinglean-recipes` directory with `--strategy-option theirs` so remote edits win.

## Files
- `refresh.ts` — TypeScript script that runs `git -C buildinglean-recipes pull --strategy-option theirs`.

## How to Run
```bash
cd ~/.openclaw/workspace
npx ts-node buildinglean-recipes/skills/refresh/refresh.ts
```

If `ts-node` is not installed globally, run `npm install -g ts-node typescript` once or
use `npx ts-node` as shown above.

## Expected Outcome
- Fetch + merge from origin/main.
- Any conflicts automatically resolve in favor of remote (`theirs`).
- Console output shows the git status before and after the pull.

## Notes
- Requires git access to the upstream repository (configure PAT/SSH ahead of time).
- Safe to run multiple times per day; it only updates the `buildinglean-recipes` directory.