import AgentTemplatesList from "@/components/agent-templates-list";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: profiles } = await supabase.from("profile").select();
  const profile = profiles?.[0];

  return <AgentTemplatesList isAdmin={profile?.is_admin!} userId={profile?.user_id!} />;
}
