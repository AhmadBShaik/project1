import AgentSidebar from "@/components/agent-sidebar";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const agentsResponse = await supabase
    .from("agent")
    .select(`*, agent_template (*)`);

  console.log("agentsResponse", agentsResponse);

  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="flex-1 flex w-full">
        <div className="hidden xl:block w-2/12">
          <div className="px-5 space-y-3">
            <AgentSidebar
              agents={
                agentsResponse.data as
                  | {
                      agent_template_id: string;
                      created_at: string | null;
                      id: string;
                      meta: { name: string; value: string }[];
                      user_id: string;
                      agent_template: {
                        created_at: string | null;
                        id: string;
                        instructions: string[];
                        name: string;
                        purpose: string;
                        user_id: string | null;
                      } | null;
                    }[]
                  | null
              }
            />
          </div>
        </div>
        {children}
        <div className="hidden xl:block w-2/12"></div>
      </div>
    </section>
  );
}
