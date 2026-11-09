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
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[status] || variants.Pending}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "Completed" || status === "PAID"
            ? "bg-green-500"
            : status === "Pending"
              ? "bg-yellow-500"
              : status === "SENT"
                ? "bg-blue-500"
                : status === "DRAFT"
                  ? "bg-gray-400"
                  : "bg-red-500"
        }`}
      />
      {status}
    </span>
  );
}

export function AmountRenderer(props: CustomCellRendererProps) {
  const amount = props.value as number;
  if (amount == null) return null;
  const isPositive = amount >= 0;
  return (
    <span
      className={`font-semibold tabular-nums ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
    >
      {isPositive ? "+" : ""}
      {formatCurrency(Math.abs(amount))}
    </span>
  );
}

export function DateRenderer(props: CustomCellRendererProps) {
  const date = props.value as string;
  if (!date) return null;
  return (
    <span className="text-muted-foreground text-xs">{formatRelativeDate(date)}</span>
  );
}

export function OverdueRenderer(props: CustomCellRendererProps) {
  const isOverdue = props.value as boolean;
  if (!isOverdue) return null;
  return (
    <Badge variant="destructive" className="text-xs animate-pulse">
      Overdue
    </Badge>
  );
}

export function ProgressRenderer(props: CustomCellRendererProps) {
  const amount = Math.abs(props.value as number);
  if (amount == null) return null;
  const maxAmount = 12000;
  const percent = Math.min((amount / maxAmount) * 100, 100);
  const color =
    percent > 70
      ? "bg-blue-600"
      : percent > 40
        ? "bg-blue-500"
        : "bg-blue-400";

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-muted-foreground w-14 text-right">
        {formatCurrency(amount)}
      </span>
    </div>
  );
}
