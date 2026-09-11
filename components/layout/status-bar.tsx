import { SITE } from "@/lib/site";

export function StatusBar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-elevated px-4 py-2.5 text-xs text-muted-foreground sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        {SITE.available ? (
          <span className="inline-flex items-center gap-1.5 text-accent">
            <span
              className="relative size-1.75 shrink-0 rounded-full bg-accent shadow-[0_0_0_0_rgba(31,224,184,0.55)] animate-[status-pulse_2s_infinite]"
              aria-hidden
            />
            <span className="truncate">{SITE.availableLabel}</span>
          </span>
        ) : null}
        <span className="hidden text-fg-dim md:inline">·</span>
        <span className="hidden md:inline">{SITE.locationShort}</span>
      </div>
      <div className="flex min-w-0 shrink items-center gap-3">
        <span className="hidden lg:inline">{SITE.statusStack}</span>
        <span className="hidden text-fg-dim lg:inline">·</span>
        <span className="truncate">
          © {new Date().getFullYear()} {SITE.name}
        </span>
      </div>
    </div>
  );
}
