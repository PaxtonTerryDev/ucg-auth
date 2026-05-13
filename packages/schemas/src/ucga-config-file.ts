import z from "zod";

export const ucgaConfigSchema = z.object({
  repositoryUrl: z.string(),
  applicationId: z.string(),
});

export type UCGAConfig = z.infer<typeof ucgaConfigSchema>;
