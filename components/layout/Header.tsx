"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sun, Moon, Database } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/chat": "AI Assistant",
  "/dashboard": "Financial Dashboard",
  "/approvals": "Approval Queue",
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname || ""] || "AgentPay";
  const [dark, setDark] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMsg("");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setSeedMsg(
        `Seeded ${data.results?.length ?? 0} items`
      );
    } catch {
      setSeedMsg("Seed failed");
    } finally {
      setSeeding(false);
      setTimeout(() => setSeedMsg(""), 3000);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-2">
        {seedMsg && (
          <span className="text-xs text-green-600 dark:text-green-400 font-medium animate-in fade-in">
            {seedMsg}
          </span>
        )}
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50"
          title="Seed PayPal sandbox with demo data"
        >
          <Database className={`h-3.5 w-3.5 ${seeding ? "animate-spin" : ""}`} />
          {seeding ? "Seeding..." : "Seed Data"}
        </button>
        <button
          onClick={toggleDark}
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
