"use client";

import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";

const TOOL_LABELS: Record<string, string> = {
  create_invoice: "Creating Invoice",
  send_invoice: "Sending Invoice",
  list_invoices: "Fetching Invoices",
  search_invoicing: "Searching Invoices",
  send_invoice_reminder: "Sending Reminder",
  generate_invoice_qr_code: "Generating QR Code",
  generate_invoice_number: "Generating Invoice Number",
  create_order: "Creating Order",
  get_order: "Fetching Order Details",
  pay_order: "Processing Payment",
  create_refund: "Processing Refund",
  list_transactions: "Fetching Transactions",
  get_merchant_insights: "Analyzing Merchant Data",
  list_disputes: "Fetching Disputes",
  get_dispute: "Getting Dispute Details",
  accept_dispute_claim: "Accepting Dispute Claim",
  create_product: "Creating Product",
  list_products: "Fetching Products",
  create_subscription_plan: "Creating Subscription Plan",
  create_subscription: "Creating Subscription",
  create_shipment_tracking: "Creating Shipment Tracking",
  generate_invoice_from_description: "Parsing Invoice Description",
  get_financial_summary: "Generating Financial Summary",
  format_for_display: "Formatting Data",
};

interface ToolCallCardProps {
  toolName: string;
  state: "call" | "result" | "partial-call";
  args?: Record<string, unknown>;
}

export function ToolCallCard({ toolName, state, args }: ToolCallCardProps) {
  const label = TOOL_LABELS[toolName] || toolName.replace(/_/g, " ");
  const isRunning = state === "call" || state === "partial-call";
  const isComplete = state === "result";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-3 bg-muted/50 border-border/50">
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          ) : isComplete ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
          {isRunning && (
            <span className="text-xs text-muted-foreground ml-auto">Running...</span>
          )}
          {isComplete && (
            <span className="text-xs text-green-600 ml-auto">Complete</span>
          )}
        </div>
        {args && Object.keys(args).length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground bg-background/50 rounded p-2 font-mono overflow-x-auto">
            {JSON.stringify(args, null, 2).slice(0, 200)}
            {JSON.stringify(args).length > 200 && "..."}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
