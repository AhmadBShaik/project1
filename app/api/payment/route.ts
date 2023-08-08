import { stripeClient } from "@/clients/stripe-server-client";
import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import { getURL } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

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
    mode: "payment",
    allow_promotion_codes: true,
    success_url: `${getURL()}/`,
    cancel_url: `${getURL()}/pricing`,
  });

  return NextResponse.json(
    {
      sessionId: session.id,
    },
    {
      status: 200,
    }
  );
}
