"use client"
import { useRouter } from "next/navigation";
import React from "react";

function SidebarCreateAgent() {
  const router = useRouter();
  return (
    <div className="w-full p-2 pb-0">
      <button
        className="bg-green-500 text-white w-full px-1.5 py-1 text-sm sm:px-2 sm:py-1.5 sm:text-md rounded font-bold text-center"
        onClick={() => {
          router.push("/agents");
        }}
      >
        Add an agent
      </button>
    </div>
  );
}

export default SidebarCreateAgent;
