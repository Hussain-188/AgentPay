export const APP_NAME = "AgentPay";
export const APP_DESCRIPTION = "AI-Powered PayPal Command Center";

export const TOOLS_REQUIRING_APPROVAL = [
  "create_order",
  "pay_order",
  "send_invoice",
  "create_refund",
  "accept_dispute_claim",
  "create_subscription",
  "record_payment_for_invoice",
] as const;

export const NAV_ITEMS = [
  { name: "Chat", href: "/chat", icon: "MessageSquare" },
  { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { name: "Approvals", href: "/approvals", icon: "ShieldCheck" },
] as const;
