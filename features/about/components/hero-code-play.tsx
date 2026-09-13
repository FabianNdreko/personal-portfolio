"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { SITE } from "@/lib/site";

export type HeroProgress = {
  role: string;
  name: string;
  headline: string;
  subline: string;
  showActions: boolean;
  active: keyof Omit<HeroProgress, "showActions" | "active"> | null;
};

type Step = {
  code: string;
  field?: keyof Omit<HeroProgress, "showActions" | "active">;
  text?: string;
  actions?: boolean;
};

function buildSteps(): Step[] {
  return [
    { code: `export function Hero() {` },
    { code: `  return (` },
    { code: `    <section>` },
    {
      code: `      <p className="role">${SITE.shortRole}</p>`,
      field: "role",
      text: SITE.shortRole,
    },
    {
      code: `      <h1>${SITE.name}</h1>`,
      field: "name",
      text: SITE.name,
    },
    {
      code: `      <h2>${SITE.headline}</h2>`,
      field: "headline",
      text: SITE.headline,
    },
    {
      code: `      <p>${SITE.subline}</p>`,
      field: "subline",
      text: SITE.subline,
    },
    { code: `      <div className="actions">` },
    {
      code: `        <Button>Get in touch</Button>`,
      actions: true,
    },
    {
      code: `        <Button variant="ghost">See work</Button>`,
      actions: true,
    },
    { code: `      </div>` },
    { code: `    </section>` },
    { code: `  )` },
    { code: `}` },
  ];
}

const EMPTY: HeroProgress = {
  role: "",
  name: "",
  headline: "",
  subline: "",
  showActions: false,
  active: null,
};

const FULL: HeroProgress = {
  role: SITE.shortRole,
  name: SITE.name,
  headline: SITE.headline,
  subline: SITE.subline,
  showActions: true,
  active: null,
};

function progressFromCount(steps: Step[], count: number): HeroProgress {
  const next: HeroProgress = { ...EMPTY };
  let seen = 0;

  for (const step of steps) {
    const end = seen + step.code.length;
    const typedInStep = Math.max(0, Math.min(step.code.length, count - seen));

    if (step.field && step.text) {
      const start = step.code.indexOf(step.text);
      if (start >= 0) {
        const chars = Math.max(
          0,
          Math.min(step.text.length, typedInStep - start),
        );
        next[step.field] = step.text.slice(0, chars);
        if (chars > 0 && chars < step.text.length) {
          next.active = step.field;
        } else if (chars === step.text.length && typedInStep < step.code.length) {
          next.active = step.field;
        }
      } else if (typedInStep >= step.code.length) {
        next[step.field] = step.text;
      }
    }

    if (step.actions && typedInStep > 0) {
      next.showActions = true;
    }

    seen = end + 1;
    if (count < seen) break;
  }

  return next;
}

function colorize(line: string) {
  if (line.includes("export function") || line.trim() === "return (") {
    return "text-accent";
  }
  if (line.includes("</") || line.includes("/>") || line.includes("<")) {
    return "text-muted-foreground";
  }
  if (line.includes("Button") || line.includes("className")) {
    return "text-foreground/80";
  }
  return "text-muted-foreground";
}

type HeroCodePlayProps = {
  onProgress: (progress: HeroProgress) => void;
};

export function HeroCodePlay({ onProgress }: HeroCodePlayProps) {
  const reduceMotion = useReducedMotion();
  const steps = useMemo(() => buildSteps(), []);
  const full = useMemo(() => steps.map((s) => s.code).join("\n"), [steps]);

  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "hold">("typing");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (reduceMotion) {
      setCount(full.length);
      setPhase("hold");
      onProgress(FULL);
    }
  }, [full.length, onProgress, reduceMotion]);

  useEffect(() => {
    if (!ready || reduceMotion) return;
    onProgress(progressFromCount(steps, count));
  }, [count, onProgress, ready, reduceMotion, steps]);

  useEffect(() => {
    if (!ready || reduceMotion) return;

    if (phase === "typing") {
      if (count >= full.length) {
        const t = window.setTimeout(() => setPhase("hold"), 900);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setCount((n) => n + 2), 8);
      return () => window.clearTimeout(t);
    }
  }, [count, full.length, phase, ready, reduceMotion]);

  const typed = full.slice(0, count);
  const lines = typed.split("\n");
  const fullLines = full.split("\n");

  return (
    <div
      aria-hidden
      className="glow-panel relative overflow-hidden rounded-2xl border border-border bg-elevated/80 shadow-[0_0_40px_rgba(232,184,74,0.06)]"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] tracking-wide text-fg-dim">
          Hero.tsx
        </span>
      </div>
      <div className="relative max-h-72 overflow-hidden md:max-h-none">
        {/* Full code as height sizer so the loop can't push sections below. */}
        <pre
          className="invisible min-w-0 p-4 font-mono text-[11.5px] leading-5 md:text-[12.5px] md:leading-6"
          aria-hidden
        >
          {fullLines.map((line, index) => (
            <div key={index} className="flex min-w-0 gap-3">
              <span className="w-4 shrink-0 text-right">{index + 1}</span>
              <span className="min-w-0 break-all">{line || "\u00a0"}</span>
            </div>
          ))}
        </pre>
        <pre className="absolute inset-0 min-w-0 overflow-hidden p-4 font-mono text-[11.5px] leading-5 [scrollbar-width:none] md:text-[12.5px] md:leading-6 [&::-webkit-scrollbar]:hidden">
          {lines.map((line, index) => (
            <div key={index} className="flex min-w-0 gap-3">
              <span className="w-4 shrink-0 select-none text-right text-fg-dim/80">
                {index + 1}
              </span>
              <span className={`min-w-0 break-all ${colorize(line)}`}>
                {line}
                {phase === "typing" && index === lines.length - 1 ? (
                  <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent align-middle animate-[caret-blink_1s_step-end_infinite]" />
                ) : null}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
