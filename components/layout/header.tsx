import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Container } from "./container";

export function Header() {
  return (
    <header className="border-b border-border">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-medium text-foreground">
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
