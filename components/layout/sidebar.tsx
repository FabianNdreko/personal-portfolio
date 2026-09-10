"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type SidebarProps = {
  open?: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ open = false, onNavigate }: SidebarProps) {
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0].id);

  useEffect(() => {
    const sections = NAV_SECTIONS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className={cn(
        "fixed top-14 bottom-0 left-0 z-35 flex w-4/5 max-w-75 flex-col border-r border-border bg-background py-5.5 font-mono transition-transform duration-200",
        "md:sticky md:top-0 md:z-auto md:h-screen md:w-sidebar md:max-w-none md:translate-x-0 md:overflow-y-auto",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className="mb-3.5 flex items-start gap-3.5 border-b border-border px-5.5 pb-4.5">
        <div
          className="size-13 shrink-0 border border-border-strong bg-elevated-2 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_12px)] bg-cover bg-center"
          title="assets/avatar.jpg"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="text-xs text-fg-dim">
            <span className="font-medium text-muted-foreground">
              fabian-ndreko
            </span>{" "}
            / portfolio
          </div>
          <div className="font-display mt-1.5 text-lg font-bold tracking-tight">
            {SITE.name}
          </div>
          <div className="mt-1 text-[11.5px] text-accent">{SITE.role}</div>
        </div>
      </div>

      <ul className="flex-1 px-3">
        {NAV_SECTIONS.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id} className="my-px">
              <a
                href={`#${item.id}`}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2.5 border-l-2 border-transparent px-2.5 py-2 text-[13px] text-muted-foreground transition-colors",
                  "hover:bg-elevated hover:text-foreground",
                  active && "border-l-accent bg-elevated text-foreground",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 shrink-0 bg-fg-dim",
                    active && "bg-accent",
                  )}
                />
                {item.label}
                <span
                  className={cn("text-fg-dim", active && "text-accent-dim")}
                >
                  {item.ext}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-3.5 flex gap-4 border-t border-border px-5.5 pt-4 text-xs">
        <Link
          href={SITE.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-accent"
        >
          github
        </Link>
        <Link
          href={SITE.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-accent"
        >
          linkedin
        </Link>
        <Link
          href={SITE.social.site}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-accent"
        >
          site
        </Link>
      </div>
    </aside>
  );
}
