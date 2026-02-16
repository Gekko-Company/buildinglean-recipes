#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const repoRoot = process.cwd();
const recipesDir = path.join(repoRoot, "recipes");
const indexPath = path.join(repoRoot, "recipe-index.md");

async function readRecipeFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  const { data: frontmatter } = matter(content);

  if (frontmatter?.title) {
    return {
      title: frontmatter.title,
      description: frontmatter.description ?? "",
      private: frontmatter.private === true,
    };
  }

  // Legacy fallback: parse # Title and ## Description
  const lines = content.split(/\r?\n/);
  const title = lines[0]?.startsWith("# ") ? lines[0].substring(2) : "";
  let description = "";
  const descHeaderIndex = lines.findIndex((line) => line.trim().toLowerCase() === "## description");
  if (descHeaderIndex !== -1) {
    for (let i = descHeaderIndex + 1; i < lines.length; i += 1) {
      const candidate = lines[i].trim();
      if (candidate.length === 0) continue;
      if (candidate.startsWith("#")) break;
      description = candidate;
      break;
    }
  }
  return { title, description, private: false };
}

async function buildIndex() {
  const entries = [];
  const dirents = await fs.readdir(recipesDir, { withFileTypes: true });
  for (const dirent of dirents) {
    if (!dirent.isFile() || !dirent.name.endsWith(".md")) continue;
    const relPath = `./recipes/${dirent.name}`;
    const fullPath = path.join(recipesDir, dirent.name);
    const meta = await readRecipeFile(fullPath);
    if (meta.private) continue;
    entries.push({ relPath, ...meta });
  }

  entries.sort((a, b) => a.title.localeCompare(b.title));

  const header = `# Recipe repository index  
`;
  const body = entries
    .map((entry) => {
      const displayPath = entry.relPath.replace(/^\.\/recipes\/?/, "") || entry.relPath;
      const desc = entry.description ? ` - ${entry.description}` : "";
      return `  - **${entry.title}**${desc} (*${displayPath}*)`;
    })
    .join(`
`);

  const output = `${header}

${body}
`;
  await fs.writeFile(indexPath, output, "utf8");
}

buildIndex().catch((error) => {
  console.error("Failed to update recipe index:", error);
  process.exitCode = 1;
});
