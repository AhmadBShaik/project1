import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const sessionResponse = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;
  if (
    !!sessionResponse.data.session &&
    (pathname === "/sign-in" || pathname === "/sign-up")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (
    !sessionResponse.data.session &&
    !(pathname === "/sign-in" || pathname === "/sign-up")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/payment",
    "/get-products",
    "/pricing",
    "/sign-in",
    "/sign-up",
  ],
};
