#!/usr/bin/env ts-node
import { promises as fs } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

async function run() {
  const workspaceDir = process.env.OPENCLAW_WORKSPACE_DIR || path.resolve(".");
  const repoDir = path.join(workspaceDir, "buildinglean-recipes");
  const indexPath = path.join(repoDir, "recipe-index.md");
  const generatorPath = path.join(repoDir, "scripts", "update-recipe-index.mjs");

  await ensureIndex(generatorPath, repoDir);

  const content = await fs.readFile(indexPath, "utf8");
  console.log(`
=== Available Recipes ===
`);
  console.log(content.trim());
}

async function ensureIndex(generatorPath: string, repoDir: string) {
  try {
    await fs.access(generatorPath);
  } catch {
    console.warn("Index generator not found; skipping regeneration.");
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const child = spawn("node", [generatorPath], { cwd: repoDir, stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Index generator exited with code ${code}`));
    });
    child.on("error", reject);
  });
}

run().catch((err) => {
  console.error("Failed to list recipes:", err.message);
  process.exitCode = 1;
});