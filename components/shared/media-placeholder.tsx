import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  caption?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function MediaPlaceholder({
  caption,
  className,
  style,
}: MediaPlaceholderProps) {
  return (
    <div>
      <div
        className={cn(
          "relative rounded-lg border border-border bg-elevated-2",
          "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0_2px,transparent_2px_16px)]",
          "bg-cover bg-center",
          className,
        )}
        style={style}
      />
      {caption ? (
        <p className="mt-1.5 text-xs text-fg-dim">{caption}</p>
      ) : null}
    </div>
  );
}
