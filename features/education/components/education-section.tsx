import { Pane, SectionLabel } from "@/components/shared";
import { EDUCATION } from "@/lib/site";

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-20 md:scroll-mt-8">
      <SectionLabel
        index="04"
        title="Education"
        description="The foundation behind the work above."
      />
      <Pane>
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {EDUCATION.degree}
        </h3>
        <p className="mt-1 text-[15px] text-muted-foreground">
          {EDUCATION.school}
        </p>
        <p className="mt-2 text-sm text-accent">{EDUCATION.when}</p>
        <p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-muted-foreground">
          {EDUCATION.body}
        </p>
      </Pane>
    </section>
  );
}
