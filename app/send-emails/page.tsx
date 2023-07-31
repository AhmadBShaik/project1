"use client";
import React from "react";
import { z } from "zod";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import Email from "@/tools/email";
import { DynamicStructuredTool } from "langchain/tools";

const EmailsPage = () => {
  console.log("Emails page");
  return (
    <div className="p-5 space-y-5">
      <div className="">Emails</div>

      <div
        className="bg-green-500 rounded px-3 py-2 text-white cursor-pointer"
        onClick={async () => {
          const model = new ChatOpenAI({
            openAIApiKey: process.env.NEXT_PUBLIC_OPEN_API_KEY,
            temperature: 0,
          });
          const tools = [Email];

          const executor = await initializeAgentExecutorWithOptions(
            tools,
            model,
            {
              agentType: "structured-chat-zero-shot-react-description",
              verbose: true,
            }
          );
          console.log("Loaded agent.");

          const input = `
          name: Ahmad
          to: ahmad.shaik9912@gmail.com
          subject: Hello
          html: <h1>Hi</h1>

          send an email to this email
          `;

          console.log(`Executing with input "${input}"...`);

          const result = await executor.call({ input });

          console.log({ result });
        }}>
        Send Email
      </div>
    </div>
  );
};

export default EmailsPage;
