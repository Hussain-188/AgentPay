"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Bot,
  FileText,
  TrendingUp,
  ArrowRight,
  Receipt,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Assistant",
    description:
      "Chat naturally with an AI that can create invoices, process payments, search transactions, and manage your entire PayPal operations.",
  },
  {
    icon: ShieldCheck,
    title: "Human-in-the-Loop",
    description:
      "Every financial operation requires your explicit approval. The AI proposes, you decide. Autonomous but accountable.",
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description:
      "AI-generated financial insights, anomaly detection, and trend analysis. Know your business health at a glance.",
  },
  {
    icon: FileText,
    title: "Invoice Management",
    description:
      "Create invoices from natural language descriptions, send reminders for overdue payments, and generate QR codes.",
  },
  {
    icon: Receipt,
    title: "Agentic Commerce",
    description:
      "Multi-step autonomous workflows for orders, subscriptions, and product catalog management with approval gates.",
  },
  {
    icon: Globe,
    title: "8 PayPal API Domains",
    description:
      "Deep integration with Orders, Invoicing, Payments, Disputes, Subscriptions, Products, Reporting, and Shipment Tracking.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white text-3xl font-bold mb-6">
          AP
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl mb-4">
          Your Finances on{" "}
          <span className="text-blue-600">Autopilot</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8">
          AgentPay is an AI-powered command center for PayPal. Manage invoices,
          process payments, analyze transactions, and automate financial
          operations — all through natural conversation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/chat"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Start Chatting
          </Link>
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            View Dashboard
          </Link>
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            "PayPal Agent Toolkit",
            "47 AI Tools",
            "8 API Domains",
            "GPT-4o",
            "AG Grid",
            "Next.js",
          ].map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            What can AgentPay do?
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            One AI agent. Forty-seven PayPal tools. Unlimited possibilities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <Card key={f.title} className="p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 mb-3">
                  <f.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <Zap className="h-8 w-8 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ready to try it?</h2>
          <p className="text-muted-foreground mb-6">
            Start a conversation with AgentPay and see your PayPal operations
            transformed.
          </p>
          <Link
            href="/chat"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white text-xs font-bold">
              AP
            </div>
            <span className="text-sm font-medium">
              Agent<span className="text-blue-600">Pay</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built for the PayPal + AI Hackathon 2026. Powered by PayPal Agent
            Toolkit, Vercel AI SDK, and GPT-4o.
          </p>
        </div>
      </footer>
    </div>
  );
}
