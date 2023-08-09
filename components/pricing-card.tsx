import { getStripe } from "@/clients/stripe-browser-client";
import axios from "axios";
import React, { useState } from "react";
import Stripe from "stripe";

const currencySymbols = {
  USD: "$",
  GBP: "£",
  INR: "₹",
};

function PricingCard({
  price,
}: {
  price: Stripe.Price;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubscription = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/payment",
        {
          price,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="border bg-neutral-800 border-neutral-600 hover:border-green-500 rounded-lg p-5 cursor-pointer shadow-lg hover:shadow-xl">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">{price.nickname}</h2>
      <p className="mb-10">Access to personalized content</p>

      <div className="font-bold mb-5">
        <span className="text-2xl  sm:text-3xl">
          {
            currencySymbols[
            price.currency.toUpperCase() as keyof typeof currencySymbols
            ]
          }
          {price?.unit_amount! / 100}
        </span>
      </div>
      <button
        disabled={loading}
        className={`${loading ? "bg-green-300" : "bg-green-400 hover:bg-green-500"
          } text-neutral-100 p-1.5 font-bold w-full text-md sm:text-lg text-center rounded`}
        onClick={handleSubscription}
      >
        Subscribe
      </button>
    </div>
  );
}

export default PricingCard;
