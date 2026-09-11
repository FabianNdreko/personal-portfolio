import { SectionLabel, Tag } from "@/components/shared";
import { EDUCATION, STACK } from "@/lib/site";

export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-20 md:scroll-mt-8">
      <SectionLabel
        index="03"
        title="Stack"
        description="Tools I use to design, build, ship, and verify software."
      />

      <dl>
        {STACK.map((group) => (
          <div
            key={group.label}
            className="grid gap-2.5 border-b border-border py-5 first:pt-0 sm:grid-cols-[11.5rem_1fr] sm:items-baseline sm:gap-8"
          >
            <dt className="text-sm font-medium">{group.label}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        ))}
        <div className="grid gap-2.5 py-5 sm:grid-cols-[11.5rem_1fr] sm:items-baseline sm:gap-8">
          <dt className="text-sm font-medium">Education</dt>
          <dd>
            <p className="text-lg font-semibold tracking-tight">
              {EDUCATION.degree}
            </p>
            <p className="mt-0.5 text-sm text-accent">{EDUCATION.school}</p>
            <p className="mt-1 text-sm text-muted-foreground">{EDUCATION.when}</p>
            <p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-muted-foreground">
              {EDUCATION.body}
            </p>
          </dd>
        </div>
      </dl>
    </section>
  );
}
