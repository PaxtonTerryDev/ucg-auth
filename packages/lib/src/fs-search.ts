import * as path from "node:path";
import * as fs from "node:fs";
import { homedir } from "node:os";

interface SearchPredicate {
  file?: string;
  dir?: string;
}

export async function fsSearch(
  startingDir: string,
  predicate: SearchPredicate,
): Promise<string | null> {
  if (!predicate.file && !predicate.dir) {
    throw new Error("Must provide at least one search predicate");
  }

  let currentDir = path.resolve(startingDir);
  const home = homedir();

  while (currentDir.length >= home.length) {
    const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === predicate.file || entry.name === predicate.dir) {
        return currentDir;
      }
    }
    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }

  return null;
}
