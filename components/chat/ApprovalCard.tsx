"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, DollarSign, User, AlertTriangle } from "lucide-react";

interface ApprovalCardProps {
  toolName: string;
  args: Record<string, unknown>;
  onApprove: () => void;
  onReject: () => void;
}

function extractDetails(toolName: string, args: Record<string, unknown>) {
  let action = toolName.replace(/_/g, " ");
  let amount: string | undefined;
  let recipient: string | undefined;

  if (toolName === "create_order" || toolName === "pay_order") {
    action = toolName === "create_order" ? "Create Order" : "Process Payment";
    const purchaseUnits = args.purchase_units as Array<Record<string, unknown>> | undefined;
    if (purchaseUnits?.[0]) {
      const amountObj = purchaseUnits[0].amount as Record<string, string> | undefined;
      amount = amountObj?.value ? `$${amountObj.value} ${amountObj.currency_code || "USD"}` : undefined;
    }
  } else if (toolName === "send_invoice") {
    action = "Send Invoice";
    amount = args.amount ? `$${args.amount}` : undefined;
    recipient = (args.recipient_email || args.email) as string | undefined;
  } else if (toolName === "create_refund") {
    action = "Process Refund";
    const amountObj = args.amount as Record<string, string> | undefined;
    amount = amountObj?.value ? `$${amountObj.value}` : undefined;
  } else if (toolName === "create_subscription") {
    action = "Create Subscription";
  } else if (toolName === "accept_dispute_claim") {
    action = "Accept Dispute Claim";
  }

  return { action, amount, recipient };
}

export function ApprovalCard({ toolName, args, onApprove, onReject }: ApprovalCardProps) {
  const { action, amount, recipient } = extractDetails(toolName, args);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 border-2 border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
            <ShieldCheck className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-semibold">Approval Required</p>
            <p className="text-xs text-muted-foreground">{action}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {amount && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold">{amount}</span>
            </div>
          )}
          {recipient && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Recipient:</span>
              <span className="font-semibold">{recipient}</span>
            </div>
          )}
          {!amount && !recipient && (
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-muted-foreground">This action requires your approval to proceed.</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={onApprove} size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
            Approve
          </Button>
          <Button onClick={onReject} size="sm" variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
            Reject
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
