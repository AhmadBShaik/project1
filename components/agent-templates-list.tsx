"use client";
import React, { useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import AgentTemplateCard from "./agent-template-card";

function AgentTemplatesList({
  isAdmin,
  userId,
}: {
  isAdmin: boolean;
  userId: string;
}) {
  const supabase = createClientComponentClient<Database>();
  const { data: agentTemplate } = useSWR(`/agent_templates/`, async () => {
    const response = await supabase.from("agent_template").select();
    return response.data;
  });
  const router = useRouter();
  return (
    <>
      <div className="flex-1">
        <div className="flex-1">
          <div className="flex justify-between items-center mt-2.5 mb-5">
            <div className="text-green-500 text-md sm:text-xl font-bold">
              Agent Templates
            </div>
            {isAdmin ? (
              <div>
                <button
                  className="bg-green-500 text-white px-1.5 py-1 text-sm sm:text-md sm:px-3 sm:py-1.5 sm:text-md rounded font-bold"
                  onClick={() => {
                    router.push("/agent-templates/create");
                  }}
                >
                  Add an agent template
                </button>
              </div>
            ) :  <div>
            <button
              className="bg-green-500 text-white px-1.5 py-1 text-sm sm:text-md sm:px-3 sm:py-1.5 sm:text-md rounded font-bold"
              onClick={() => {
                router.push("/agents");
              }}
            >
              Manage agents
            </button>
          </div>}
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agentTemplate?.map((agentTemplate) => (
              <li key={agentTemplate.id}>
                {
                  <AgentTemplateCard
                    agentTemplate={agentTemplate}
                    userId={userId}
                    isAdmin={isAdmin}
                  />
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AgentTemplatesList;
