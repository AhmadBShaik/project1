import { stripeClient } from "@/clients/stripe-server-client";
import { NextResponse } from "next/server";

export async function GET() {
  const pricesResponse = await stripeClient.prices.list({ limit: 6 });
  const { data } = pricesResponse;

  return NextResponse.json({
    data: data.reverse(),
  });
}
