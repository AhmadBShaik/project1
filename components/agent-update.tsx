"use client";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

function UpdateAgent() {
  const [allUniquePlaceholders, setAllUniquePlaceholders] = useState<
    { name: string; value: string }[]
  >([]);
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState<boolean>(false);

  const { data: agents } = useSWR(`/agent_templates/${params.id}`, async () => {
    const response = await supabase
      .from("agent")
      .select(`*, agent_template (*)`)
      .eq("id", params.id);
    setAllUniquePlaceholders(
      response.data?.[0].meta as { name: string; value: string }[]
    );
    return response.data;
  });
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
  const { data: session } = useSWR("/session", async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  });

  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex-1 flex flex-col w-full max-w-3xl text-green-500">
        <div className="mt-10">
          <div className="font-bold text-2xl">
            {agents?.[0].agent_template?.name}
          </div>
          <div className="">
            {agents?.[0].agent_template?.purpose}
          </div>
        </div>
        <div className="w-full flex-1 flex justify-center items-center">
          <div className="w-full">
            <ul className="w-full mb-5 space-y-3">
              {allUniquePlaceholders.map((placeholder) => (
                <li className="sm:flex sm:space-x-5" key={placeholder.name}>
                  <div className="w-1/3">{placeholder.name}</div>
                  <input
                    type="text"
                    value={placeholder.value}
                    placeholder={placeholder.name}
                    className="w-2/3 outline-0 px-2 py-0.5 rounded bg-neutral-800"
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
              {agents?.[0].agent_template?.instructions.map((instruction) => (
                <li
                  key={instruction}
                  className="border-b border-neutral-800 pb-1"
                >
                  {updatedInstruction(instruction, allUniquePlaceholders)}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-end space-x-5">
              <div
                className={`${
                  false ? "bg-red-400" : "bg-red-500"
                } text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold`}
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </div>

              <div
                className={`${
                  loading ? "bg-green-400" : "bg-green-500"
                } text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold`}
                onClick={async () => {
                  setLoading(true);

                  const updateResponse = await supabase
                    .from("agent")
                    .update({
                      meta: allUniquePlaceholders,
                    })
                    .eq("id", agents?.[0].id);
                  if (!updateResponse.error) {
                    router.push(`/agents`);
                  } else {
                    console.log(
                      "Error while adding agent",
                      updateResponse.error
                    );
                  }
                  setLoading(false);
                }}
              >
                Update
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAgent;
