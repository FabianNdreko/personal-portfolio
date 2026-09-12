"use client";

import { GithubLogo } from "@phosphor-icons/react";
import { CmdButton } from "@/components/shared";
import { SITE } from "@/lib/site";

export function OtherProjectsCta() {
  return (
    <aside className="relative overflow-hidden rounded-xl border-2 border-accent/40 bg-elevated px-5 py-6 sm:px-6 sm:py-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-accent/10 blur-2xl"
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-background text-foreground shadow-sm">
            <GithubLogo weight="fill" className="size-8" aria-hidden />
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="font-display text-lg font-semibold tracking-tight">
              Other projects
            </p>
            <p className="mt-1.5 max-w-prose text-[14px] leading-relaxed text-muted-foreground">
              Some work stays private while in development. Browse my public
              repositories on GitHub.
            </p>
          </div>
        </div>
        <CmdButton
          href={SITE.social.github}
          variant="primary"
          external
          className="w-full shrink-0 px-5 py-3 text-[15px] sm:w-auto"
        >
          <GithubLogo weight="bold" className="size-5" aria-hidden />
          View on GitHub
        </CmdButton>
      </div>
    </aside>
  );
}
