import { SITE } from "@/lib/site";

export function StatusBar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 flex items-center justify-between gap-3 border-t border-border bg-elevated px-3.5 py-2 font-mono text-[11.5px] text-muted-foreground sm:px-4.5">
      <div className="flex min-w-0 items-center gap-4.5">
        <span className="inline-flex items-center gap-1.5 text-accent">
          <span className="relative size-1.75 shrink-0 rounded-full bg-accent shadow-[0_0_0_0_rgba(31,224,184,0.55)] animate-[status-pulse_2s_infinite]" />
          <span className="truncate">available for work</span>
        </span>
        <span className="hidden text-fg-dim md:inline">|</span>
        <span className="hidden md:inline">{SITE.location}</span>
      </div>
      <div className="flex min-w-0 shrink items-center gap-2 sm:gap-4.5">
        <span className="hidden lg:inline">{SITE.statusStack}</span>
        <span className="hidden text-fg-dim lg:inline">|</span>
        <span className="truncate">
          © {new Date().getFullYear()} {SITE.name}
        </span>
      </div>
    </div>
  );
}
