import { stripeClient } from "@/clients/stripe-server-client";
import { Database } from "@/lib/database.types";
import { getURL } from "@/utils/helpers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
  console.log("user", user);

  const { price, quantity = 1, metadata = {} } = await req.json();

  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "required",
    line_items: [
      {
        price: price.id,
        quantity,
      },
    ],
    mode: "subscription",
    allow_promotion_codes: true,
    subscription_data: {
      trial_from_plan: true,
      metadata,
    },
    success_url: `${getURL()}/`,
    cancel_url: `${getURL()}/`,
  });

  console.log("stripe session", session);
  return NextResponse.json(
    {
      sessionId: session.id,
    },
    {
      status: 200,
    }
  );
}
