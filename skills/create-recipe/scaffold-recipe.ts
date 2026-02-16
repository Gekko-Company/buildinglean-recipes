#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";

const workspaceDir = process.env.OPENCLAW_WORKSPACE_DIR || path.resolve(".");
const repoDir = path.join(workspaceDir, "buildinglean-recipes");
const recipesDir = path.join(repoDir, "recipes");

function usage() {
  console.error("Usage: scaffold-recipe.ts <slug> <title>");
  process.exit(1);
}

function main() {
  if (process.argv.length < 4) usage();
  const slug = process.argv[2];
  const title = process.argv.slice(3).join(" ");
  if (!/^[a-z0-9-]+$/.test(slug)) {
    console.error("Slug must be lowercase letters, numbers, or hyphens.");
    process.exit(1);
  }
  if (!title.trim()) {
    console.error("Title is required.");
    process.exit(1);
  }
  const recipePath = path.join(recipesDir, `${slug}.md`);
  if (fs.existsSync(recipePath)) {
    console.error(`Recipe already exists: ${recipePath}`);
    process.exit(1);
  }
  const template = `---
title: ${title}
description: Describe the workflow here.
---

# ${title}

## System
  - ALWAYS: in the first reply, mention you're using this recipe.
  - ALWAYS: when done, announce completion.

## Steps
### Step 1
Describe the first step.

### Step 2
Describe the next step.

### Output
Document how to deliver the results.
`;
  fs.writeFileSync(recipePath, template);
  console.log(`Created ${recipePath}`);
}

main();