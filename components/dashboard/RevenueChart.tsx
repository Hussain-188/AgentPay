"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number; expenses: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const netData = data.map((d) => ({
    ...d,
    net: d.revenue - d.expenses,
  }));

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-4">Net Income by Month</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={netData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis className="text-xs" tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`]}
          />
          <Bar dataKey="net" fill="#2563eb" radius={[4, 4, 0, 0]} name="Net Income" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
