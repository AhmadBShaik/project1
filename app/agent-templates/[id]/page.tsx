import UpdateAgentTemplate from "@/components/agent-template-update";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function Agents() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: profiles } = await supabase.from("profile").select();
  const profile = profiles?.[0];
  // if (!profile?.is_admin) {
  //   redirect("/");
  // }
  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <UpdateAgentTemplate />
    </section>
  );
}

export default Agents;
