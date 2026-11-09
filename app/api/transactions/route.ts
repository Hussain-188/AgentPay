import { NextResponse } from "next/server";
import { mockTransactions } from "@/lib/utils/mock-data";

export async function GET() {
  try {
    if (process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) {
      const { getPayPalToolkit } = await import("@/lib/paypal/toolkit");
      const toolkit = getPayPalToolkit();
      const tools = toolkit.getTools();
      const listTxn = tools.list_transactions;
      if (listTxn?.execute) {
        const result = await listTxn.execute(
          {
            start_date: new Date(Date.now() - 30 * 86400000).toISOString(),
            end_date: new Date().toISOString(),
            transaction_status: "S",
            fields: "all",
          },
          {
            toolCallId: "dashboard-txn",
            messages: [],
            abortSignal: AbortSignal.timeout(10000),
          }
        );
        if (result && typeof result === "object") {
          return NextResponse.json({
            transactions: mockTransactions,
            live: false,
            paypalRaw: result,
          });
        }
      }
    }
  } catch {
    // Fall through to mock data
  }

  return NextResponse.json({ transactions: mockTransactions });
}
