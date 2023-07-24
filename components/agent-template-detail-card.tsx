"use client";
import { useRouter } from "next/navigation";
import React from "react";

function AgentTemplateDetailCard({
  agentTemplate,
  isCreator,
  isAdmin,
}: {
  isAdmin: boolean;
  isCreator: boolean;
  agentTemplate: {
    created_at: string | null;
    id: string;
    instructions: string[];
    name: string;
    purpose: string;
    user_id: string | null;
  };
}) {
  const router = useRouter();
  return (
    <div className="bg-neutral-800 hover:bg-neutral-800 p-5 rounded text-green-500">
      <div className="mb-2">
        <div className="text-xl ">{agentTemplate.name}</div>
        <div className="">{agentTemplate.purpose}</div>
      </div>
      <ul className="mt-5">
        {agentTemplate?.instructions.map((instruction) => (
          <div className="flex" key={instruction}>
            <div className="px-5">#</div>
            <div>{instruction}</div>
          </div>
        ))}
      </ul>

      <div className="flex justify-end space-x-5">
        {isCreator ? (
          <button
            className="bg-green-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
            onClick={() => {
              router.push(`/agent-templates/${agentTemplate.id}`);
            }}
          >
            Edit
          </button>
        ) : (
          <>
            {!isAdmin ? (
              <>
                <button
                  className="bg-green-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
                  onClick={() => {
                    router.push(`/agents/create/${agentTemplate.id}`);
                  }}
                >
                  Create Agent
                </button>
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default AgentTemplateDetailCard;
