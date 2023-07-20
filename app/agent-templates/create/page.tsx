import CreateAgentTemplate from "@/components/agent-template-create";
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
      <CreateAgentTemplate />
    </section>
  );
}

export default Agents;