import { z } from "zod";
import toolFactory from "./tool-factory";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

const supabase = createClientComponentClient<Database>();
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
