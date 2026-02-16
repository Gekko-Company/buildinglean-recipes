---
name: recipe-nudge
description: "Remind the agent to consult buildinglean recipes whenever a /new command kicks off fresh work"
metadata:
  openclaw:
    emoji: "📘"
    events: ["command:new"]
---

# Recipe Nudge Hook

This hook fires whenever `/new` is issued. It nudges the agent to check the cloned
`buildinglean-recipes/recipes` directory for a matching workflow recipe before improvising a plan.

## What It Does

- Listens for `command:new` events.
- Reads the recipe directory to surface available markdown recipes.
- Pushes a reminder message into the session so the agent searches for a relevant recipe first.

## Requirements

- The `buildinglean-recipes` repo must be cloned inside the workspace root.

## Configuration

No additional configuration is required. Enable it with `openclaw hooks enable recipe-nudge` and restart the gateway if necessary.
