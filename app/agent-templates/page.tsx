import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import AgentTemplatesList from "@/components/agent-templates-list";
import React from "react";

async function Agents() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <AgentTemplatesList
        userId={user?.id!}
        isAdmin={user?.user_metadata.is_admin!}
      />
    </section>
  );
}

export default Agents;
