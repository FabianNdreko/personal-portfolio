import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cmdButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md border px-4.5 py-2.5 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        primary:
          "border-accent bg-accent text-primary-foreground hover:border-accent-dim hover:bg-accent-dim",
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
} & VariantProps<typeof cmdButtonVariants>;

export function CmdButton({
  href,
  children,
  className,
  variant,
  external,
}: CmdButtonProps) {
  const classes = cn(cmdButtonVariants({ variant }), className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
