import { Pane, SectionLabel } from "@/components/shared";
import { CONTACT_COMMANDS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-6.5">
      <SectionLabel>contact.sh</SectionLabel>
      <Pane filename="contact.sh" accent="$" meta="executable">
        {CONTACT_COMMANDS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target={"external" in item && item.external ? "_blank" : undefined}
            rel={
              "external" in item && item.external
                ? "noopener noreferrer"
                : undefined
            }
            className={cn(
              "group flex items-center justify-between gap-3.5 border-b border-border py-3.5 font-mono text-sm last:border-b-0",
              "transition-[padding] duration-150 hover:pl-1.5 hover:text-accent",
            )}
          >
            <span className="text-fg-dim">
              <span className="text-accent">$</span> {item.cmd}
            </span>
            <span className="text-foreground group-hover:text-accent">
              {item.value}
            </span>
            <span className="text-xs text-fg-dim opacity-0 transition-opacity group-hover:text-accent group-hover:opacity-100">
              run →
            </span>
          </a>
        ))}
      </Pane>
    </section>
  );
}
