type SectionLabelProps = {
  index?: string;
  title: string;
  description?: string;
};

export function SectionLabel({ index, title, description }: SectionLabelProps) {
  return (
    <header className="mb-8 md:mb-10">
      <div className="flex items-baseline gap-3">
        {index ? (
          <span className="font-mono text-xs tracking-widest text-accent/80">
            {index}
          </span>
        ) : null}
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.35rem)] font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
