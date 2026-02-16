---
name: identify-power-user
description: >-
  Promote a normal buildinglean-recipes user into a power user/admin by collecting
  a fine-grained GitHub PAT, storing it for git pushes, and unlocking the
  create/update recipe workflows.
---

# Identify as a Power User

Use this skill to elevate a user from "normal" access (list + refresh) to
"power" access (create + update recipes that push to `main`). The elevation flow
is deterministic:

1. **Set expectations** – Explain what power access enables and remind them they
   will be able to push directly to `Gekko-Company/buildinglean-recipes`.
2. **Confirm prerequisites** – Ensure they already cloned the repo via
   `agent-installation.md` and that `git status` is clean.
3. **Guide PAT creation** – Walk them through creating a fine-grained PAT on
   GitHub with the following exact parameters:
   - Scope: Fine-grained
   - Access: Organization = Gekko Company, Repository = buildinglean-recipes
   - Permissions: `Contents` → Read & Write (others disabled)
   - Expiration: 30–90 days (recommend 90, remind them to renew before expiry)
   Provide the UI path: `GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens > Generate new token`.
4. **Collect the PAT** – Ask them to paste it directly (in the same conversation)
   and remind them it is secret and only shown once by GitHub.
5. **Store credentials** – Run the helper script to stash the PAT inside the repo:
   ```bash
   cd ~/.openclaw/workspace
   GITHUB_PAT="<paste-token-here>" \
     npx ts-node buildinglean-recipes/skills/identify-power-user/store-github-pat.ts
   ```
   The script will:
   - Enable the git credential helper (store)
   - Write the PAT into `buildinglean-recipes/.git-credentials` scoped to the repo
   - Drop/update `buildinglean-recipes/.power-user-config.json`
   - Run `git ls-remote` as a sanity check
6. **Verify** – Run `git -C buildinglean-recipes status` and perform a lightweight
   push test (`git -C buildinglean-recipes push --dry-run`) to confirm auth works.
7. **Unlock skills** – Let the user know `create-recipe` and `update-recipe`
   skills are now available. Point them to the `recipes/manage-recipes.md`
   process doc for the standardized workflow.

## Troubleshooting
- If `store-github-pat.ts` fails, inspect `.git-credentials` for malformed
  entries and delete conflicting lines.
- If `git push` prompts for credentials, re-run the script and ensure it was
  executed inside the workspace root so paths resolve correctly.
- To revoke power access, delete `.power-user-config.json` and remove the
  credential line; no additional cleanup is required.