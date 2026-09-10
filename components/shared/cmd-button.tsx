import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cmdButtonVariants = cva(
  "inline-flex items-center gap-2 border px-4.5 py-2.75 font-mono text-[13px] transition-colors",
  {
    variants: {
      variant: {
        primary:
          "border-accent bg-accent font-semibold text-primary-foreground hover:border-accent-dim hover:bg-accent-dim",
        outline:
          "border-border-strong bg-transparent text-foreground hover:border-accent hover:text-accent",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

type CmdButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  showPrompt?: boolean;
} & VariantProps<typeof cmdButtonVariants>;

export function CmdButton({
  href,
  children,
  className,
  variant,
  external,
  showPrompt = true,
}: CmdButtonProps) {
  const classes = cn(cmdButtonVariants({ variant }), className);
  const content = (
    <>
      {showPrompt ? (
        <span
          className={cn(
            "opacity-100",
            variant === "primary"
              ? "text-primary-foreground/60"
              : "text-fg-dim",
          )}
        >
          $
        </span>
      ) : null}
      {children}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
