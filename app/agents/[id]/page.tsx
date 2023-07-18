import AgentDetail from "@/components/agent-detail";
import React from "react";

async function Agents() {
  return (
    <section className="flex-1 w-full px-5 xl:px-0 flex flex-col">
      <AgentDetail />
    </section>
  );
}

export default Agents;
