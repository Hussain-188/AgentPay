import {
  streamText,
  stepCountIs,
  convertToModelMessages,
  APICallError,
} from "ai";
import { google } from "@ai-sdk/google";
import { getPayPalToolkit } from "@/lib/paypal/toolkit";
import { customTools } from "@/lib/ai/custom-tools";
import { AGENT_SYSTEM_PROMPT } from "@/lib/ai/system-prompts";
import { TOOLS_REQUIRING_APPROVAL } from "@/lib/utils/constants";
import { addApproval } from "@/lib/store/approval-store";

function getFriendlyError(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  const cause =
    error instanceof Error && error.cause instanceof Error
      ? error.cause.message
      : "";
  const combined = `${msg} ${cause}`.toLowerCase();

  if (
    combined.includes("credit_balance_exhausted") ||
    combined.includes("insufficient_quota") ||
    combined.includes("no credits remaining")
  ) {
    return "Your API key has no credits. Check your billing and try again.";
  }
  if (
    combined.includes("invalid_api_key") ||
    combined.includes("incorrect api key") ||
    combined.includes("api_key_invalid") ||
    combined.includes("permission_denied")
  ) {
    return "Invalid API key. Check your GOOGLE_GENERATIVE_AI_API_KEY in .env.local.";
  }
  if (combined.includes("rate_limit") || combined.includes("429") || combined.includes("resource_exhausted")) {
    return "Rate limited. Please wait a moment and try again.";
  }
  if (
    combined.includes("loadapikey") ||
    combined.includes("api key is missing")
  ) {
    return "Google AI API key is missing. Set GOOGLE_GENERATIVE_AI_API_KEY in your .env.local file and restart the server.";
  }
  return `Something went wrong: ${msg.slice(0, 150)}`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const toolkit = getPayPalToolkit();
    const allTools = toolkit.getTools();

    const CORE_TOOLS = [
      "create_invoice",
      "list_invoices",
      "get_invoice",
      "send_invoice",
      "send_invoice_reminder",
      "cancel_sent_invoice",
      "create_order",
      "get_order",
      "pay_order",
      "create_product",
      "list_products",
      "list_transactions",
      "create_refund",
      "list_disputes",
      "get_dispute",
      "search_invoices",
      "generate_invoice_qr_code",
      "create_subscription_plan",
      "create_subscription",
    ];

    const paypalTools: Record<string, (typeof allTools)[string]> = {};
    for (const name of CORE_TOOLS) {
      if (allTools[name]) {
        paypalTools[name] = allTools[name];
      }
    }

    const toolApproval: Record<string, "user-approval"> = {};
    for (const toolName of TOOLS_REQUIRING_APPROVAL) {
      if (paypalTools[toolName]) {
        toolApproval[toolName] = "user-approval";
      }
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google("gemini-3.5-flash-lite"),
      system: AGENT_SYSTEM_PROMPT,
      messages: modelMessages,
      tools: {
        ...paypalTools,
        ...customTools,
      },
      toolApproval,
      stopWhen: stepCountIs(15),
      onStepEnd(event) {
        for (const tc of event.toolCalls) {
          const name = tc.toolName;
          if ((TOOLS_REQUIRING_APPROVAL as readonly string[]).includes(name)) {
            const args = "args" in tc ? (tc.args as Record<string, unknown>) : {};
            addApproval({
              id: tc.toolCallId,
              type: name.includes("invoice")
                ? "invoice_send"
                : name.includes("order")
                  ? "order"
                  : name.includes("refund")
                    ? "refund"
                    : name.includes("subscription")
                      ? "subscription"
                      : "other",
              toolName: name,
              toolCallId: tc.toolCallId,
              args,
              description: `${name.replace(/_/g, " ")} operation`,
              status: "approved",
              createdAt: new Date().toISOString(),
              resolvedAt: new Date().toISOString(),
            });
          }
        }
      },
      onError({ error }) {
        console.error("streamText error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      onError(error) {
        return getFriendlyError(error);
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorText = getFriendlyError(error);
    return new Response(
      `data: {"type":"start"}\n\ndata: ${JSON.stringify({ type: "error", errorText })}\n\ndata: [DONE]\n\n`,
      {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }
    );
  }
}
