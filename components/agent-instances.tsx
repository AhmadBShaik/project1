"use client";
import { Database, Json } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import useSWR from "swr";

function AgentInstances() {
  const updatedInstruction = (
    instruction: string,
    placeholders: { name: string; value: string }[]
  ) => {
    const matchingString = placeholders.map((p) => p.name).join("|");
    const re = new RegExp(matchingString, "g");

    return instruction.replace(re, function (matched) {
      return placeholders.find((p) => p.name === matched)?.value || matched;
    });
  };
  const supabase = createClientComponentClient<Database>();
  const { data: agentInstances } = useSWR(`/agent_instances`, async () => {
    const agentInstanceResponse = await supabase
      .from("agent_instance")
      .select(`*,  agent ( id, name, purpose, instructions )`);
    return agentInstanceResponse.data;
  });
  return (
    <ul className="space-y-5">
      {agentInstances?.map((e) => (
        <li key={e.id} className="bg-neutral-800 p-5 rounded">
          <div className="mb-2">
            <div className="text-xl ">{e.agent?.name}</div>
            <div className="">{e.agent?.purpose}</div>
          </div>
          <ul>
            {e.agent?.instructions.map((i) => (
              <div>
                {updatedInstruction(
                  i,
                  e.meta as { name: string; value: string }[]
                )}
              </div>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default AgentInstances;
