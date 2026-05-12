import * as path from "@std/path";
import { homedir } from "node:os";

interface SearchPredicate {
  file?: string;
  dir?: string;
}

/** Walks up the file system tree until it finds a directory containing ALL search predicate items */
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
    const contents = Deno.readDir(currentDir);
    for await (const dirEntry of contents) {
      const { name } = dirEntry;
      if (name === predicate.file || name === predicate.dir) {
        return currentDir;
      }
    }
    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }

  return null;
}
