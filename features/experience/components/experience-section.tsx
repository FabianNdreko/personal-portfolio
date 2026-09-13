import type { ReactNode } from "react";
import { SectionLabel } from "@/components/shared";
import { EXPERIENCE } from "@/lib/site";

function HighlightedBullet({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <span key={key++} className="font-medium text-accent">
        {match[1]}
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <SectionLabel index="01" title="Experience" />

      <ol className="mt-2 flex flex-col gap-4">
        {EXPERIENCE.map((entry) => (
          <li
            key={`${entry.role}-${entry.range}`}
            className="glow-panel glow-panel-hover grid gap-3 rounded-2xl border border-border bg-elevated/70 p-5 backdrop-blur-sm sm:grid-cols-[10rem_1fr] sm:gap-6 sm:p-6 md:grid-cols-[11.5rem_1fr] md:gap-8"
          >
            <p className="pt-0.5 text-sm text-muted-foreground">{entry.range}</p>
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {entry.role}
                </h3>
                {entry.current ? (
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium text-accent">
                    Current
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 text-sm text-accent">{entry.company}</p>
              <ul className="mt-3 max-w-prose list-disc space-y-1.5 pl-4.5 text-[14.5px] leading-relaxed text-muted-foreground">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>
                    <HighlightedBullet text={bullet} />
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
