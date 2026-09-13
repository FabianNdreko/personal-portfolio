import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cmdButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
  {
    variants: {
      variant: {
        primary:
          "border-accent/60 bg-accent text-primary-foreground shadow-[0_0_24px_rgba(232,184,74,0.25)] hover:border-accent-dim hover:bg-accent-dim hover:shadow-[0_0_32px_rgba(232,184,74,0.35)]",
        outline:
          "border-border-strong bg-transparent text-foreground hover:border-accent/50 hover:text-accent hover:shadow-[0_0_24px_rgba(232,184,74,0.12)]",
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
