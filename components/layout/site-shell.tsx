"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { StatusBar } from "./status-bar";
import { Topbar } from "./topbar";
import { cn } from "@/lib/utils";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  return (
    <>
      <Topbar open={navOpen} onToggle={() => setNavOpen((v) => !v)} />
      <div className="flex min-h-screen">
        <div
          className={cn(
            "fixed inset-x-0 top-14 bottom-0 z-34 bg-black/50 md:hidden",
            navOpen ? "block" : "hidden",
          )}
          onClick={() => setNavOpen(false)}
          aria-hidden
        />
        <Sidebar open={navOpen} onNavigate={() => setNavOpen(false)} />
        <div className="min-w-0 flex-1 pb-17.5">{children}</div>
      </div>
      <StatusBar />
    </>
  );
}
