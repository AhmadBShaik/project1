import { Email, FileReader, FileWriter, Serp } from "@/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPEN_API_KEY,
      temperature: 0,
    });

    const tools = [Serp, FileReader, FileWriter, Email];

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "structured-chat-zero-shot-react-description",
      verbose: true,
    });
    console.log("Loaded agent.");
    const input = `
    search and write 1 line about NextJs 13 and write the content in next.txt

    then, read the file content content next.txt
    {
      name: "Ahmad"
      to: "ahmad.shaik1106@gmail.com"
      subject: "Testing Email, Serp, File Reader and File Writer tools"
      html: ${`
      <div>
        <p>Hi Ahmad</p>
        <p>{file content}</p>
      </div>`}
    }

    send an email to the email address
    `;
    console.log(input);
    const result = await executor.call({ input });

    console.log({ result });
    return NextResponse.json({ message: "request processed" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
