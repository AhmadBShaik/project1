import axios from "axios";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import PricingCard from "./pricing-card";

function PricingCards({
  planInterval,
}: {
  planInterval: Stripe.Price.Recurring.Interval;
}) {
  const [prices, setPrices] = useState<Stripe.Price[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchPrices = async () => {
    const pricesResponse = await axios.get("/api/get-products");
    setPrices(pricesResponse.data.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchPrices().then(() => setLoading(false));
  }, []);

  return (
    <>
      {!prices ? (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Array.from({ length: 3 }, (v, i) => i).map((i) => (
            <li key={i}>
              <div className="border bg-white border-gray-300 rounded-lg p-5 cursor-pointer shadow-lg hover:shadow-xl">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-8 bg-slate-300 rounded mb-2"></div>
                    <div className="h-4 bg-slate-300 rounded mb-10"></div>

                    <div className="h-8 w-1/3 bg-slate-300 rounded mb-5"></div>
                    <div className="h-10 bg-slate-300 rounded mb-5"></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {prices
            ?.filter((price) => price.recurring?.interval === planInterval)
            ?.map((price) => (
              <li key={price.id}>
                <PricingCard price={price} planInterval={planInterval} />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}

export default PricingCards;
