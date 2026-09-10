type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-[18px] flex items-center gap-2.5 font-mono text-xs text-fg-dim">
      <span>{children}</span>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}
