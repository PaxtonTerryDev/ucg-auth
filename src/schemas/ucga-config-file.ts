import z from "zod";

export const ucgaConfigFileSchema = z.object({
  name: z.string(),
  url: z.string(),
  slug: z.string(),
});

export type UCGAConfigFile = z.infer<typeof ucgaConfigFileSchema>;
