"use client";
import { useRouter } from "next/navigation";
import React from "react";

function AgentCard({
  agent,
  smallTextOnXl,
}: {
  agent: {
    id: string;
    name: string;
    purpose: string;
    instructions: string[];
  };
  smallTextOnXl?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className="bg-neutral-800 text-green-500 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer"
      onClick={() => {
        router.push(`/agent/${agent.id}`);
      }}
    >
      <div
        className={`font-bold text-md sm:text-xl ${
          smallTextOnXl ? "xl:text-sm" : ""
        }`}
      >
        {agent?.name}
      </div>
      <div
        className={`text-md sm:text-xl ${smallTextOnXl ? "xl:text-sm" : ""}`}
      >
        {agent?.purpose}
      </div>
    </div>
  );
}

export default AgentCard;
