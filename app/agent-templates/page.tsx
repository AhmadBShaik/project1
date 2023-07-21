import AgentTemplatesList from "@/components/agent-templates-list";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

async function Agents() {
  const supabase = createServerComponentClient<Database>({ cookies });
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
