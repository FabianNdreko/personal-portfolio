import Image from "next/image";
import Link from "next/link";
import { CmdButton, SectionLabel, Tag } from "@/components/shared";
import type { Project } from "../types";
import { hasCaseStudy, projectPath } from "../types";
import { OtherProjectsCta } from "./other-projects-cta";

type ProjectsSectionProps = {
  projects: Project[];
};

function FeaturedCard({ project }: { project: Project }) {
  const mark = project.logo ?? project.cover;
  const preview = project.previews?.[0] ?? project.cover;
  const detail = hasCaseStudy(project);

  return (
    <article className="glow-panel glow-panel-hover relative overflow-hidden rounded-3xl border border-border bg-elevated/60">
      {preview ? (
        <div className="relative h-48 overflow-hidden border-b border-border sm:h-60">
          <Image
            src={preview}
            alt=""
            fill
            sizes="(min-width: 768px) 64rem, 100vw"
            className="object-cover object-top opacity-95 transition-transform duration-700 hover:scale-[1.02]"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-elevated via-elevated/25 to-transparent"
          />
          {mark && mark !== preview ? (
            <div className="absolute top-4 right-4 size-11 overflow-hidden rounded-full border border-border-strong bg-[#f4f1ea] shadow-[0_0_20px_rgba(232,184,74,0.12)] sm:size-12">
              <Image
                src={mark}
                alt=""
                width={48}
                height={48}
                className="size-full object-cover"
              />
            </div>
          ) : null}
          {project.liveUrl ? (
            <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-background/85 px-2.5 py-1 text-[11px] font-medium text-accent backdrop-blur-sm">
              <span
                className="size-1.5 rounded-full bg-accent animate-[status-pulse_2s_infinite]"
                aria-hidden
              />
              Live product
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="relative p-5 sm:p-7">
        <div className="max-w-2xl">
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {project.title}
          </h3>
          {project.pitch ? (
            <p className="mt-2 text-[13px] leading-relaxed text-accent/90">
              {project.pitch}
            </p>
          ) : null}
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          {project.metrics?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.metrics.map((metric) => (
                <span
                  key={metric}
                  className="rounded-full border border-accent/25 bg-accent/8 px-3 py-1.5 text-[12.5px] font-medium text-foreground/90"
                >
                  {metric}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {project.liveUrl ? (
              <CmdButton
                href={project.liveUrl}
                variant="primary"
                external
                className="w-full sm:w-auto"
              >
                Try live demo
              </CmdButton>
            ) : null}
            {detail ? (
              <CmdButton
                href={projectPath(project.slug)}
                className="w-full sm:w-auto"
              >
                Case study →
              </CmdButton>
            ) : null}
          </div>
          {project.demoLogin ? (
            <p className="mt-4 text-[12.5px] leading-relaxed text-fg-dim">
              Demo: {project.demoLogin.email} / {project.demoLogin.password}
            </p>
          ) : null}
        </div>

        {detail ? (
          <Link
            href={projectPath(project.slug)}
            className="sr-only"
            tabIndex={-1}
          >
            Open {project.title} case study
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function CompactCard({ project }: { project: Project }) {
  const preview = project.previews?.[0] ?? project.cover;

  return (
    <article className="glow-panel glow-panel-hover flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-elevated/60">
      {preview ? (
        <div className="relative h-28 overflow-hidden border-b border-border sm:h-32">
          <Image
            src={preview}
            alt=""
            fill
            sizes="(min-width: 640px) 20rem, 100vw"
            className="object-cover object-top opacity-90"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-elevated/90 via-elevated/10 to-transparent"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] tracking-wide text-fg-dim">{project.year}</p>
        <h3 className="font-display mt-1.5 text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        {project.metrics?.length ? (
          <p className="mt-3 text-[12px] leading-snug text-accent/90">
            {project.metrics.join(" · ")}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        {project.liveUrl || project.codeUrl ? (
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {project.liveUrl ? (
              <CmdButton
                href={project.liveUrl}
                variant="primary"
                external
                className="w-full sm:w-auto"
              >
                View site
              </CmdButton>
            ) : null}
            {project.codeUrl ? (
              <CmdButton
                href={project.codeUrl}
                external
                className="w-full sm:w-auto"
              >
                Code
              </CmdButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="scroll-mt-24">
      <SectionLabel
        index="03"
        title="Projects"
        description="Proof in production — a product I own, a client site live in Germany, and one playful build."
      />

      <div className="flex flex-col gap-8">
        {featured ? <FeaturedCard project={featured} /> : null}

        {rest.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((project) => (
              <CompactCard key={project.slug} project={project} />
            ))}
          </div>
        ) : null}

        <OtherProjectsCta />
      </div>
    </section>
  );
}
