import { SITE } from "@/lib/site";

export function StatusBar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 flex items-center justify-between border-t border-border bg-elevated px-4.5 py-2 font-mono text-[11.5px] text-muted-foreground max-md:px-3.5">
      <div className="flex items-center gap-4.5">
        <span className="inline-flex items-center gap-1.5 text-accent">
          <span className="relative size-1.75 rounded-full bg-accent shadow-[0_0_0_0_rgba(31,224,184,0.55)] animate-[status-pulse_2s_infinite]" />
          available for work
        </span>
        <span className="hidden text-fg-dim sm:inline">|</span>
        <span className="hidden sm:inline">{SITE.location}</span>
      </div>
      <div className="flex items-center gap-4.5">
        <span className="hidden sm:inline">{SITE.statusStack}</span>
        <span className="text-fg-dim">|</span>
        <span>© {new Date().getFullYear()} {SITE.name}</span>
      </div>
    </div>
  );
}
