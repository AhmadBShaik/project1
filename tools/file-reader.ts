import axios from "axios";
import { z } from "zod";
import toolFactory from "./tool-factory";

export const FileReader = toolFactory.createTool({
  type: "read-file",
  data: {
    name: "file reader",
    description: "reads file from supabase bucket",
    schema: z.object({ filename: z.string() }),
    func: async ({ filename }) => {
      const fileContent = await axios.get(
        `https://frrjcinuograjbttwspj.supabase.co/storage/v1/object/public/agents/query-results/${filename}`
      );

      return fileContent.data;
    },
    returnDirect: false,
  },
});
