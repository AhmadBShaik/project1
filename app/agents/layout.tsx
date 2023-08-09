import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import AgentSidebar from "@/components/agent-sidebar";

export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient()

  const agentsResponse = await supabase
    .from("agent")
    .select(`*, agent_template (*)`);

  console.log("agentsResponse", agentsResponse);

  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="flex-1 flex w-full">
        <div className="hidden xl:block w-2/12">
          <div className="px-5 space-y-3">

          </div>
        </div>
        {children}
        <div className="hidden xl:block w-2/12"></div>
      </div>
    </section>
  );
}
