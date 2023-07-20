"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import useSWR from "swr";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const agentTemplateFormData = z.object({
  name: z.string().min(3),
  purpose: z.string().min(10),
  instructions: z.string().optional().array(),
});

type AgentTemplateFormData = z.infer<typeof agentTemplateFormData>;

function AgentTemplateCreationForm({
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
  setInstructions: React.Dispatch<React.SetStateAction<string[]>>;
  instructions: string[];
}) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSWR("/session", async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentTemplateFormData>({
    resolver: zodResolver(agentTemplateFormData),
  });

  const submitData = async (data: AgentTemplateFormData) => {
    if (!errors.name && !errors.purpose) {
      setLoading(true);
      const insertResponse = await supabase.from("agent_template").insert({
        name,
        purpose,
        instructions,
        user_id: session?.user.id,
      });
      if (!insertResponse.error) {
        router.push("/agent-templates");
      } else {
        console.log("Error while adding agent", insertResponse.error);
      }
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-3 w-full max-w-3xl text-green-500 p-5 sm:px-0"
      autoComplete="off"
    >
      <legend className="text-green-500 mb-10">
        <div className="font-bold text-2xl">Create an Agent Template</div>
        <div className="text-sm md:text-lg xl:text-xl"></div>
      </legend>
      <div className="w-full max-w-3xl space-y-3">
        <label className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 font-medium">
            Name
          </div>
          <div className="w-full sm:w-2/3">
            <input
              {...register("name")}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full outline-0 px-2 py-0.5 rounded bg-neutral-900"
              placeholder="Agent name"
            />
            {errors.name ? (
              <div className="text-sm text-red-500">{errors.name.message}</div>
            ) : null}
          </div>
        </label>
        <label className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 font-medium">
            Purpose
          </div>
          <div className="w-full sm:w-2/3">
            <input
              {...register("purpose")}
              value={purpose}
              onChange={(e) => {
                setPurpose(e.target.value);
              }}
              className="w-full outline-0 px-2 py-0.5 rounded bg-neutral-900"
              type="text"
              placeholder="Purpose"
            />
            {errors.purpose ? (
              <div className="text-sm text-red-500">
                {errors.purpose.message}
              </div>
            ) : null}
          </div>
        </label>
      </div>
      <label className="block pt-5">
        <span className="block font-medium">
          Instructions
        </span>
        <span className="block text-xs md:text-sm xl:text-md font-medium mb-2">
          {`Create instruction templates for your subscribers - placeholder text with in curly braces "{", "}"`}
        </span>
        <div className="space-y-3">
          {(!!instructions.length ? instructions : [""]).map(
            (instruction, index) => (
              <div key={`instruction-${index}`}>
                <div className="flex w-full  bg-neutral-900 rounded px-2 space-x-2">
                  <div className="text-green-500 text-xl">#</div>
                  <div className="flex-1">
                    <input
                      {...register(`instructions.${index}`)}
                      value={instruction}
                      className="w-full outline-0 px-2.5 py-0.5 bg-neutral-900 focus:border-b border-green-500"
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
            )
          )}
        </div>
      </label>
      <div className="pt-10 flex justify-end space-x-5 ">
        <button
          type="button"
          className="bg-red-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
          onClick={() => router.push("/agent-templates")}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-yellow-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
          onClick={() => {
            setName("");
            setPurpose("");
            setInstructions([""]);
          }}
        >
          Reset
        </button>
        <input
          type="button"
          value={"Let's go"}
          onClick={handleSubmit(submitData)}
          disabled={loading}
          className={`${
            loading ? "bg-green-400" : "bg-green-500"
          } text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold`}
        />
      </div>
    </form>
  );
}

function CreateAgentTemplate() {
  const [name, setName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [instructions, setInstructions] = useState<string[]>([""]);

  return (
    <>
      <div className="flex-1 flex items-center justify-center ">
        <div className="flex-1 flex flex-col">
          <AgentTemplateCreationForm
            instructions={instructions}
            setInstructions={setInstructions}
            name={name}
            setName={setName}
            purpose={purpose}
            setPurpose={setPurpose}
          />
        </div>
      </div>
    </>
  );
}

export default CreateAgentTemplate;
