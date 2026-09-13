import type { ReactNode } from "react";
import { SectionLabel } from "@/components/shared";
import { EDUCATION } from "@/lib/site";

function HighlightedText({ text }: { text: string }) {
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

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24">
      <SectionLabel
        index="02"
        title="Education"
        description="The degree behind the day-to-day stack."
      />

      <div className="glow-panel grid gap-3 rounded-2xl border border-border bg-elevated/70 p-5 backdrop-blur-sm sm:grid-cols-[10rem_1fr] sm:gap-6 sm:p-6 md:grid-cols-[11.5rem_1fr] md:gap-8">
        <p className="pt-0.5 text-sm text-muted-foreground">{EDUCATION.when}</p>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            {EDUCATION.degree}
          </h3>
          <p className="mt-0.5 text-sm text-accent">{EDUCATION.school}</p>
          <p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-muted-foreground">
            <HighlightedText text={EDUCATION.body} />
          </p>
        </div>
      </div>
    </section>
  );
}
