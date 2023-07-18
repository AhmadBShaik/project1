"use client";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import UpdateAgent from "./update-agent";

function AgentDetail() {
  const params = useParams();
  return (
    <div className="flex-1 flex">
      <UpdateAgent agentId={params.id} />
    </div>
  );
}

export default AgentDetail;
