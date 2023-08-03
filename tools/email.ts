import axios from "axios";
import { z } from "zod";
import toolFactory from "./tool-factory";

const Email = toolFactory.createTool({
  type: "email",
  data: {
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
    returnDirect: false,
  },
});

export default Email;
