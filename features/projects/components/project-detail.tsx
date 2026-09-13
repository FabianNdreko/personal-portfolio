import Link from "next/link";
import { Fragment } from "react";
import { CmdButton, Tag } from "@/components/shared";
import type { Project } from "../types";
import { projectPath } from "../types";
import { ProjectCover } from "./project-cover";

type ProjectDetailProps = {
  project: Project;
  previous: Project | null;
  next: Project | null;
};

function LinkedCopy({ text, href }: { text: string; href?: string }) {
  if (!href) return <>{text}</>;

  let host: string;
  try {
    host = new URL(href).host;
  } catch {
    return <>{text}</>;
  }

  if (!text.includes(host)) return <>{text}</>;

  const parts = text.split(host);
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${host}-${index}`}>
          {part}
          {index < parts.length - 1 ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {host}
            </a>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}

export function ProjectDetail({ project, previous, next }: ProjectDetailProps) {
  return (
    <article>
      <Link
        href="/#projects"
        className="inline-flex min-h-10 items-center text-sm text-muted-foreground hover:text-accent"
      >
        ← Projects
      </Link>

      <header className="mt-6">
        <h1 className="font-display text-[clamp(28px,4.5vw,42px)] font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 max-w-prose text-[16px] leading-relaxed text-muted-foreground">
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
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        {project.liveUrl || project.codeUrl ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <CmdButton href={project.liveUrl} variant="primary" external>
                Try live demo
              </CmdButton>
            ) : null}
            {project.codeUrl ? (
              <CmdButton href={project.codeUrl} external>
                View code
              </CmdButton>
            ) : null}
          </div>
        ) : null}
        {project.demoLogin ? (
          <div className="mt-5 max-w-md rounded-2xl border border-accent/20 bg-elevated px-4 py-3.5 shadow-[0_0_32px_rgba(232,184,74,0.08)]">
            <p className="text-xs font-medium tracking-wide text-accent uppercase">
              Demo login
            </p>
            {project.demoLogin.note ? (
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {project.demoLogin.note}
              </p>
            ) : null}
            <dl className="mt-3 space-y-1.5 text-[13.5px]">
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                <dt className="text-fg-dim">Email</dt>
                <dd className="font-mono text-foreground">
                  {project.demoLogin.email}
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                <dt className="text-fg-dim">Password</dt>
                <dd className="font-mono text-foreground">
                  {project.demoLogin.password}
                </dd>
              </div>
            </dl>
          </div>
        ) : null}
      </header>

      <div className="mt-10">
        <ProjectCover project={project} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Overview
        </h2>
        {(project.overview ?? []).map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted-foreground"
          >
            <LinkedCopy text={paragraph} href={project.liveUrl} />
          </p>
        ))}
      </section>

      {(project.highlights?.length ?? 0) > 0 ? (
        <section className="mt-12 grid gap-3 border-t border-border pt-10 sm:grid-cols-[11.5rem_1fr] sm:gap-8">
          <h2 className="text-sm font-medium">Highlights</h2>
          <ul className="max-w-prose list-disc space-y-1.5 pl-4.5 text-[14.5px] leading-relaxed text-muted-foreground">
            {project.highlights!.map((item) => (
              <li key={item}>
                <LinkedCopy text={item} href={project.liveUrl} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {(project.sections?.length ?? 0) > 0 ? (
        <div className="mt-4">
          {project.sections!.map((section) => (
            <section
              key={section.title}
              className="grid gap-2 border-t border-border py-8 last:pb-0 sm:grid-cols-[11.5rem_1fr] sm:gap-8"
            >
              <h2 className="text-sm font-medium">{section.title}</h2>
              <p className="max-w-prose text-[14.5px] leading-relaxed text-muted-foreground">
                <LinkedCopy text={section.body} href={project.liveUrl} />
              </p>
            </section>
          ))}
        </div>
      ) : null}

      <nav
        aria-label="Other projects"
        className="mt-16 flex items-start justify-between gap-6 border-t border-border pt-8"
      >
        {previous ? (
          <Link
            href={projectPath(previous.slug)}
            className="group min-w-0 text-left"
          >
            <span className="block text-xs text-fg-dim">Previous</span>
            <span className="mt-1 block truncate text-sm font-medium group-hover:text-accent">
              ← {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={projectPath(next.slug)}
            className="group min-w-0 text-right"
          >
            <span className="block text-xs text-fg-dim">Next</span>
            <span className="mt-1 block truncate text-sm font-medium group-hover:text-accent">
              {next.title} →
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
