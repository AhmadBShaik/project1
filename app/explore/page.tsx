import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import AgentTemplatesList from "@/components/agent-templates-list";

export default async function Home() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AgentTemplatesList
      showAll
      isAdmin={user?.user_metadata?.is_admin!}
      userId={user?.id!}
    />
  );
}
