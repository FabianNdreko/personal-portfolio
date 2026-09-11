import { SectionLabel } from "@/components/shared";
import { CONTACT_LINKS } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 md:scroll-mt-8">
      <SectionLabel
        index="04"
        title="Contact"
        description="The fastest way to reach me is email — LinkedIn and GitHub work too."
      />

      <ul>
        {CONTACT_LINKS.map((item) => {
          const external = "external" in item && item.external;

          return (
            <li
              key={item.href}
              className="border-b border-border first:[&>a]:pt-0 last:border-b-0"
            >
              <a
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group grid gap-1 py-5 sm:grid-cols-[11.5rem_1fr] sm:items-center sm:gap-8"
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
