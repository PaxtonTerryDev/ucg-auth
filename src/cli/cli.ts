import { Command } from "@cliffy/command";
import { authCommand } from "@cli/commands/auth.ts";

const initCommand = new Command();

await new Command()
  .name("ucauth")
  .version("0.1.0")
  .description(
    "Command line interface for the Utah County Government Authentication System",
  )
  .command("auth", authCommand)
  .command("init", initCommand)
  .parse();
