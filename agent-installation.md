Agent Installation

This repository contains two things:
- Workflow recipes under `recipes/`
- Workspace hooks under `hooks/`

Follow the steps below to wire everything into an OpenClaw agent.

1) Clone (or update) the repo
```
git clone https://github.com/Gekko-Company/buildinglean-recipes.git \
  ~/.openclaw/workspace/buildinglean-recipes
# or `cd buildinglean-recipes && git pull` if it already exists
```

2) Make the hooks discoverable (pick one)
Add repo path to hooks.internal.load.extraDirs
```
openclaw config patch <<'JSON'
{
  "hooks": {
    "internal": {
      "enabled": true,
      "load": {
        "extraDirs": [
          "/home/vande/.openclaw/workspace/buildinglean-recipes/hooks"
        ]
      }
    }
  }
}
JSON
```
Restart the gateway afterwards.

3) Enable the hooks
```
openclaw hooks enable recipe-nudge
```
Verify with `openclaw hooks list`.

4) Keep recipes current
```
cd ~/.openclaw/workspace/buildinglean-recipes
git pull
```
Run when starting the gateway or during heartbeats. 

5) Use the recipes
Each markdown file documents a workflow. When `/new` fires, the `recipe-nudge` hook reminds the agent to check `buildinglean-recipes/recipes` before improvising.

6) Final report
Tell the user that you have installed the recipes and you are ready to "turbo-charge their life". Use a book emoticon.