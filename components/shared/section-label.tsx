type SectionLabelProps = {
  index?: string;
  title: string;
  description?: string;
};

export function SectionLabel({ index, title, description }: SectionLabelProps) {
  return (
    <header className="mb-6">
      <div className="flex items-baseline gap-3">
        {index ? (
          <span className="font-mono text-xs tracking-wide text-accent">
            {index}
          </span>
        ) : null}
        <h2 className="font-display text-[1.65rem] font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="mt-1.5 max-w-prose text-[15px] text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
