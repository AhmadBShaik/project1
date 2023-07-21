import AgentTemplateDetailCard from "@/components/agent-template-detail-card";
import AgentTemplatesList from "@/components/agent-templates-list";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function View({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: agentTemplates } = await supabase
    .from("agent_template")
    .select()
    .eq("id", params.id);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AgentTemplateDetailCard
      agentTemplate={agentTemplates?.[0]!}
      isCreator={agentTemplates?.[0]?.user_id === user?.id!}
      isAdmin={user?.user_metadata.is_admin}
    />
  );
}
