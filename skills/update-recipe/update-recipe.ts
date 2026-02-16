#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";

const workspaceDir = process.env.OPENCLAW_WORKSPACE_DIR || path.resolve(".");
const repoDir = path.join(workspaceDir, "buildinglean-recipes");
const recipesDir = path.join(repoDir, "recipes");
const configPath = path.join(repoDir, ".power-user-config.json");

function exit(msg: string) {
  console.error(msg);
  process.exit(1);
}

function ensurePower() {
  if (!fs.existsSync(configPath)) {
    exit("Power user config missing. Run identify-power-user first.");
  }
}

function main() {
  if (process.argv.length < 3) {
    exit("Usage: update-recipe.ts <slug>");
  }
  const slug = process.argv[2];
  const recipePath = path.join(recipesDir, `${slug}.md`);
  if (!fs.existsSync(recipePath)) {
    exit(`Recipe not found: ${recipePath}`);
  }
  ensurePower();
  const content = fs.readFileSync(recipePath, "utf-8");
  console.log(`=== Begin ${slug}.md ===
${content}
=== End ${slug}.md ===`);
  console.log("Edit the file in your preferred editor, then rerun validations.");
}

main();