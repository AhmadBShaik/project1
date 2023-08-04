import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import AgentsList from "@/components/agent-list";
import React from "react";

async function Agents() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <AgentsList userId={user?.id!} />
    </section>
  );
}

export default Agents;
