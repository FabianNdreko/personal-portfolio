import { cn } from "@/lib/utils";

type PaneProps = {
  children: React.ReactNode;
  className?: string;
};

export function Pane({ children, className }: PaneProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-elevated px-5 py-5 sm:px-6 sm:py-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
