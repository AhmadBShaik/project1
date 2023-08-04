import React from "react";
import UpdateAgent from "@/components/agent-update";
import { createServerSupabaseClient } from "@/clients/supabase-server-client";

async function CreateAgentTemplate({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <UpdateAgent />
    </section>
  );
}

export default CreateAgentTemplate;
