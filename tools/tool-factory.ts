import {
  DynamicStructuredTool,
  DynamicStructuredToolInput,
  StructuredTool,
} from "langchain/tools";
import { z } from "zod";

interface IDynamicStructuredTool<
  T extends z.ZodObject<any, any, any, any> = z.ZodObject<any, any, any, any>
> extends StructuredTool {
  func: DynamicStructuredToolInput["func"];
  schema: T;
}

type DynamicStructuredToolProps = {
  type: "email" | "read-file";
  data: Pick<
    IDynamicStructuredTool,
    "name" | "description" | "schema" | "func" | "returnDirect"
  >;
};

class ToolFactory {
  createTool(toolData: DynamicStructuredToolProps) {
    let toolInstance: any;
    switch (toolData.type) {
      case "email": {
        toolInstance = new DynamicStructuredTool({
          name: toolData.data.name,
          description: toolData.data.description,
          schema: toolData.data.schema,
          func: toolData.data.func,
          returnDirect: toolData.data.returnDirect, // This is an option that allows the tool to return the output directly
        });
        return toolInstance;
      }
      case "read-file": {
        toolInstance = new DynamicStructuredTool({
          name: toolData.data.name,
          description: toolData.data.description,
          schema: toolData.data.schema,
          func: toolData.data.func,
          returnDirect: toolData.data.returnDirect, // This is an option that allows the tool to return the output directly
        });
        return toolInstance;
      }
    }
  }
}

const toolFactory = new ToolFactory();
export default toolFactory;
