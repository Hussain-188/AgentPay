import { streamText, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import { getPayPalToolkit } from "@/lib/paypal/toolkit";
import { customTools } from "@/lib/ai/custom-tools";
import { AGENT_SYSTEM_PROMPT } from "@/lib/ai/system-prompts";
import { TOOLS_REQUIRING_APPROVAL } from "@/lib/utils/constants";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const toolkit = getPayPalToolkit();
  const paypalTools = toolkit.getTools();

  const toolApproval: Record<string, "user-approval"> = {};
  for (const toolName of TOOLS_REQUIRING_APPROVAL) {
    if (paypalTools[toolName]) {
      toolApproval[toolName] = "user-approval";
    }
  }

  const result = streamText({
    model: openai("gpt-4o"),
    system: AGENT_SYSTEM_PROMPT,
    messages,
    tools: {
      ...paypalTools,
      ...customTools,
    },
    toolApproval,
    stopWhen: stepCountIs(15),
  });

  return result.toUIMessageStreamResponse();
}
