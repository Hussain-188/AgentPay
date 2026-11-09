export interface ApprovalRequest {
  id: string;
  type:
    | "payment"
    | "refund"
    | "invoice_send"
    | "payout"
    | "order"
    | "subscription"
    | "other";
  toolName: string;
  toolCallId: string;
  args: Record<string, unknown>;
  description: string;
  amount?: number;
  currency?: string;
  recipient?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  resolvedAt?: string;
}

export interface FinancialInsight {
  id: string;
  type: "anomaly" | "trend" | "recommendation" | "summary";
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  metric?: { label: string; value: string; change?: string };
  createdAt: string;
}

export interface TransactionRow {
  id: string;
  date: string;
  type: string;
  name: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  fee: number;
  netAmount: number;
}

export interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  recipientName: string;
  recipientEmail: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  createdDate: string;
  isOverdue: boolean;
}
