"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/chat": "AI Assistant",
  "/dashboard": "Financial Dashboard",
  "/approvals": "Approval Queue",
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname || ""] || "AgentPay";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
