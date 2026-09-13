"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { CmdButton } from "@/components/shared";
import { SITE } from "@/lib/site";
import { HeroCodePlay, type HeroProgress } from "./hero-code-play";

function TypedLine({
  as: Tag = "p",
  text,
  active,
  className,
  children,
}: {
  as?: "div" | "p" | "h1";
  text: string;
  active: boolean;
  className?: string;
  children?: ReactNode;
}) {
  // Keep the node mounted (for stable layout) even while the string is empty.
  return (
    <Tag className={className} suppressHydrationWarning>
      {children ?? text}
      {active ? (
        <span className="ml-0.5 inline-block h-[0.9em] w-1.5 translate-y-[0.1em] bg-accent align-middle animate-[caret-blink_1s_step-end_infinite]" />
      ) : null}
    </Tag>
  );
}

function HeroCopy({
  shown,
}: {
  shown: {
    role: string;
    name: string;
    headline: string;
    subline: string;
    showActions: boolean;
    active: HeroProgress["active"];
  };
}) {
  return (
    <>
      <TypedLine
        as="p"
        text={shown.role}
        active={shown.active === "role"}
        className="mb-4 text-sm tracking-wide text-accent"
      />

      <TypedLine
        as="h1"
        text={shown.name}
        active={shown.active === "name"}
        className="font-display mb-3 text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.08] tracking-tight"
      />

      <TypedLine
        as="p"
        text={shown.headline}
        active={shown.active === "headline"}
        className="mb-4 max-w-2xl text-[clamp(1.05rem,2.2vw,1.35rem)] font-medium leading-snug text-foreground/90"
      />

      <TypedLine
        as="p"
        text={shown.subline}
        active={shown.active === "subline"}
        className="max-w-md text-[15px] leading-relaxed text-muted-foreground"
      />

      {shown.showActions ? (
        <p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-foreground/80">
          {SITE.lookingFor}
        </p>
      ) : (
        <p className="mt-5 max-w-md text-[13.5px] leading-relaxed opacity-0" aria-hidden>
          {SITE.lookingFor}
        </p>
      )}

      <div
        className={`mt-7 flex w-full flex-col gap-3 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:flex-row sm:flex-wrap ${
          shown.showActions
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <CmdButton
          href="#contact"
          variant="primary"
          className="w-full sm:w-auto"
        >
          Get in touch
        </CmdButton>
        <CmdButton href="#projects" className="w-full sm:w-auto">
          See work
        </CmdButton>
      </div>
    </>
  );
}

/** Plain non-interactive sizer — avoids duplicate headings/links that break hydration. */
function HeroCopySizer() {
  return (
    <div className="invisible select-none" aria-hidden>
      <p className="mb-4 text-sm tracking-wide">{SITE.shortRole}</p>
      <p className="font-display mb-3 text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
        {SITE.name}
      </p>
      <p className="mb-4 max-w-2xl text-[clamp(1.05rem,2.2vw,1.35rem)] font-medium leading-snug">
        {SITE.headline}
      </p>
      <p className="max-w-md text-[15px] leading-relaxed">{SITE.subline}</p>
      <p className="mt-5 max-w-md text-[13.5px] leading-relaxed">
        {SITE.lookingFor}
      </p>
      <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
        <span className="inline-flex w-full items-center justify-center rounded-full border px-5 py-2.5 text-sm sm:w-auto">
          Get in touch
        </span>
        <span className="inline-flex w-full items-center justify-center rounded-full border px-5 py-2.5 text-sm sm:w-auto">
          See work
        </span>
      </div>
    </div>
  );
}

const EMPTY: HeroProgress = {
  role: "",
  name: "",
  headline: "",
  subline: "",
  showActions: false,
  active: null,
};

export function AboutSection() {
  const reduceMotion = useReducedMotion();
  const [preferReduced, setPreferReduced] = useState(false);
  const [progress, setProgress] = useState<HeroProgress>(EMPTY);

  useEffect(() => {
    if (reduceMotion) {
      setPreferReduced(true);
      setProgress({
        role: SITE.shortRole,
        name: SITE.name,
        headline: SITE.headline,
        subline: SITE.subline,
        showActions: true,
        active: null,
      });
    }
  }, [reduceMotion]);

  const onProgress = useCallback((next: HeroProgress) => {
    setProgress(next);
  }, []);

  const shown = preferReduced
    ? {
        role: SITE.shortRole,
        name: SITE.name,
        headline: SITE.headline,
        subline: SITE.subline,
        showActions: true,
        active: null as HeroProgress["active"],
      }
    : progress;

  return (
    <section id="about" className="scroll-mt-24 relative">
      <div className="relative grid items-start gap-10 pb-4 pt-6 md:grid-cols-[minmax(0,1.05fr)_minmax(15rem,19rem)] md:gap-10 md:pt-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
        <div className="relative min-w-0">
          <HeroCopySizer />
          <div className="absolute inset-0">
            <HeroCopy shown={shown} />
          </div>
        </div>

        <div className="relative w-full min-w-0 max-w-md md:sticky md:top-24 md:max-w-none">
          <HeroCodePlay onProgress={onProgress} />
        </div>
      </div>

      <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/80 bg-elevated/50 px-5 py-4">
          <dt className="text-xs tracking-wide text-fg-dim">Role</dt>
          <dd className="mt-1.5 text-sm font-medium">{SITE.shortRole}</dd>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {SITE.roleDetail}
          </p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-elevated/50 px-5 py-4">
          <dt className="text-xs tracking-wide text-fg-dim">Availability</dt>
          <dd className="mt-1.5 flex items-center gap-2 text-sm font-medium">
            {SITE.available ? (
              <span
                className="size-1.75 rounded-full bg-accent shadow-[0_0_0_0_rgba(232,184,74,0.55)] animate-[status-pulse_2s_infinite]"
                aria-hidden
              />
            ) : null}
            {SITE.available ? SITE.availableLabel : "Not available"}
          </dd>
          {SITE.available ? (
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {SITE.availabilityDetail}
            </p>
          ) : null}
        </div>
      </dl>

      <div className="mt-16 grid grid-cols-1 items-start gap-10 border-t border-border/80 pt-12 sm:grid-cols-[1fr_14rem] sm:gap-12">
        <div className="order-2 sm:order-1">
          <h2 className="font-display mb-4 text-2xl font-semibold tracking-tight md:text-[1.75rem]">
            {SITE.aboutTitle}
          </h2>
          {SITE.about.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mb-3.5 max-w-prose text-[15px] leading-relaxed text-muted-foreground last:mb-0 md:text-[15.5px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative order-1 mx-auto aspect-3/4 w-full max-w-56 overflow-hidden rounded-2xl border border-accent/20 shadow-[0_0_40px_rgba(232,184,74,0.12)] sm:order-2 sm:mx-0 sm:max-w-none">
          <Image
            src={SITE.portrait}
            alt={SITE.name}
            fill
            sizes="(min-width: 640px) 14rem, 14rem"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </section>
  );
}
