import { z } from "zod";

export const PostModelSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
});

export const PostsModelSchema = z.array(PostModelSchema);

export type Post = z.infer<typeof PostModelSchema>;
export type Posts = z.infer<typeof PostsModelSchema>;
