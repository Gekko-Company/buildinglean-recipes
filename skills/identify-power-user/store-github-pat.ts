#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const workspaceDir = process.env.OPENCLAW_WORKSPACE_DIR || path.resolve(".");
const repoDir = path.join(workspaceDir, "buildinglean-recipes");
const credsPath = path.join(repoDir, ".git-credentials");
const configPath = path.join(repoDir, ".power-user-config.json");
const remote = "https://github.com/Gekko-Company/buildinglean-recipes.git";

function getPat(): string {
  const envToken = process.env.GITHUB_PAT?.trim();
  if (envToken) {
    return envToken.trim();
  }
  const argToken = process.argv[2]?.trim();
  if (argToken) {
    return argToken;
  }
  console.error(
    "Missing PAT. Provide it via GITHUB_PAT env var or as the first argument."
  );
  process.exit(1);
}

function validatePat(token: string) {
  if (token.length < 30) {
    throw new Error("PAT appears too short. Expected fine-grained token (>= 30 chars).");
  }
  if (token.includes(`
`)) {
    throw new Error("PAT cannot contain newline characters.");
  }
}

function ensureRepoDir() {
  if (!fs.existsSync(repoDir)) {
    throw new Error(`Repo not found at ${repoDir}. Set OPENCLAW_WORKSPACE_DIR if needed.`);
  }
}

function ensureCredentialHelper() {
  execSync("git config credential.helper store", { cwd: repoDir });
}

function writeCredentials(token: string) {
  const tokenUrl = remote.replace("https://", `https://${token}@`);
  let existing = "";
  if (fs.existsSync(credsPath)) {
    existing = fs.readFileSync(credsPath, "utf-8");
  }
  const filtered = existing
    .split(/\r?\n/)
    .filter((line) => !line.includes("github.com/Gekko-Company/buildinglean-recipes"))
    .filter((line) => line.trim().length > 0)
    .join(`
`);
  const next = [filtered, tokenUrl].filter(Boolean).join(`
`) + `
`;
  fs.writeFileSync(credsPath, next, { mode: 0o600 });
}

function writePowerConfig() {
  const payload = {
    status: "enabled",
    remote,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(configPath, JSON.stringify(payload, null, 2) + `
`);
}

function testAuth() {
  try {
    execSync("git ls-remote", { cwd: repoDir, stdio: "ignore" });
  } catch (err) {
    console.warn("Warning: git ls-remote failed. Double-check the PAT scopes.");
  }
}

function main() {
  ensureRepoDir();
  const pat = getPat();
  validatePat(pat);
  ensureCredentialHelper();
  writeCredentials(pat);
  writePowerConfig();
  testAuth();
  console.log("Power-user credentials stored.");
  console.log(`Credential file: ${credsPath}`);
  console.log(`Power config: ${configPath}`);
}

main();