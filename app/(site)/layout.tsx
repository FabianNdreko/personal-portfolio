import { SiteShell } from "@/components/layout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const turnstileSiteKey =
    process.env.CLOUDFLARE_TURNSTILE_SITE_KEY?.trim() || "";

  return (
    <SiteShell turnstileSiteKey={turnstileSiteKey}>{children}</SiteShell>
  );
}
