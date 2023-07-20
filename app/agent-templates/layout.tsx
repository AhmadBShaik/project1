import SidebarCreateAgentTemplateButton from "@/components/agent-template-sidebar";
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
    .from("agent_template")
    .select()
    .match({ user_id: user?.id });
  const { data: profiles } = await supabase.from("profile").select();
  const profile = profiles?.[0];
  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="flex-1 flex w-full">
        <div className="hidden xl:block w-2/12">
          {/* <div className="px-5 space-y-3">
            {agentsResponse.data?.length ? (
              <ul className="grid grid-cols-1 gap-3">
                {agentsResponse.data?.map((agent) => (
                  <li key={agent.id}>
                    {<AgentCard agent={agent} smallTextOnXl isAdmin />}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-neutral-800 text-neutral-400 p-3.5 sm:p-5 xl:px-2.5 xl:py-2 rounded-lg cursor-pointer">
                No agents yet!
              </div>
            )}
            <SidebarCreateAgentTemplateButton />
          </div> */}
        </div>
        {children}
        <div className="hidden xl:block w-2/12"></div>
      </div>
    </section>
  );
}
