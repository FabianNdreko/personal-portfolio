import Image from "next/image";
import { CmdButton, Tag } from "@/components/shared";
import { SITE } from "@/lib/site";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 md:scroll-mt-8">
      <p className="mb-3 text-sm text-accent">
        {SITE.shortRole} · {SITE.location}
      </p>

      <h1 className="font-display mb-3 text-[clamp(32px,5vw,46px)] font-bold tracking-tight">
        {SITE.headline}
      </h1>
      <p className="mb-4 max-w-prose text-[17px] leading-relaxed text-muted-foreground">
        {SITE.subline}
      </p>
      <p className="max-w-prose text-[15.5px] leading-relaxed text-muted-foreground">
        {SITE.intro}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <CmdButton href="#contact" variant="primary">
          Get in touch
        </CmdButton>
        <CmdButton href={SITE.social.github} external>
          View GitHub
        </CmdButton>
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-elevated px-4 py-3.5">
          <dt className="text-xs text-fg-dim">Role</dt>
          <dd className="mt-1 text-sm font-medium">{SITE.shortRole}</dd>
        </div>
        <div className="rounded-xl border border-border bg-elevated px-4 py-3.5">
          <dt className="text-xs text-fg-dim">Based in</dt>
          <dd className="mt-1 text-sm font-medium">{SITE.location}</dd>
        </div>
        <div className="rounded-xl border border-border bg-elevated px-4 py-3.5">
          <dt className="text-xs text-fg-dim">Status</dt>
          <dd className="mt-1 flex items-center gap-2 text-sm font-medium">
            {SITE.available ? (
              <span
                className="size-1.75 rounded-full bg-accent shadow-[0_0_0_0_rgba(31,224,184,0.55)] animate-[status-pulse_2s_infinite]"
                aria-hidden
              />
            ) : null}
            {SITE.available ? SITE.availableLabel : "Not available"}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <p className="mb-2 text-xs text-fg-dim">Focus</p>
        <div className="flex flex-wrap gap-2">
          {SITE.focus.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-[1fr_13rem]">
        <div className="order-2 sm:order-1">
          <h2 className="font-display mb-4 text-xl font-semibold tracking-tight">
            About me
          </h2>
          {SITE.about.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mb-3.5 max-w-prose text-[15px] leading-relaxed text-muted-foreground last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative order-1 aspect-3/4 w-full max-w-56 overflow-hidden rounded-xl border border-border sm:order-2 sm:max-w-none">
          <Image
            src={SITE.portrait}
            alt={SITE.name}
            fill
            sizes="(min-width: 640px) 13rem, 14rem"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
