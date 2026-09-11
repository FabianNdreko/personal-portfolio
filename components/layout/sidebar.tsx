"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type SidebarProps = {
  open?: boolean;
  onNavigate?: () => void;
};

type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];

export function Sidebar({ open = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<NavSectionId>(NAV_SECTIONS[0].id);

  useEffect(() => {
    if (pathname.startsWith("/projects")) {
      setActiveId("projects");
      return;
    }

    const syncActive = () => {
      const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (scrolledToBottom) {
        setActiveId(NAV_SECTIONS[NAV_SECTIONS.length - 1].id);
        return;
      }

      const marker = window.scrollY + 96;
      let next: NavSectionId = NAV_SECTIONS[0].id;

      for (const item of NAV_SECTIONS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) next = item.id;
      }

      setActiveId(next);
    };

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [pathname]);

  return (
    <aside
      className={cn(
        "fixed top-14 bottom-0 left-0 z-35 flex w-[min(80%,19rem)] flex-col overflow-y-auto border-r border-border bg-background py-6 transition-transform duration-200",
        "md:sticky md:top-0 md:z-auto md:h-screen md:w-sidebar md:max-w-none md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className="mb-5 flex items-start gap-3.5 border-b border-border px-5 pb-5">
        <Image
          src={SITE.portrait}
          alt={SITE.name}
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-lg border border-border-strong object-cover object-top"
        />
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg font-bold tracking-tight">
            {SITE.name}
          </div>
          <div className="mt-1 text-[12.5px] leading-snug text-muted-foreground">
            {SITE.shortRole}
          </div>
          {SITE.available ? (
            <div className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] text-accent">
              <span
                className="size-1.5 rounded-full bg-accent"
                aria-hidden
              />
              {SITE.availableLabel}
            </div>
          ) : null}
        </div>
      </div>

      <nav aria-label="Page sections" className="flex-1 px-3">
        <ul>
          {NAV_SECTIONS.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id} className="my-px">
                <a
                  href={`/#${item.id}`}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors",
                    "hover:bg-elevated hover:text-foreground",
                    active && "bg-elevated font-medium text-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-4 flex gap-4 border-t border-border px-5 pt-4 text-sm">
        <Link
          href={SITE.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-accent"
        >
          GitHub
        </Link>
        <Link
          href={SITE.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-accent"
        >
          LinkedIn
        </Link>
      </div>
    </aside>
  );
}
