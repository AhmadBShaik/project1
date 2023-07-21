import AgentsList from "@/components/agent-list";
import React from "react";

async function Agents() {
  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <AgentsList />
    </section>
  );
}

export default Agents;
