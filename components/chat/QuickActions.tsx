"use client";

import { Button } from "@/components/ui/button";
import { FileText, Search, TrendingUp, Receipt, RefreshCw, Package } from "lucide-react";

const suggestions = [
  {
    icon: FileText,
    label: "Create an invoice",
    prompt: "Create an invoice for Sarah Chen at sarah@designco.com for $2,500 for web design work, due in 30 days",
  },
  {
    icon: Search,
    label: "Search transactions",
    prompt: "Show me my recent transactions from this month",
  },
  {
    icon: TrendingUp,
    label: "Financial insights",
    prompt: "Give me a financial summary for this month including revenue, expenses, and trends",
  },
  {
    icon: Receipt,
    label: "Check overdue invoices",
    prompt: "Show me all overdue invoices and suggest next steps",
  },
  {
    icon: Package,
    label: "Create a product",
    prompt: "Create a new product in my PayPal catalog called 'Consulting Services' at $150/hour",
  },
  {
    icon: RefreshCw,
    label: "Set up subscription",
    prompt: "Set up a subscription plan for $49/month called 'Premium Plan' with a 7-day free trial",
  },
];

interface QuickActionsProps {
  onSelect: (prompt: string) => void;
}

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl font-bold mb-4">
        AP
      </div>
      <h2 className="text-2xl font-bold mb-2">Welcome to AgentPay</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Your AI-powered PayPal assistant. I can manage invoices, process payments, analyze transactions, and more.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl">
        {suggestions.map((s) => (
          <Button
            key={s.label}
            variant="outline"
            className="flex items-center gap-2 h-auto py-3 px-4 justify-start text-left"
            onClick={() => onSelect(s.prompt)}
          >
            <s.icon className="h-4 w-4 shrink-0 text-blue-600" />
            <span className="text-sm">{s.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
