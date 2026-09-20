import Link from "next/link";
import { CONTACT_LINKS, SITE } from "@/lib/site";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const year = new Date().getFullYear();
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim() ?? "";

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-[#050505]">
        <div
          aria-hidden
          className="contact-map pointer-events-none absolute inset-0 opacity-[0.35]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(232,184,74,0.12),transparent_55%)]"
        />

        <div className="relative grid gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:items-start lg:gap-10 lg:py-14">
          <div className="flex max-w-md flex-col gap-8 lg:max-w-lg lg:gap-10">
            <div>
              <p className="text-sm tracking-wide text-muted-foreground">
                Let’s talk —
              </p>
              <h2 className="font-display mt-3 text-[clamp(1.85rem,6vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
                Contact me
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                Hiring for frontend or full-stack, or need someone who owns UI
                and still cares about the database? Send a note — I usually
                reply within a day.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7">
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] text-fg-dim uppercase">
                  Location
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {SITE.location}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] text-fg-dim uppercase">
                  Direct
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {CONTACT_LINKS.filter(
                    (item) => item.label === "Email" || item.label === "Phone",
                  ).map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="inline-flex min-h-10 items-center text-muted-foreground transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <p className="text-[11px] font-medium tracking-[0.18em] text-fg-dim uppercase">
                  Social
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <Link
                    href={SITE.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    GitHub
                  </Link>
                  <Link
                    href={SITE.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="rounded-2xl border border-border bg-elevated/90 px-4 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_40px_rgba(232,184,74,0.08)] backdrop-blur-sm sm:px-7 sm:py-8">
              <ContactForm accessKey={accessKey} />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 flex flex-col gap-2 border-t border-border/60 px-1 pt-6 pb-2 text-[12.5px] text-fg-dim sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {SITE.name}. All rights reserved.
        </p>
        <p className="text-muted-foreground/80">{SITE.locationShort}</p>
      </footer>
    </section>
  );
}
