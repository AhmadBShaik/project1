"use client";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

function CreateAgentInstance({
  instructions,
  agentId,
}: {
  instructions: string[];
  agentId: string;
}) {
  const [allUniquePlaceholders, setAllUniquePlaceholders] = useState<
    { name: string; value: string }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    const matches = instructions.join("|||").match(/{(.*?)}/g);
    const uniquePlaceholderObjects = Array.from(new Set(matches)).map((p) => ({
      name: p,
      value: "",
    }));
    setAllUniquePlaceholders(
      uniquePlaceholderObjects.sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  }, [instructions]);

  const updatedInstruction = (instruction: string) => {
    const matchingString = allUniquePlaceholders.map((p) => p.name).join("|");
    const re = new RegExp(matchingString, "g");

    return instruction.replace(re, function (matched) {
      return (
        allUniquePlaceholders.find((p) => p.name === matched)?.value || matched
      );
    });
  };
  const supabase = createClientComponentClient<Database>();
  const { data: session } = useSWR("/session", async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full">
        <ul className="w-full max-w-3xl mb-5 space-y-3">
          {allUniquePlaceholders.map((placeholder) => (
            <li className="sm:flex sm:space-x-5" key={placeholder.name}>
              <div className="w-1/3">{placeholder.name}</div>
              <input
                type="text"
                placeholder={placeholder.name}
                className="w-2/3 outline-0 px-2 py-0.5 rounded bg-neutral-600 text-neutral-100"
                onChange={(e) => {
                  setAllUniquePlaceholders(
                    [
                      ...allUniquePlaceholders.filter(
                        (p) => p.name !== placeholder.name
                      ),
                      {
                        name: placeholder.name,
                        value: e.target.value,
                      },
                    ].sort((a, b) => (a.name > b.name ? 1 : -1))
                  );
                }}
              />
            </li>
          ))}
        </ul>
        <ul className="mt-10 space-y-5">
          {instructions.map((instruction) => (
            <li key={instruction} className="border-b border-neutral-800 pb-1">
              {updatedInstruction(instruction)}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-end space-x-5">
          <div
            className={`${
              false ? "bg-red-400" : "bg-red-500"
            } text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold`}
            onClick={() => {
              router.push(`/agents`);
              console.log(agentId, allUniquePlaceholders);
            }}
          >
            Back
          </div>

          <div
            className={`${
              false ? "bg-green-400" : "bg-green-500"
            } text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold`}
            onClick={async () => {
              const insertResponse = await supabase
                .from("agent_instance")
                .insert({
                  user_id: session?.user.id!,
                  agent_id: agentId,
                  meta: allUniquePlaceholders,
                });
              if (!insertResponse.error) {
                router.push(`/agents`);
              } else {
                console.log("Error while adding agent", insertResponse.error);
              }
              console.log(agentId, allUniquePlaceholders, session?.user.id);
            }}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAgentInstance;
