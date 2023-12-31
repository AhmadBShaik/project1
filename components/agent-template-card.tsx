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
    user_id: string | null;
    instructions: string[];
  };
  userId?: string;
  isAdmin?: boolean;
  smallTextOnXl?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className="bg-neutral-800 hover:bg-neutral-800 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer text-green-500"
      onClick={() => {
        if (userId === agentTemplate.user_id) {
          router.push(`/agent-templates/${agentTemplate.id}`);
        } else {
          router.push(`/explore/view/${agentTemplate.id}`);
        }
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
