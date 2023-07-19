"use client";
import { useRouter } from "next/navigation";
import React from "react";

function AgentCard({
  agent,
  smallTextOnXl,
  isAdmin,
}: {
  agent: {
    id: string;
    name: string;
    purpose: string;
    instructions: string[];
  };
  smallTextOnXl?: boolean;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className="bg-neutral-800 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer"
      onClick={() => {
        isAdmin
          ? router.push(`/agents/${agent.id}`)
          : router.push(`/agents/${agent.id}/create`);
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
