import AgentTemplatesList from "@/components/agent-templates-list";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

async function Agents() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: profiles } = await supabase.from("profile").select();
  const profile = profiles?.[0];
  console.log("profile", profile);
  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <AgentTemplatesList userId={profile?.user_id!} isAdmin={profile?.is_admin!}/>
    </section>
  );
}

export default Agents;
