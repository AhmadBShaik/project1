"use client";
import React, { useState } from "react";
import AgentCard from "./agent-card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Loader } from "react-feather";

function AgentCreationForm({
  setShowForm,
  instructions,
  setInstructions,
  name,
  setName,
  purpose,
  setPurpose,
}: {
  name: string;
  purpose: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPurpose: React.Dispatch<React.SetStateAction<string>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setInstructions: React.Dispatch<React.SetStateAction<string[]>>;
  instructions: string[];
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSWR("/session", async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  });

  return (
    <div className="space-y-3 w-full max-w-3xl mx-auto text-green-500 p-5 sm:px-0">
      <legend className="text-green-500 mb-5">
        <div className="font-bold text-2xl">Create an Agent</div>
        <div className="text-sm md:text-lg xl:text-xl"></div>
      </legend>
      <label className="block">
        <span className="block text-sm md:text-lg xl:text-xl font-medium text-neutral-200">
          Name
        </span>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-full outline-0 px-2 py-0.5 bg-neutral-950 focus:border-b border-green-500"
          placeholder="Agent name"
        />
      </label>
      <label className="block">
        <span className="block text-sm md:text-lg xl:text-xl font-medium text-neutral-200">
          Purpose
        </span>
        <input
          value={purpose}
          onChange={(e) => {
            setPurpose(e.target.value);
          }}
          className="w-full outline-0 px-2 py-0.5 bg-neutral-950 focus:border-b border-green-500"
          type="text"
          placeholder="Purpose"
        />
      </label>
      <label className="block">
        <span className="block text-sm md:text-lg xl:text-xl font-medium text-neutral-200">
          Instructions
        </span>
        <span className="block text-xs md:text-sm xl:text-md font-medium text-neutral-200 mb-2">
          {`Create instruction templates for your subscribers - placeholder text with in curly braces "{", "}"`}
        </span>
        <div className="space-y-2">
          {instructions.map((instruction, index) => (
            <div key={`instruction-${index}`}>
              <div className="relative">
                <div className="text-green-500 absolute text-xl left-2">#</div>
                <div style={{ flex: 1 }}>
                  <input
                    value={instruction}
                    className="w-full outline-0 px-2.5 py-0.5 bg-neutral-950 focus:border-b border-green-500 pl-5 ml-2.5"
                    onChange={(e) => {
                      setInstructions(
                        instructions.map((ins, i) =>
                          i === index ? e.target.value : ins
                        )
                      );
                    }}
                    placeholder={
                      index === 0
                        ? "Primary objective"
                        : `Instruction ${index + 1}`
                    }
                    autoFocus={!instruction}
                    onKeyDown={(e) => {
                      console.log("instructions", instructions);
                      if (e.code === "Enter" && instruction) {
                        const newIns = [...instructions];
                        newIns.splice(index + 1, 0, "");
                        setInstructions(newIns);
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                      }

                      if (e.code === "Backspace" && !instruction) {
                        setInstructions(
                          instructions.filter((ins, i) => i !== index)
                        );
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </label>
      <div className="pt-10 flex justify-end space-x-5">
        <button
          className="bg-red-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold xl:hidden"
          onClick={() => setShowForm((prevState) => !prevState)}
        >
          Cancel
        </button>
        <button
          className="bg-yellow-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
          onClick={() => {
            setName("");
            setPurpose("");
            setInstructions([""]);
          }}
        >
          Reset
        </button>
        <button
          disabled={loading}
          className={`${
            loading ? "bg-green-400" : "bg-green-500"
          } text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold`}
          onClick={
            loading
              ? undefined
              : async () => {
                  setLoading(true);
                  const insertResponse = await supabase.from("agent").insert({
                    name,
                    purpose,
                    instructions,
                    user_id: session?.user.id,
                  });

                  if (!insertResponse.error) {
                    router.push("/agents");
                  } else {
                    console.log(
                      "Error while adding agent",
                      insertResponse.error
                    );
                  }
                  setLoading(false);
                  console.log(insertResponse.data, insertResponse.error);
                }
          }
        >
          {loading ? (
            <Loader className="text-green-700 animate-spin w-5 mx-5" />
          ) : (
            <>Let's go</>
          )}
        </button>
      </div>
    </div>
  );
}

function CreateAgent() {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [instructions, setInstructions] = useState<string[]>([""]);

  const supabase = createClientComponentClient<Database>();
  const { data: agents } = useSWR(`/agents/`, async () => {
    const response = await supabase.from("agent").select();
    return response.data;
  });
  return (
    <>
      {showForm ? (
        <div className="xl:hidden flex-1 flex items-center justify-center ">
          <div className="flex-1 flex flex-col">
            <AgentCreationForm
              setShowForm={setShowForm}
              instructions={instructions}
              setInstructions={setInstructions}
              name={name}
              setName={setName}
              purpose={purpose}
              setPurpose={setPurpose}
            />
          </div>
        </div>
      ) : (
        <div className="xl:hidden flex-1">
          <div className="flex-1">
            <div className="flex justify-between items-center mt-2.5 mb-5">
              <div className="text-green-500 text-md sm:text-xl font-bold">
                Agents
              </div>
              <div>
                <button
                  className="bg-green-500 text-white px-1.5 py-1 text-sm sm:text-md sm:px-3 sm:py-1.5 sm:text-md rounded font-bold"
                  onClick={() => setShowForm((prevState) => !prevState)}
                >
                  Add an agent
                </button>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {agents?.map((agent) => (
                <li key={agent.id}>{<AgentCard {...agent} />}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="flex-1 hidden xl:flex justify-center items-center">
        <AgentCreationForm
          setShowForm={setShowForm}
          instructions={instructions}
          setInstructions={setInstructions}
          name={name}
          setName={setName}
          purpose={purpose}
          setPurpose={setPurpose}
        />
      </div>
    </>
  );
}

export default CreateAgent;
