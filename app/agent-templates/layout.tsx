import { createServerSupabaseClient } from "@/clients/supabase-server-client";
import AgentTemplateSidebar from "@/components/agent-template-sidebar";
import { redirect } from "next/navigation";

export default async function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const agentsResponse = await supabase
  //   .from("agent_template")
  //   .select()
  //   .match({ user_id: user?.id });

  if (!user?.user_metadata.is_admin) {
    redirect("/");
  }
  return (
    <section className="flex-1 w-full flex flex-col">
      <div className="flex-1 flex w-full">
        <div className="hidden xl:block w-2/12">
          <div className="px-5 space-y-3">
            {/* <AgentTemplateSidebar agentTemplates={agentsResponse.data!} /> */}
          </div>
        </div>
        {children}
        <div className="hidden xl:block w-2/12"></div>
      </div>
    </section>
  );
}
