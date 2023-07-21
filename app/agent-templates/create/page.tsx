import CreateAgentTemplate from "@/components/agent-template-create";
import React from "react";

async function Agents() {
  return (
    <section className="flex-1 w-full p-5 xl:px-0 flex flex-col">
      <CreateAgentTemplate />
    </section>
  );
}

export default Agents;
