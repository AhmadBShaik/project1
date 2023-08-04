import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import AgentTemplateDetailCard from "@/components/agent-template-detail-card";

export default async function View({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()
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
