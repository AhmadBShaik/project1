"use client";
import React from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Email, Serp, FileReader, FileWriter } from "@/tools";

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
          const tools = [Serp, FileReader, FileWriter, Email];

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
          Search and Write two lines about Sachin Tendulkar in sachin.txt.
          Then, Read sachin.txt.
          
          --------------------------------------------------
          name: Ahmad
          to: ahmad.shaik1106@gmail.com
          subject: Testing Email, Serp, File Reader and File Writer tools
          html: 
          <div>
            <p>Hi Ahmad,</p>
            <p>{file content}</p>
          </div>

          name: Ahmad 1
          to: ahmad.shaik9912@gmail.com
          subject: Testing Email, Serp, File Reader and File Writer tools
          html: 
          <div>
            <p>Hi Ahmad 1,</p>
            <p>{file content}</p>
          </div>

          --------------------------------------------------

          Then, send emails to these emails along with sachin file content.
          `;
          console.log(input)
          const result = await executor.call({ input });

          console.log({ result });
        }}>
        Send Email
      </div>
    </div>
  );
};

export default EmailsPage;

