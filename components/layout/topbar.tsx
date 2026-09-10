type TopbarProps = {
  open: boolean;
  onToggle: () => void;
};

export function Topbar({ open, onToggle }: TopbarProps) {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-[rgba(10,12,15,0.92)] px-[18px] py-3.5 font-mono text-[13px] backdrop-blur-[6px] md:hidden">
      <div className="font-semibold text-foreground">
        fabian<span className="text-accent">@</span>ndreko
      </div>
      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={onToggle}
        className="flex size-[34px] flex-col items-center justify-center gap-1 border border-border bg-elevated"
      >
        <span className="block h-px w-4 bg-muted-foreground" />
        <span className="block h-px w-4 bg-muted-foreground" />
        <span className="block h-px w-4 bg-muted-foreground" />
      </button>
    </div>
  );
}
