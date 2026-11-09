"use client";

import { useEffect, useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCards } from "@/components/dashboard/StatCards";
import { TransactionGrid } from "@/components/dashboard/TransactionGrid";
import { InvoiceGrid } from "@/components/dashboard/InvoiceGrid";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { TransactionRow, InvoiceRow, FinancialInsight } from "@/lib/types";
import {
  mockTransactions,
  mockInvoices,
  mockInsights,
  mockSpendingData,
} from "@/lib/utils/mock-data";
import { RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [txnRes, invRes, insRes] = await Promise.allSettled([
        fetch("/api/transactions").then((r) => r.json()),
        fetch("/api/invoices").then((r) => r.json()),
        fetch("/api/insights").then((r) => r.json()),
      ]);

      setTransactions(
        txnRes.status === "fulfilled" && txnRes.value.transactions
          ? txnRes.value.transactions
          : mockTransactions
      );
      setInvoices(
        invRes.status === "fulfilled" && invRes.value.invoices
          ? invRes.value.invoices
          : mockInvoices
      );
      setInsights(
        insRes.status === "fulfilled" && insRes.value.insights
          ? insRes.value.insights
          : mockInsights
      );
    } catch {
      setTransactions(mockTransactions);
      setInvoices(mockInvoices);
      setInsights(mockInsights);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[110px] rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[350px] rounded-xl" />
          <Skeleton className="h-[350px] rounded-xl" />
        </div>
        <Skeleton className="h-[440px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm text-muted-foreground">
            Showing data for your PayPal account
          </h2>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <StatCards transactions={transactions} invoices={invoices} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SpendingChart data={mockSpendingData} />
          <RevenueChart data={mockSpendingData} />
        </div>
        <div>
          <InsightsPanel insights={insights} />
        </div>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">
            Transactions ({transactions.length})
          </TabsTrigger>
          <TabsTrigger value="invoices">
            Invoices ({invoices.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
          <TransactionGrid data={transactions} />
        </TabsContent>
        <TabsContent value="invoices" className="mt-4">
          <InvoiceGrid data={invoices} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
