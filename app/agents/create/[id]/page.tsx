import CreateAgent from "@/components/agent-create";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

async function CreateAgentTemplate({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

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
