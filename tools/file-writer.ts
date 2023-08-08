import { z } from "zod";
import toolFactory from "./tool-factory";
import { createServerSupabaseClient } from "@/clients/supabase-server-client";

export const FileWriter = toolFactory.createTool({
  type: "read-file",
  data: {
    name: "file writer",
    description: "writes file from supabase bucket",
    schema: z.object({
      filename: z.string(),
      fileContent: z.string(),
    }),
    func: async ({ filename, fileContent }) => {
      const supabase = createServerSupabaseClient();
      const { data, error } = await supabase.storage
        .from("agents")
        .upload(`query-results/${filename}`, fileContent);
      if (error) {
        console.log(error);
        return error.toString();
      } else {
        return data.toString();
      }
    },
    returnDirect: false,
  },
});
