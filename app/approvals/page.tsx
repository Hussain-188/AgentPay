"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  User,
} from "lucide-react";
import { ApprovalRequest } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

const mockApprovals: ApprovalRequest[] = [
  {
    id: "apr-001",
    type: "invoice_send",
    toolName: "send_invoice",
    toolCallId: "tc-001",
    args: { invoice_id: "INV-2026-0050", recipient_email: "sarah@designco.com" },
    description: "Send invoice #INV-2026-0050 to sarah@designco.com",
    amount: 4000,
    currency: "USD",
    recipient: "sarah@designco.com",
    status: "approved",
    createdAt: "2026-11-09T10:30:00Z",
    resolvedAt: "2026-11-09T10:31:00Z",
  },
  {
    id: "apr-002",
    type: "order",
    toolName: "create_order",
    toolCallId: "tc-002",
    args: { purchase_units: [{ amount: { value: "500.00", currency_code: "USD" } }] },
    description: "Create order for 50 Company T-Shirts at $10.00 each",
    amount: 500,
    currency: "USD",
    status: "approved",
    createdAt: "2026-11-09T09:15:00Z",
    resolvedAt: "2026-11-09T09:16:00Z",
  },
  {
    id: "apr-003",
    type: "refund",
    toolName: "create_refund",
    toolCallId: "tc-003",
    args: { capture_id: "CAP-123", amount: { value: "350.00", currency_code: "USD" } },
    description: "Refund $350.00 for capture CAP-123",
    amount: 350,
    currency: "USD",
    status: "rejected",
    createdAt: "2026-11-08T16:45:00Z",
    resolvedAt: "2026-11-08T16:46:00Z",
  },
  {
    id: "apr-004",
    type: "subscription",
    toolName: "create_subscription",
    toolCallId: "tc-004",
    args: { plan_id: "P-PREMIUM-001" },
    description: "Create subscription for Premium Plan ($49.99/month)",
    amount: 49.99,
    currency: "USD",
    status: "pending",
    createdAt: "2026-11-09T14:00:00Z",
  },
];

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  approved: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
    badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/30",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

function ApprovalCard({ approval }: { approval: ApprovalRequest }) {
  const config = statusConfig[approval.status];
  const StatusIcon = config.icon;

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${config.bg}`}>
            <StatusIcon className={`h-4 w-4 ${config.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium">{approval.description}</p>
            <p className="text-xs text-muted-foreground capitalize">{approval.type.replace("_", " ")}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.badge}`}>
          {approval.status}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {approval.amount && (
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{formatCurrency(approval.amount, approval.currency)}</span>
          </div>
        )}
        {approval.recipient && (
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{approval.recipient}</span>
          </div>
        )}
        <span className="text-xs text-muted-foreground ml-auto">
          {new Date(approval.createdAt).toLocaleString()}
        </span>
      </div>
    </Card>
  );
}

export default function ApprovalsPage() {
  const [approvals] = useState<ApprovalRequest[]>(mockApprovals);

  const pending = approvals.filter((a) => a.status === "pending");
  const approved = approvals.filter((a) => a.status === "approved");
  const rejected = approvals.filter((a) => a.status === "rejected");

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{pending.length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{approved.length}</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30">
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{rejected.length}</p>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({approvals.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approved.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-3">
          {approvals.map((a) => (
            <ApprovalCard key={a.id} approval={a} />
          ))}
        </TabsContent>
        <TabsContent value="pending" className="mt-4 space-y-3">
          {pending.length === 0 ? (
            <Card className="p-8 text-center">
              <ShieldCheck className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No pending approvals</p>
            </Card>
          ) : (
            pending.map((a) => <ApprovalCard key={a.id} approval={a} />)
          )}
        </TabsContent>
        <TabsContent value="approved" className="mt-4 space-y-3">
          {approved.map((a) => (
            <ApprovalCard key={a.id} approval={a} />
          ))}
        </TabsContent>
        <TabsContent value="rejected" className="mt-4 space-y-3">
          {rejected.map((a) => (
            <ApprovalCard key={a.id} approval={a} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
