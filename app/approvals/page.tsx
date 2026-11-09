"use client";

import { useState, useEffect, useCallback } from "react";
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

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    badge:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  approved: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-950/30",
    badge:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
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
            <p className="text-xs text-muted-foreground capitalize">
              {approval.type.replace("_", " ")}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.badge}`}
        >
          {approval.status}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {approval.amount && (
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">
              {formatCurrency(approval.amount, approval.currency)}
            </span>
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
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovals = useCallback(async () => {
    try {
      const res = await fetch("/api/approvals");
      const data = await res.json();
      setApprovals(data.approvals ?? []);
    } catch {
      // silently ignore fetch errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovals();
    const interval = setInterval(fetchApprovals, 5000);
    return () => clearInterval(interval);
  }, [fetchApprovals]);

  const pending = approvals.filter((a) => a.status === "pending");
  const approved = approvals.filter((a) => a.status === "approved");
  const rejected = approvals.filter((a) => a.status === "rejected");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">Approval Activity</h2>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Live
        </span>
      </div>

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
          <TabsTrigger value="approved">
            Approved ({approved.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejected.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-3">
          {loading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Loading approvals...</p>
            </Card>
          ) : approvals.length === 0 ? (
            <Card className="p-8 text-center">
              <ShieldCheck className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">
                No approvals yet. Use the AI chat to trigger PayPal operations.
              </p>
            </Card>
          ) : (
            approvals.map((a) => <ApprovalCard key={a.id} approval={a} />)
          )}
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
          {approved.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No approved items yet</p>
            </Card>
          ) : (
            approved.map((a) => <ApprovalCard key={a.id} approval={a} />)
          )}
        </TabsContent>
        <TabsContent value="rejected" className="mt-4 space-y-3">
          {rejected.length === 0 ? (
            <Card className="p-8 text-center">
              <XCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">No rejected items yet</p>
            </Card>
          ) : (
            rejected.map((a) => <ApprovalCard key={a.id} approval={a} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
