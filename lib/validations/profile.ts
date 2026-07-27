import { z } from "zod/v3";

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(80, "Full name must be 80 characters or less"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
