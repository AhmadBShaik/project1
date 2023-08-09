"use client";
import PricingCards from "@/components/pricing-cards";
import { useState } from "react";
import Stripe from "stripe";

export default function Pricing() {
  const [planInterval, setPlanInterval] =
    useState<Stripe.Price.Recurring.Interval>("month");

  return (
    <section className="flex-1 w-full mx-auto p-5 xl:px-0 flex flex-col">
      <div className="flex-1 flex flex-col space-y-8">
        <div className="text-center space-y-2 mb-5">
          <h1 className="text-green-500  text-4xl sm:text-5xl md:text-6xl font-bold">
            Pricing Plans
          </h1>
          <p className=" text-xl sm:text-2xl md:text-3xl">
            Browse personalized content with the following plans
          </p>
        </div>
        <div className="h-1/6"></div>
        <PricingCards />
      </div>
    </section>
  );
}
