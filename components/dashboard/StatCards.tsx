"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { DollarSign, FileText, AlertTriangle, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { TransactionRow, InvoiceRow } from "@/lib/types";

function AnimatedNumber({ value, prefix = "", duration = 1000 }: { value: number; prefix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const to = value;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    }

    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [value, duration]);

  if (prefix === "$") {
    return <>{prefix}{display.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>;
  }
  return <>{prefix}{Math.round(display).toLocaleString()}</>;
}

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
      numericValue: totalRevenue,
      prefix: "$",
      icon: DollarSign,
      change: "+15%",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      label: "Pending Invoices",
      numericValue: pendingInvoices,
      prefix: "",
      icon: FileText,
      change: `${overdueInvoices} overdue`,
      color: overdueInvoices > 0 ? "text-amber-600" : "text-blue-600",
      bg: overdueInvoices > 0 ? "bg-amber-50 dark:bg-amber-950/30" : "bg-blue-50 dark:bg-blue-950/30",
      gradient: overdueInvoices > 0 ? "from-amber-500/10 to-orange-500/10" : "from-blue-500/10 to-indigo-500/10",
    },
    {
      label: "Overdue Invoices",
      numericValue: overdueInvoices,
      prefix: "",
      icon: AlertTriangle,
      change: overdueInvoices > 0 ? "Needs attention" : "All clear",
      color: overdueInvoices > 0 ? "text-red-600" : "text-green-600",
      bg: overdueInvoices > 0 ? "bg-red-50 dark:bg-red-950/30" : "bg-green-50 dark:bg-green-950/30",
      gradient: overdueInvoices > 0 ? "from-red-500/10 to-rose-500/10" : "from-green-500/10 to-emerald-500/10",
    },
    {
      label: "Total Fees",
      numericValue: totalFees,
      prefix: "$",
      icon: TrendingUp,
      change: "This period",
      color: "text-muted-foreground",
      bg: "bg-muted",
      gradient: "from-gray-500/10 to-slate-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`p-4 transition-all duration-300 hover:shadow-lg hover:bg-gradient-to-br ${stat.gradient} hover:scale-[1.02] cursor-default`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </div>
          <p className="text-2xl font-bold">
            <AnimatedNumber value={stat.numericValue} prefix={stat.prefix} />
          </p>
          <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
        </Card>
      ))}
    </div>
  );
}
