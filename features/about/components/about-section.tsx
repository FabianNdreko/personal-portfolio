import { CmdButton, MediaPlaceholder } from "@/components/shared";
import { SITE } from "@/lib/site";

export function AboutSection() {
  const { developerObject } = SITE;

  return (
    <section id="about" className="scroll-mt-[26px]">
      <div className="mb-[22px] font-mono text-[13px] text-fg-dim">
        <span className="text-accent">$</span> whoami
        <br />
        <span className="text-muted-foreground">
          {SITE.whoami}
          <span className="ml-0.5 inline-block h-[15px] w-2 -translate-y-0.5 bg-accent align-middle animate-[caret-blink_1.1s_steps(1)_infinite]" />
        </span>
      </div>

      <pre className="whitespace-pre-wrap border border-border bg-elevated-2 px-[22px] py-5 font-mono text-[14.5px] leading-[1.9]">
        <span className="text-muted-foreground">const </span>
        <span className="text-key">developer</span>
        <span className="text-fg-dim"> = {"{"}</span>
        {"\n"}
        {"  "}
        <span className="text-key">name</span>
        <span className="text-fg-dim">: </span>
        <span className="text-foreground">&quot;{developerObject.name}&quot;</span>
        <span className="text-fg-dim">,</span>
        {"\n"}
        {"  "}
        <span className="text-key">role</span>
        <span className="text-fg-dim">: </span>
        <span className="text-foreground">&quot;{developerObject.role}&quot;</span>
        <span className="text-fg-dim">,</span>
        {"\n"}
        {"  "}
        <span className="text-key">basedIn</span>
        <span className="text-fg-dim">: </span>
        <span className="text-foreground">&quot;{developerObject.basedIn}&quot;</span>
        <span className="text-fg-dim">,</span>
        {"\n"}
        {"  "}
        <span className="text-key">focus</span>
        <span className="text-fg-dim">: [</span>
        {developerObject.focus.map((item, index) => (
          <span key={item}>
            <span className="text-foreground">&quot;{item}&quot;</span>
            {index < developerObject.focus.length - 1 ? (
              <span className="text-fg-dim">, </span>
            ) : null}
          </span>
        ))}
        <span className="text-fg-dim">],</span>
        {"\n"}
        {"  "}
        <span className="text-key">available</span>
        <span className="text-fg-dim">: </span>
        <span className="text-bool">{String(developerObject.available)}</span>
        <span className="text-fg-dim">,</span>
        {"\n"}
        <span className="text-fg-dim">{"}"}</span>
        <span className="italic text-fg-dim">;</span>
      </pre>

      <h1 className="font-display mt-[26px] mb-2 text-[clamp(30px,5vw,44px)] font-bold tracking-tight">
        {SITE.headline}
      </h1>
      <div className="mb-4 font-mono text-sm text-accent">{SITE.subline}</div>
      <p className="max-w-[56ch] text-[15.5px] text-muted-foreground">
        {SITE.intro}
      </p>

      <div className="mt-[26px] flex flex-wrap gap-3">
        <CmdButton href="#contact" variant="primary">
          get in touch
        </CmdButton>
        <CmdButton href={SITE.social.github} external>
          view github
        </CmdButton>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-7 border-t border-border pt-9 sm:grid-cols-[1fr_220px]">
        <div className="order-2 sm:order-1">
          <div className="mb-4 font-mono text-sm text-accent">// about me</div>
          {SITE.about.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mb-3.5 max-w-[56ch] text-[14.5px] text-muted-foreground last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="order-1 max-w-[200px] sm:order-2 sm:max-w-none">
          <MediaPlaceholder
            className="aspect-[3/4]"
            captionLeft="assets/"
            captionRight="about.jpg"
          />
        </div>
      </div>
    </section>
  );
}
