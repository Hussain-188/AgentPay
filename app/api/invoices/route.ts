import { NextResponse } from "next/server";
import { mockInvoices } from "@/lib/utils/mock-data";

export async function GET() {
  try {
    if (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) {
      const { getPayPalToolkit } = await import("@/lib/paypal/toolkit");
      const toolkit = getPayPalToolkit();
      const tools = toolkit.getTools();
      const listInvoices = tools.list_invoices;
      if (listInvoices?.execute) {
        const result = await listInvoices.execute(
          { page: 1, page_size: 20 },
          {
            toolCallId: "dashboard-inv",
            messages: [],
            abortSignal: AbortSignal.timeout(10000),
          }
        );
        if (result && typeof result === "object") {
          return NextResponse.json({
            invoices: mockInvoices,
            live: false,
            paypalRaw: result,
          });
        }
      }
    }
  } catch {
    // Fall through to mock data
  }

  return NextResponse.json({ invoices: mockInvoices });
}
