import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import AgentCard from "./agent-card";

async function AgentsList() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const agentsResponse = await supabase.from("agent").select();
  console.log("agentsResponse", agentsResponse);
  return (
    <div className="flex-1">
      <div className="text-green-500 text-md sm:text-xl font-bold my-5">All Agents</div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {agentsResponse.data?.map((agent) => (
          <>
            <li key={agent.id}>{<AgentCard agent={agent} />}</li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default AgentsList;
