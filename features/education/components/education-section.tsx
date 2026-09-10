import { Pane, SectionLabel } from "@/components/shared";
import { EDUCATION } from "@/lib/site";

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-6.5">
      <SectionLabel>education.md</SectionLabel>
      <Pane filename="education.md" accent="#" meta="1 entry">
        <h3 className="font-display mb-1 text-xl font-bold">
          {EDUCATION.degree}
        </h3>
        <div className="text-[14.5px] text-muted-foreground">
          {EDUCATION.school}
        </div>
        <div className="my-2.5 font-mono text-xs text-accent">
          {EDUCATION.when}
        </div>
        <p className="max-w-prose text-[14.5px] text-muted-foreground">
          {EDUCATION.body}
        </p>
      </Pane>
    </section>
  );
}
