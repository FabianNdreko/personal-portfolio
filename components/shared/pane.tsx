import { cn } from "@/lib/utils";

type PaneProps = {
  filename: string;
  meta?: string;
  accent?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function Pane({
  filename,
  meta,
  accent = "▸",
  children,
  className,
  bodyClassName,
}: PaneProps) {
  return (
    <div className={cn("mb-14 border border-border bg-elevated", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <span className="text-foreground">
          <span className="text-accent">{accent}</span> {filename}
        </span>
        {meta ? <span>{meta}</span> : null}
      </div>
      <div className={cn("px-6.5 py-6.5 pb-7.5", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
