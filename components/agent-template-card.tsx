"use client";
import { useRouter } from "next/navigation";
import React from "react";

function AgentTemplateCard({
  agentTemplate,
  smallTextOnXl,
  userId,
  isAdmin,
}: {
  agentTemplate: {
    id: string;
    name: string;
    purpose: string;
    instructions: string[];
  };
  userId?: string;
  isAdmin?: boolean;
  smallTextOnXl?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className="bg-neutral-800 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer"
      onClick={() => {
        isAdmin
          ? router.push(`/agent-templates/${agentTemplate.id}`)
          : router.push(`/agents/create/${agentTemplate.id}`);
      }}
    >
      <div
        className={`font-bold text-md sm:text-xl ${
          smallTextOnXl ? "xl:text-sm" : ""
        }`}
      >
        {agentTemplate?.name}
      </div>
      <div
        className={`text-md sm:text-xl ${smallTextOnXl ? "xl:text-sm" : ""}`}
      >
        {agentTemplate?.purpose}
      </div>
    </div>
  );
}

export default AgentTemplateCard;
