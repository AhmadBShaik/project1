"use client";
import PricingCards from "@/components/pricing-cards";
import { useState } from "react";
import Stripe from "stripe";

export default function Pricing() {
  const [planInterval, setPlanInterval] =
    useState<Stripe.Price.Recurring.Interval>("month");

  return (
    <main className="flex-1 mt-20 w-full flex flex-col">
      <section className="flex-1 w-full max-w-6xl mx-auto px-5 flex flex-col">
        <div className="flex-1 p-5 flex flex-col space-y-8">
          <div className="text-center space-y-2 mb-5">
            <h1 className="text-orange-500  text-4xl sm:text-5xl md:text-6xl font-bold">
              Pricing Plans
            </h1>
            <p className=" text-xl sm:text-2xl md:text-3xl">
              Browse personalized content with the following plans
            </p>
          </div>

          <div className="flex justify-center text-md sm:text-lg">
            <div className="bg-orange-200 flex space-x-2.5 p-2.5 sm:p-3 rounded-lg">
              <div
                className={`text-white ${
                  planInterval === "month" ? "bg-orange-500" : "bg-orange-300"
                } px-3.5 py-1.5 rounded-lg font-bold cursor-pointer text-center text-sm md:text-md`}
                onClick={() => setPlanInterval("month")}
              >
                Monthly Billing
              </div>
              <div
                className={`text-white ${
                  planInterval === "year" ? "bg-orange-500" : "bg-orange-300"
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
    </main>
  );
}
