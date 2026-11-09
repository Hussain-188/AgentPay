"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react";
import { FinancialInsight } from "@/lib/types";

interface InsightsPanelProps {
  insights: FinancialInsight[];
}

const iconMap: Record<string, typeof AlertTriangle> = {
  anomaly: AlertTriangle,
  trend: TrendingUp,
  recommendation: Lightbulb,
  summary: BarChart3,
};

const severityColors: Record<string, string> = {
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">AI Insights</h3>
        <Badge variant="secondary" className="text-xs">
          Powered by AI
        </Badge>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = iconMap[insight.type];
          return (
            <div
              key={insight.id}
              className="flex gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
            >
              <div className={`p-1.5 rounded-md h-fit ${severityColors[insight.severity]}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium">{insight.title}</p>
                  {insight.metric && (
                    <span className="text-xs font-semibold text-blue-600">
                      {insight.metric.value}
                      {insight.metric.change && (
                        <span className="ml-1 text-muted-foreground">{insight.metric.change}</span>
                      )}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
