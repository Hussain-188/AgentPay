"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { TransactionRow, InvoiceRow } from "@/lib/types";

interface StatCardsProps {
  transactions: TransactionRow[];
  invoices: InvoiceRow[];
}

export function StatCards({ transactions, invoices }: StatCardsProps) {
  const totalRevenue = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingInvoices = invoices.filter((i) => i.status === "SENT").length;
  const overdueInvoices = invoices.filter((i) => i.isOverdue).length;
  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0);

  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      change: "+15%",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      label: "Pending Invoices",
      value: pendingInvoices.toString(),
      icon: FileText,
      change: `${overdueInvoices} overdue`,
      color: overdueInvoices > 0 ? "text-amber-600" : "text-blue-600",
      bg: overdueInvoices > 0 ? "bg-amber-50 dark:bg-amber-950/30" : "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Overdue Invoices",
      value: overdueInvoices.toString(),
      icon: AlertTriangle,
      change: overdueInvoices > 0 ? "Needs attention" : "All clear",
      color: overdueInvoices > 0 ? "text-red-600" : "text-green-600",
      bg: overdueInvoices > 0 ? "bg-red-50 dark:bg-red-950/30" : "bg-green-50 dark:bg-green-950/30",
    },
    {
      label: "Total Fees",
      value: formatCurrency(totalFees),
      icon: TrendingUp,
      change: "This period",
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
        </Card>
      ))}
    </div>
  );
}
