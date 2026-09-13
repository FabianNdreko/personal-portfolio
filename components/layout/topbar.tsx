"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type TopbarProps = {
  open: boolean;
  onToggle: () => void;
};

type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];

export function Topbar({ open, onToggle }: TopbarProps) {
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
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-end gap-4 px-4 sm:px-6 md:h-16 md:px-8">
        <nav
          aria-label="Page sections"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_SECTIONS.filter((item) => item.id !== "contact").map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/#contact"
            className={cn(
              "ml-2 inline-flex items-center rounded-full border px-4 py-1.5 text-sm transition-colors",
              activeId === "contact"
                ? "border-accent/50 bg-accent-soft text-accent"
                : "border-border-strong text-foreground hover:border-accent/50 hover:text-accent",
            )}
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={onToggle}
          className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-elevated md:hidden"
        >
          <span
            className={cn(
              "block h-px w-4 bg-muted-foreground transition-transform",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-4 bg-muted-foreground transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-px w-4 bg-muted-foreground transition-transform",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border bg-background/95 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label="Mobile sections" className="mx-auto max-w-5xl px-4 py-3 sm:px-6 md:px-8">
          <ul className="flex flex-col gap-1">
            {NAV_SECTIONS.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={onToggle}
                    className={cn(
                      "block rounded-xl px-3 py-3 text-sm",
                      active
                        ? "bg-accent-soft font-medium text-accent"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex gap-4 border-t border-border px-3 pt-3 text-sm">
            <Link
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center text-muted-foreground hover:text-accent"
              onClick={onToggle}
            >
              GitHub
            </Link>
            <Link
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center text-muted-foreground hover:text-accent"
              onClick={onToggle}
            >
              LinkedIn
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
