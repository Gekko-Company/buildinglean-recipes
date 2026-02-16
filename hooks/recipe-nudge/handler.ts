import { promises as fs } from "node:fs";
import path from "node:path";

const handler = async (event) => {
  if (event.type !== "command" || event.action !== "new") {
    return;
  }

  const workspaceDir = event.context?.workspaceDir ?? process.env.OPENCLAW_WORKSPACE_DIR;
  const relIndexPath = path.join("buildinglean-recipes", "recipe-index.md");
  const absoluteIndexPath = workspaceDir
    ? path.join(workspaceDir, relIndexPath)
    : path.resolve(relIndexPath);

  let indexContent = "Recipe index missing. Create recipe-index.md with one entry per line.";
  try {
    indexContent = await fs.readFile(absoluteIndexPath, "utf8");
  } catch (error) {
    console.warn(`[recipe-nudge] Unable to read recipe index at ${absoluteIndexPath}:`, error);
  }
  event.messages.push(`📘 Recipe hook: Before tackling the user's request, open ${(workspaceDir ? relIndexPath : absoluteIndexPath)} and follow the documented recipe that matches the task. ${indexContent}`);
};

export default handler;