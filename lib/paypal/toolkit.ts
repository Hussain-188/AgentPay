import {
  PayPalAgentToolkit,
  ALL_TOOLS_ENABLED,
} from "@paypal/agent-toolkit/ai-sdk";

let toolkitInstance: PayPalAgentToolkit | null = null;

export function getPayPalToolkit(): PayPalAgentToolkit {
  if (!toolkitInstance) {
    toolkitInstance = new PayPalAgentToolkit({
      clientId: process.env.PAYPAL_CLIENT_ID!,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET!,
      configuration: {
        actions: ALL_TOOLS_ENABLED,
        context: {
          sandbox: true,
        },
      },
    });
  }
  return toolkitInstance;
}
