import AgentDetail from "@/components/agent-template-detail";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Agents({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: profiles } = await supabase.from("profile").select();

  const profile = profiles?.[0];
  if (!profile?.is_admin) {
    redirect(`/agents/${params.id}/create`);
  }
  return (
    <section className="flex-1 w-full px-5 xl:px-0 flex flex-col">
      <AgentDetail /> 
    </section>
  );
}

export default Agents;
