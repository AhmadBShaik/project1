"use client";
import React from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import useSWR from "swr";
import { useRouter } from "next/navigation";

function AgentList() {
  const supabase = createClientComponentClient<Database>();
  const { data: agents, mutate } = useSWR(`/agents/`, async () => {
    const response = await supabase
      .from("agent")
      .select(`*, agent_template (*)`);
    return response.data;
  });
  const router = useRouter();
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
  return (
    <>
      <div className="flex-1">
        <div className="flex-1 text-green-500">
          <div className="flex justify-between items-center mt-2.5 mb-5">
            <div className="text-green-500 text-md sm:text-xl font-bold">
              Agents
            </div>
            <div>
              <button
                className="bg-green-500 text-white px-1.5 py-1 text-sm sm:text-md sm:px-3 sm:py-1.5 sm:text-md rounded font-bold"
                onClick={() => {
                  router.push("/explore");
                }}
              >
                Explore
              </button>
            </div>
          </div>
          <ul className="space-y-5">
            {agents?.map((agent) => (
              <li
                key={agent.id}
                className="bg-neutral-800 hover:bg-neutral-800 p-5 rounded"
              >
                <div className="mb-2">
                  <div className="text-xl ">{agent.agent_template?.name}</div>
                  <div className="">{agent.agent_template?.purpose}</div>
                </div>
                <ul>
                  {agent.agent_template?.instructions.map((i) => (
                    <div key={i}>
                      {updatedInstruction(
                        i,
                        agent.meta as { name: string; value: string }[]
                      )}
                    </div>
                  ))}
                </ul>

                <div className="flex justify-end space-x-5">
                  <button
                    className="bg-red-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
                    onClick={async () => {
                      const deleteResponse = await supabase
                        .from("agent")
                        .delete()
                        .eq("id", agent.id);
                      if (!deleteResponse.error) {
                        mutate();
                      } else {
                        console.log(
                          "Error while adding agent",
                          deleteResponse.error
                        );
                      }              
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
                    onClick={() => {
                      router.push(`/agents/${agent.id}`);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AgentList;
