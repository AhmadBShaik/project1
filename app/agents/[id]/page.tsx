import UpdateAgent from "@/components/agent-update";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

async function CreateAgentTemplate({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <UpdateAgent />
    </section>
  );
}

export default CreateAgentTemplate;
