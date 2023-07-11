import { NextResponse } from "next/server";
import { User, UserModelSchema } from "@/models/User";
import { ZodError } from "zod";

export async function GET(): Promise<
  NextResponse<
    | {
        data: User;
      }
    | {
        error: ZodError<User>;
      }
  >
> {
  const userValidation = UserModelSchema.safeParse({
    id: "7d2d06e4-53d1-4e2f-a7df-0f623a4ae3d2",
    name: "Ahmad",
    email: "ahmad.shaik1106@gmail.com",
  });
  console.log("data", userValidation);

  if (userValidation.success) {
    return NextResponse.json({
      data: userValidation.data,
    });
  } else {
    return NextResponse.json({
      error: userValidation.error,
    });
  }
}
