import { NextResponse } from "next/server";
import posts from "@/public/posts.json";

import { Posts, PostsModelSchema } from "@/models/Post";
import { ZodError } from "zod";
export async function GET(): Promise<
  NextResponse<
    | {
        data: Posts;
      }
    | {
        error: ZodError<Posts>;
      }
  >
> {
  const postsValidation = PostsModelSchema.safeParse(posts);

  if (postsValidation.success) {
    return NextResponse.json({
      data: postsValidation.data,
    });
  } else {
    return NextResponse.json({
      error: postsValidation.error,
    });
  }
}
