"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatRelativeDate } from "@/lib/utils/format";
import type { CustomCellRendererProps } from "ag-grid-react";

export function StatusBadgeRenderer(props: CustomCellRendererProps) {
  const status = props.value as string;
  const variants: Record<string, string> = {
    Completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    PAID: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    SENT: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    DRAFT: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    Failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    OVERDUE: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[status] || variants.Pending}`}>
      {status}
    </span>
  );
}

export function AmountRenderer(props: CustomCellRendererProps) {
  const amount = props.value as number;
  const isPositive = amount >= 0;
  return (
    <span className={`font-medium ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
      {isPositive ? "+" : ""}{formatCurrency(Math.abs(amount))}
    </span>
  );
}

export function DateRenderer(props: CustomCellRendererProps) {
  const date = props.value as string;
  return <span className="text-muted-foreground">{formatRelativeDate(date)}</span>;
}

export function OverdueRenderer(props: CustomCellRendererProps) {
  const isOverdue = props.value as boolean;
  if (!isOverdue) return null;
  return (
    <Badge variant="destructive" className="text-xs">
      Overdue
    </Badge>
  );
}
