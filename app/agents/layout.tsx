import AgentCard from "@/components/agent-card";
import SidebarCreateAgent from "@/components/agent-sidebar";
import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const agentsResponse = await supabase
    .from("agent")
    .select()
    .match({ user_id: user?.id });
  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="flex-1 flex w-full">
        <div className="hidden xl:block w-2/12">
          <ul className="grid grid-cols-1 gap-2 p-2">
            {agentsResponse.data?.map((agent) => (
              <li key={agent.id}>{<AgentCard {...agent} />}</li>
            ))}
          </ul>
          <SidebarCreateAgent />
        </div>
        {children}
        <div className="hidden xl:block w-2/12"></div>
      </div>
    </section>
  );
}
