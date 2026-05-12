import { Command } from "@cliffy/command";
import { UCGAConfig, ucgaConfigSchema } from "@schemas/ucga-config-file.ts";

export const initCommand = new Command()
  .description("Initialize an application with the UCG Auth system")
  .action(async () => {
  });

const CONFIG_FILE_NAME: string = "ucga.config.json";

async function createDefaultConfigFile(
  dirpath: string,
  repositoryUrl: string,
  applicationId: string,
  secret: string,
): UCGAConfig {
  const cfg: UCGAConfig = {
    repositoryUrl,
    applicationId,
  };
}

function loadConfigFile();
