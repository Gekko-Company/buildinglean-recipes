#!/usr/bin/env ts-node
import { spawn } from "node:child_process";
import path from "node:path";

async function run() {
  const workspaceDir = process.env.OPENCLAW_WORKSPACE_DIR || path.resolve(".");
  const repoDir = path.join(workspaceDir, "buildinglean-recipes");

  await execCommand("git", ["-C", repoDir, "status"], "Checking repository");
  await execCommand(
    "git",
    ["-C", repoDir, "pull", "--strategy-option", "theirs"],
    "Pulling latest recipes"
  );
}

function execCommand(cmd: string, args: string[], label: string): Promise<void> {
  console.log(`
=== ${label} ===`);
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
      }
    });
    child.on("error", reject);
  });
}

run().catch((err) => {
  console.error("Refresh failed:", err.message);
  process.exitCode = 1;
});