import { info } from "@lib/log.ts";

function run(args: string[]): void {
  try {
    const command = new Deno.Command(args[0], {
      args: args.slice(1),
      stdin: "null",
      stdout: "piped",
    });

    const { stderr } = command.outputSync();
    const out = new TextDecoder().decode(stderr)
      .split("\n")
      .filter((o) => o != "")
      .map((o) => o.trim());

    out.forEach((o) => info(o));
  } catch (error) {
    throw error as Error;
  }
}
info("Setting up dev environment...");

info("Generating Prisma client in ./src/database/generated");
run(["deno", "task", "db:generate"]);
info("Prisma client generated");

info("Starting dev database...");
run(["docker", "compose", "up", "-d"]);
info("Dev database started");

// 5 second timeout to allow database to finish setting up
setTimeout(() => {
  info("Applying database schema to database instance...");
  run(["deno", "task", "db:push"]);
  info("Database schema applied");
}, 5000);

info(
  "Dev environment setup complete. You can start the api with deno task api:dev",
);
