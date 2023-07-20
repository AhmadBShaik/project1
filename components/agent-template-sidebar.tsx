"use client";
import { useRouter } from "next/navigation";
import React from "react";

function SidebarCreateAgentTemplateButton() {
  const router = useRouter();
  return (
    <div className="w-full pb-0">
      <button
        className="bg-green-500 text-white w-full px-1.5 py-1 text-sm sm:px-2 sm:py-1.5 sm:text-md rounded font-bold text-center"
        onClick={() => {
          router.push("/agents-templates");
        }}
      >
        Add an agent template
      </button>
    </div>
  );
}

export default SidebarCreateAgentTemplateButton;
