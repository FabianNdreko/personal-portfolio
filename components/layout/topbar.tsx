type TopbarProps = {
  open: boolean;
  onToggle: () => void;
};

export function Topbar({ open, onToggle }: TopbarProps) {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/92 px-4.5 py-3.5 backdrop-blur-sm md:hidden">
      <div className="font-display text-sm font-semibold text-foreground">
        Fabian Ndreko
      </div>
      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={onToggle}
        className="flex size-8.5 flex-col items-center justify-center gap-1 rounded-md border border-border bg-elevated"
      >
        <span className="block h-px w-4 bg-muted-foreground" />
        <span className="block h-px w-4 bg-muted-foreground" />
        <span className="block h-px w-4 bg-muted-foreground" />
      </button>
    </div>
  );
}
