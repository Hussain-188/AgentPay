"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCards } from "@/components/dashboard/StatCards";
import { TransactionGrid } from "@/components/dashboard/TransactionGrid";
import { InvoiceGrid } from "@/components/dashboard/InvoiceGrid";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import {
  mockTransactions,
  mockInvoices,
  mockInsights,
  mockSpendingData,
} from "@/lib/utils/mock-data";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <StatCards transactions={mockTransactions} invoices={mockInvoices} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SpendingChart data={mockSpendingData} />
          <RevenueChart data={mockSpendingData} />
        </div>
        <div>
          <InsightsPanel insights={mockInsights} />
        </div>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
          <TransactionGrid data={mockTransactions} />
        </TabsContent>
        <TabsContent value="invoices" className="mt-4">
          <InvoiceGrid data={mockInvoices} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
