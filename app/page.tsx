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
  Send,
  Cpu,
  CheckCircle2,
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

const stats = [
  { value: "47", label: "AI Tools" },
  { value: "8", label: "API Domains" },
  { value: "<2s", label: "Response Time" },
  { value: "100%", label: "Approval Gated" },
];

const steps = [
  {
    icon: Send,
    title: "Describe what you need",
    description:
      'Just type naturally — "Create an invoice for $500 for web design" or "Show my overdue invoices."',
  },
  {
    icon: Cpu,
    title: "AI executes via PayPal",
    description:
      "The agent selects the right PayPal APIs, structures the request, and shows you each step in real-time.",
  },
  {
    icon: CheckCircle2,
    title: "Approve & done",
    description:
      "Money-moving operations need your approval. One click to confirm, and the action completes instantly.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero with animated gradient */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/20 dark:via-background dark:to-indigo-950/20" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        </div>

        <div className="relative z-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white text-3xl font-bold mb-6 mx-auto shadow-lg shadow-blue-600/25">
            AP
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mb-4">
            Your Finances on{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Autopilot
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-8 mx-auto">
            AgentPay is an AI-powered command center for PayPal. Manage
            invoices, process payments, analyze transactions, and automate
            financial operations — all through natural conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/chat"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
              )}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Chatting
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" })
              )}
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
              "Gemini AI",
              "AG Grid",
              "Next.js 16",
              "Free & Open Source",
            ].map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 dark:bg-white/10 text-muted-foreground border border-border/50 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12 border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-muted-foreground text-center mb-10">
            Three steps. Zero manual PayPal clicks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white mx-auto mb-4 shadow-lg shadow-blue-600/20">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border hidden md:block" style={{ display: i === steps.length - 1 ? "none" : undefined }} />
                <p className="text-xs font-semibold text-blue-600 mb-1">
                  Step {i + 1}
                </p>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
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
              <Card
                key={f.title}
                className="p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 mb-3">
                  <f.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {f.description}
                </p>
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
              "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
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
            Toolkit, Vercel AI SDK, and Gemini AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
