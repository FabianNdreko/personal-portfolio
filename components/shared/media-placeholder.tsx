import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  captionLeft?: string;
  captionRight?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function MediaPlaceholder({
  captionLeft,
  captionRight,
  className,
  style,
}: MediaPlaceholderProps) {
  return (
    <div>
      <div
        className={cn(
          "relative border border-border bg-elevated-2",
          "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.045)_0_2px,transparent_2px_15px)]",
          "bg-cover bg-center",
          className,
        )}
        style={style}
      />
      {captionLeft || captionRight ? (
        <div className="mt-1.5 flex justify-between gap-2 font-mono text-[11px] text-fg-dim">
          <span>{captionLeft}</span>
          <span>{captionRight}</span>
        </div>
      ) : null}
    </div>
  );
}
