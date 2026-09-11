import { SectionLabel } from "@/components/shared";
import { CONTACT_LINKS } from "@/lib/site";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 md:scroll-mt-8">
      <SectionLabel
        index="04"
        title="Contact"
        description="Tell me about the role or the project — I usually reply by email."
      />

      <ContactForm />

      <p className="mt-12 mb-2 text-sm text-fg-dim">Or reach me directly</p>
      <ul>
        {CONTACT_LINKS.map((item) => {
          const external = "external" in item && item.external;

          return (
            <li
              key={item.href}
              className="border-b border-border last:border-b-0"
            >
              <a
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group grid gap-1 py-4 sm:grid-cols-[11.5rem_1fr] sm:items-center sm:gap-8"
              >
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
                <span className="flex min-w-0 items-center justify-between gap-4">
                  <span className="truncate font-medium group-hover:text-accent">
                    {item.value}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-fg-dim transition-colors group-hover:text-accent"
                  >
                    {external ? "↗" : "→"}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
