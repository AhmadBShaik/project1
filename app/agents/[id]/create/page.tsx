import AgentDetail from "@/components/agent-detail";
import CreateAgentInstance from "@/components/create-agent-instance";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Agents({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: profiles } = await supabase.from("profile").select();

  const profile = profiles?.[0];
  if (profile?.is_admin) {
    redirect(`/agents/${params.id}`);
  }

  const agentResponse = await supabase
    .from("agent")
    .select()
    .match({ id: params.id });

  return (
    <section className="flex-1 w-full px-5 xl:px-0 flex flex-col">
      <div className="text-center mt-10">
        <div className="text-green-500">
          Hi, I am {agentResponse.data?.[0].name}
        </div>
        <div className="text-green-500 text-sm">
          {agentResponse.data?.[0].purpose}
        </div>
      </div>
      <CreateAgentInstance
        instructions={agentResponse.data?.[0].instructions!}
        agentId={params.id}
      />
    </section>
  );
}

export default Agents;
