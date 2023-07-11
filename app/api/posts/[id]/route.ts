import { NextResponse } from "next/server";
import posts from "@/public/posts.json";

import { Post, PostModelSchema } from "@/models/Post";
import { ZodError } from "zod";

export async function GET(
  request: Request,
  context: { params: { id: string } }
): Promise<
  NextResponse<
    | {
        data: Post;
      }
    | {
        error: ZodError<Post>;
      }
    | { error: string }
  >
> {
  console.log("id", context.params.id);
  const post = posts.find((post) => post.id === context.params.id);
  if (!post) {
    return NextResponse.json(
      {
        error: "Post Not Found",
      },
      { status: 404 }
    );
  }
  const postsValidation = PostModelSchema.safeParse(post);

  if (postsValidation.success) {
    return NextResponse.json({
      data: postsValidation.data,
    });
  } else {
    return NextResponse.json(
      {
        error: postsValidation.error,
      },
      { status: 400 }
    );
  }
}
