import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import CreateAgent from "@/components/agent-create";
import React from "react";

async function CreateAgentTemplate({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  const { data: agentTemplates } = await supabase
    .from("agent_template")
    .select()
    .eq("id", params.id);

  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <CreateAgent
        name={agentTemplates?.[0].name!}
        purpose={agentTemplates?.[0].purpose!}
        instructions={agentTemplates?.[0].instructions!}
        agentTemplateId={agentTemplates?.[0].id!}
      />
    </section>
  );
}

export default CreateAgentTemplate;
