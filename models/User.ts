import { z } from "zod";

export const UserModelSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserModelSchema>;
