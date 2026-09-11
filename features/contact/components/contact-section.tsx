import { SectionLabel } from "@/components/shared";
import { CONTACT_LINKS } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 md:scroll-mt-8">
      <SectionLabel
        index="05"
        title="Contact"
        description="The fastest way to reach me is email — LinkedIn and GitHub work too."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONTACT_LINKS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={"external" in item && item.external ? "_blank" : undefined}
            rel={
              "external" in item && item.external
                ? "noopener noreferrer"
                : undefined
            }
            className="group rounded-xl border border-border bg-elevated px-5 py-4 transition-colors hover:border-accent"
          >
            <span className="text-xs text-fg-dim">{item.label}</span>
            <span className="mt-1 block text-sm font-medium break-all group-hover:text-accent">
              {item.value}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
