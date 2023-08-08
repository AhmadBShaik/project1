import { z } from "zod";
import toolFactory from "./tool-factory";
import nodemailer from "nodemailer";

const config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const Email = toolFactory.createTool({
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
        const transporter = nodemailer.createTransport(config);
        let message = {
          from: process.env.EMAIL_ADDRESS,
          to,
          subject,
          html,
        };

        const transporterResponse = await transporter.sendMail(message);
        console.log("Transporter Response -> ", transporterResponse);
        return `Email sent to ${transporterResponse.accepted.join(", ")}`;
      } catch (e) {
        return `Error while sending email to ${name.toString()}: ${e}`;
      }
    },
    returnDirect: false,
  },
});
