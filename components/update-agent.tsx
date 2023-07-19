"use client";
import { Database } from "@/lib/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader } from "react-feather";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

const agentFormData = z.object({
  name: z.string().min(3),
  purpose: z.string().min(10),
  instructions: z.string().optional().array(),
});

type AgentFormData = z.infer<typeof agentFormData>;

function AgentUpdationForm({
  instructions,
  setInstructions,
  agentId,
  name,
  setName,
  purpose,
  setPurpose,
}: {
  agentId: string;
  name: string;
  purpose: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPurpose: React.Dispatch<React.SetStateAction<string>>;
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentFormData),
  });

  useEffect(() => {
    reset({
      name: name,
      purpose: purpose,
      instructions: instructions,
    });
  }, []);
  const submitData = async (data: AgentFormData) => {
    if (!errors.name && !errors.purpose) {
      setLoading(true);
      const updateResponse = await supabase
        .from("agent")
        .update({
          name,
          purpose,
          instructions:
            instructions.length === 1 && instructions[0].trim() === ""
              ? []
              : instructions,
        })
        .eq("id", agentId);

      if (!updateResponse.error) {
        router.push("/agents");
      } else {
        console.log("Error while adding agent", updateResponse.error);
      }
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-3 w-full max-w-3xl mx-auto text-green-500 p-5 sm:px-0"
      onSubmit={handleSubmit(submitData)}
    >
      <legend className="text-green-500 mb-5">
        <div className="font-bold text-2xl">Update Agent</div>
        <div className="text-sm md:text-lg xl:text-xl"></div>
      </legend>
      <label className="block">
        <span className="block text-sm md:text-lg xl:text-xl font-medium text-neutral-200">
          Name
        </span>
        <input
          {...register("name")}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-full outline-0 px-2 py-0.5 bg-neutral-950 focus:border-b border-green-500"
          placeholder="Agent name"
        />
        {errors.name ? (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        ) : null}
      </label>
      <label className="block">
        <span className="block text-sm md:text-lg xl:text-xl font-medium text-neutral-200">
          Purpose
        </span>
        <input
          {...register("purpose")}
          value={purpose}
          onChange={(e) => {
            setPurpose(e.target.value);
          }}
          className="w-full outline-0 px-2 py-0.5 bg-neutral-950 focus:border-b border-green-500"
          type="text"
          placeholder="Purpose"
        />
        {errors.purpose ? (
          <span className="text-sm text-red-500">{errors.purpose.message}</span>
        ) : null}
      </label>
      <label className="block">
        <span className="block text-sm md:text-lg xl:text-xl font-medium text-neutral-200">
          Instructions
        </span>
        <span className="block text-xs md:text-sm xl:text-md font-medium text-neutral-200 mb-2">
          {`Create instruction templates for your subscribers - placeholder text with in curly braces "{", "}"`}
        </span>
        <div className="space-y-2">
          {instructions?.map((instruction, index) => (
            <div key={`instruction-${index}`}>
              <div className="relative">
                <div className="text-green-500 absolute text-xl left-2">#</div>
                <div style={{ flex: 1 }}>
                  <input
                    {...register(`instructions.${index}`)}
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
                      if (e.code === "Enter" && instruction) {
                        const newIns = [...instructions];
                        newIns.splice(index + 1, 0, "");
                        setInstructions(newIns);
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                      }

                      if (
                        e.code === "Backspace" &&
                        !instruction &&
                        index !== 0
                      ) {
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
      <div className="pt-10 flex justify-between space-x-5">
        <button
          className="bg-red-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
          onClick={async () => {
            const deleteResponse = await supabase
              .from("agent")
              .delete()
              .eq("id", agentId);

            if (!deleteResponse.error) {
              router.push("/agents");
            } else {
              console.log("Error while adding agent", deleteResponse.error);
            }
          }}
        >
          Delete
        </button>
        <div className="space-x-2">
          <button
            className="bg-yellow-500 text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold"
            onClick={() => {
              router.push("/agents");
            }}
          >
            Back
          </button>
          <input
            type="submit"
            value={"Update"}
            disabled={loading}
            className={`${
              loading ? "bg-green-400" : "bg-green-500"
            } text-white px-1.5 py-1 text-sm md:text-md sm:px-3 sm:py-1.5 sm:text-md rounded cursor-pointer font-bold`}
          />
        </div>
      </div>
    </form>
  );
}

function UpdateAgent({ agentId }: { agentId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [instructions, setInstructions] = useState<string[]>([""]);
  const supabase = createClientComponentClient<Database>();
  const { data: _ } = useSWR(`/agents/${agentId}`, async () => {
    const response = await supabase
      .from("agent")
      .select()
      .match({ id: agentId });
    setLoading(true);
    setName(response.data?.[0]?.name!);
    setPurpose(response.data?.[0]?.purpose!);
    setInstructions(
      response.data?.[0]?.instructions.length === 0
        ? [""]
        : response.data?.[0]?.instructions!
    );
    console.log("setting states");
    setLoading(false);
    return response.data?.[0];
  });
  return (
    <div className="flex-1 flex items-center justify-center ">
      <div className="flex-1 flex flex-col justify-center items-center">
        {!loading ? (
          <AgentUpdationForm
            instructions={instructions}
            setInstructions={setInstructions}
            name={name}
            setName={setName}
            purpose={purpose}
            setPurpose={setPurpose}
            agentId={agentId}
          />
        ) : (
          <Loader className="text-white-500 animate-spin w-15 h-15" />
        )}
      </div>
    </div>
  );
}

export default UpdateAgent;
