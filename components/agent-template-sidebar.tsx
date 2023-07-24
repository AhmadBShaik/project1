"use client";
import { useRouter } from "next/navigation";
import React from "react";

function AgentTemplateSidebar({
  agentTemplates,
}: {
  agentTemplates: {
    created_at: string | null;
    id: string;
    instructions: string[];
    name: string;
    purpose: string;
    user_id: string | null;
  }[];
}) {
  const router = useRouter();
  return (
    <ul className="grid grid-cols-1 gap-3">
      {!!agentTemplates?.length ? (
        <>
          {agentTemplates?.map((agentTemplate) => (
            <li
              key={agentTemplate.id}
              className="bg-neutral-800 text-green-500 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer hover:bg-neutral-800"
              onClick={() => router.push(`/agent-templates/${agentTemplate.id}`)}
            >
              <div>{agentTemplate.name}</div>
              <div className="text-sm">{agentTemplate.purpose}</div>
            </li>
          ))}
        </>
      ) : (
        <div className="bg-neutral-800 text-green-500 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer">
          No agents yet!
        </div>
      )}
      <div
        className="bg-green-500 hover:bg-green-600 text-white w-full px-1.5 py-1 sm:px-2 sm:py-1.5 sm:text-md rounded font-bold text-center cursor-pointer"
        onClick={() => {
          router.push("/agent-templates/create");
        }}
      >
        Add agent template
      </div>
    </ul>
  );
}

export default AgentTemplateSidebar;
