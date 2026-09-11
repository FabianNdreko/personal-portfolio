import { SectionLabel, Tag } from "@/components/shared";
import { STACK } from "@/lib/site";

export function StackSection() {
  return (
    <section id="stack" className="scroll-mt-20 md:scroll-mt-8">
      <SectionLabel
        index="03"
        title="Stack"
        description="Tools I use to design, build, ship, and verify software."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {STACK.map((group) => (
          <div
            key={group.label}
            className="rounded-xl border border-border bg-elevated px-5 py-4"
          >
            <h3 className="mb-3 text-sm font-medium">{group.label}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
