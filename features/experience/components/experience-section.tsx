import { Pane, SectionLabel } from "@/components/shared";
import { EXPERIENCE } from "@/lib/site";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-[26px]">
      <SectionLabel>experience.log</SectionLabel>
      <Pane
        filename="experience.log"
        accent=">_"
        meta={`${EXPERIENCE.length} entries`}
      >
        {EXPERIENCE.map((entry, index) => (
          <div
            key={`${entry.role}-${entry.range}`}
            className={
              index === EXPERIENCE.length - 1
                ? "pt-5 first:pt-0"
                : "border-b border-border py-5 first:pt-0"
            }
          >
            <div className="mb-2 font-mono text-xs text-fg-dim">
              [<span className="text-accent">{entry.range}</span>]
            </div>
            <div className="text-[17px] font-semibold">
              {entry.role}{" "}
              <span className="font-normal text-muted-foreground">
                {entry.company}
              </span>
            </div>
            <ul className="mt-2 max-w-[60ch] list-disc pl-[18px] text-[14.5px] text-muted-foreground">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="my-1">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Pane>
    </section>
  );
}
