"use client";

import { useEffect, useState } from "react";
import { ChatWidget } from "@/features/chat";
import { Topbar } from "./topbar";

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
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setNavOpen(false);
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [navOpen]);

  return (
    <>
      <Topbar open={navOpen} onToggle={() => setNavOpen((v) => !v)} />
      <div className="min-h-screen min-w-0 overflow-x-clip pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        {children}
      </div>
      <ChatWidget />
    </>
  );
}
