import axios from "axios";
import { DynamicStructuredTool } from "langchain/tools";
import { z } from "zod";

const Email = new DynamicStructuredTool({
  name: "email",
  description: "send emails to users",
  schema: z.object({
    name: z.string().describe("name of the user"),
    to: z.string().describe("email address of user"),
    subject: z.string().describe("subject of email"),
    html: z.string().describe("markup of email"),
  }),
  func: async ({ name, to, subject, html }) => {
    try {
      await axios.post(`/api/send-email`, {
        name,
        to,
        subject,
        html,
      });
      return `Email sent to ${name.toString()}`;
    } catch (e) {
      return `Error while sending email to ${name.toString()}: ${e}`;
    }
  },
  returnDirect: false, // This is an option that allows the tool to return the output directly
});

export default Email;
