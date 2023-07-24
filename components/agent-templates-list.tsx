"use client";
import React, { useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import AgentTemplateCard from "./agent-template-card";

const AgentTemplatesRenderer = ({
  templates,
  userId,
  isAdmin,
}: {
  templates:
    | {
        created_at: string | null;
        id: string;
        instructions: string[];
        name: string;
        purpose: string;
        user_id: string | null;
      }[]
    | null
    | undefined;
  userId: string;
  isAdmin: boolean;
}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {templates?.map((agentTemplate) => (
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
  );
};

function AgentTemplatesList({
  isAdmin,
  userId,
  showAll = false,
}: {
  showAll?: boolean;
  isAdmin: boolean;
  userId: string;
}) {
  const supabase = createClientComponentClient<Database>();
  const { data: agentTemplates } = useSWR(`/agent_templates/`, async () => {
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
            ) : (
              <div>
                <button
                  className="bg-green-500 text-white px-1.5 py-1 text-sm sm:text-md sm:px-3 sm:py-1.5 sm:text-md rounded font-bold"
                  onClick={() => {
                    router.push("/agents");
                  }}
                >
                  Manage agents
                </button>
              </div>
            )}
          </div>
          <AgentTemplatesRenderer
            templates={
              showAll
                ? agentTemplates
                : agentTemplates?.filter((t) => t.user_id === userId)
            }
            userId={userId}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </>
  );
}

export default AgentTemplatesList;
