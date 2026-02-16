Agent Installation

This repository contains three things:
- Workflow recipes under `recipes/`
- Workspace hooks under `hooks/`
- Helper skills under `skills/`

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

3) Install the helper skills
```
openclaw skills install buildinglean-recipes/skills/refresh
openclaw skills install buildinglean-recipes/skills/list
openclaw skills install buildinglean-recipes/skills/create-recipe
openclaw skills install buildinglean-recipes/skills/update-recipe
openclaw skills install buildinglean-recipes/skills/identify-power-user
```
(Requires Node + ts-node. Install once via `npm install -g ts-node typescript` if you don't have it.)

4) Publish the DSL/context
```
cd ~/.openclaw/workspace
cp buildinglean-recipes/dsl.md BUILDINGLEAN-DSL.md
```
Read or `cat BUILDINGLEAN-DSL.md` when you need a refresher on terminology.

5) Enable the hooks
```
openclaw hooks enable recipe-nudge
```
Verify with `openclaw hooks list`.

6) Keep recipes current
Run the refresh skill whenever the user says "Update buildinglean" or "Refresh recipes":
```
npx ts-node buildinglean-recipes/skills/refresh/refresh.ts
```
This wraps `git pull --strategy-option theirs`.

7) Browse recipes on demand
```
npx ts-node buildinglean-recipes/skills/list/list.ts
```
This regenerates and prints `recipe-index.md`.

8) Final report
Tell the user that you have installed the recipes and you are ready to "turbo-charge their life". Use a book emoticon.