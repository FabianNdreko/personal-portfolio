import { Pane, SectionLabel } from "@/components/shared";
import { STACK } from "@/lib/site";

export function StackSection() {
  const entries = Object.entries(STACK);

  return (
    <section id="stack" className="scroll-mt-[26px]">
      <SectionLabel>stack.json</SectionLabel>
      <Pane filename="stack.json" accent="{ }" meta={`${entries.length} keys`}>
        <div className="font-mono text-[13.5px] leading-[2]">
          <div>{"{"}</div>
          {entries.map(([key, values], index) => (
            <div key={key} className="pl-5">
              <span className="text-key">&quot;{key}&quot;</span>
              <span className="text-fg-dim">: [</span>
              {values.map((value, valueIndex) => (
                <span key={value} className="text-foreground">
                  {value}
                  {valueIndex < values.length - 1 ? (
                    <span className="mr-[5px] text-fg-dim">,</span>
                  ) : null}
                </span>
              ))}
              <span className="text-fg-dim">]</span>
              {index < entries.length - 1 ? (
                <span className="text-fg-dim">,</span>
              ) : null}
            </div>
          ))}
          <div>{"}"}</div>
        </div>
      </Pane>
    </section>
  );
}
