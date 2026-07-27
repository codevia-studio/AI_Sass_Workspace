import { PROMPT_CATEGORIES } from "@/constants";
import { z } from "zod/v3";

export const promptSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(80, "Title must be 80 characters or less"),
  content: z
    .string()
    .min(1, "Prompt content is required")
    .max(4000, "Prompt must be 4000 characters or less"),
  category: z.enum(PROMPT_CATEGORIES),
  workspaceId: z.string().uuid().nullable().optional(),
});

export type PromptFormValues = z.infer<typeof promptSchema>;
