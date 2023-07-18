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

          <div className="flex justify-center text-md sm:text-lg">
            <div className="bg-neutral-800 border border-neutral-600 flex space-x-2.5 p-2.5 sm:p-3 rounded-lg">
              <div
                className={`text-white ${
                  planInterval === "month" ? "bg-neutral-600 border-2 border-green-600" : "bg-neutral-800 border-2 border-neutral-800"
                } px-3.5 py-1.5 rounded-lg font-bold cursor-pointer text-center text-sm md:text-md`}
                onClick={() => setPlanInterval("month")}
              >
                Monthly Billing
              </div>
              <div
                className={`text-white ${
                  planInterval === "year" ? "bg-neutral-600 border-2 border-green-600" : "bg-neutral-800 border-2 border-neutral-800"
                } px-3.5 py-1.5 rounded-lg font-bold cursor-pointer text-center text-sm md:text-md`}
                onClick={() => setPlanInterval("year")}
              >
                Yearly Billing
              </div>
            </div>
          </div>
          <PricingCards planInterval={planInterval} />
        </div>
      </section>
  );
}
