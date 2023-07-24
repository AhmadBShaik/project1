"use client";
import { useRouter } from "next/navigation";
import React from "react";

function AgentSidebar({
  agents,
}: {
  agents:
    | {
        agent_template_id: string;
        created_at: string | null;
        id: string;
        meta: { name: string; value: string }[];
        user_id: string;
        agent_template: {
          created_at: string | null;
          id: string;
          instructions: string[];
          name: string;
          purpose: string;
          user_id: string | null;
        } | null;
      }[]
    | null;
}) {
  const router = useRouter();
  return (
    <ul className="grid grid-cols-1 gap-3">
      {!!agents?.length ? (
        <>
          {agents?.map((agent) => (
            <li
              key={agent.id}
              className="bg-neutral-800 text-green-500 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer hover:bg-neutral-800"
              onClick={() => router.push(`/agents/${agent.id}`)}
            >
              <div>{agent.agent_template?.name}</div>
              <div className="text-sm">{agent.agent_template?.purpose}</div>
            </li>
          ))}
        </>
      ) : (
        <div className="bg-neutral-800 text-green-500 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer">
          No agents yet!
        </div>
      )}
      <div className="bg-green-500 hover:bg-green-600 text-white w-full px-1.5 py-1 sm:px-2 sm:py-1.5 sm:text-md rounded font-bold text-center cursor-pointer" onClick={() => {
        router.push('/explore')
      }}>
        Create an agent
      </div>
    </ul>
  );
}

export default AgentSidebar;

