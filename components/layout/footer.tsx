import { SITE_NAME } from "@/lib/constants";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex h-14 items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </Container>
    </footer>
  );
}
