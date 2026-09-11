import Link from "next/link";
import { SectionLabel, Tag } from "@/components/shared";
import type { Project } from "../types";
import { projectPath } from "../types";
import { ProjectCover } from "./project-cover";

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-20 md:scroll-mt-8">
      <SectionLabel
        index="02"
        title="Projects"
        description="Selected work across product, full-stack, and testing."
      />

      <div className="flex flex-col gap-5">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="overflow-hidden rounded-xl border border-border bg-elevated"
          >
            <Link href={projectPath(project.slug)} className="block">
              <ProjectCover
                project={project}
                rounded={false}
                className="rounded-none"
              />
            </Link>
            <div className="px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  <Link
                    href={projectPath(project.slug)}
                    className="hover:text-accent"
                  >
                    {project.title}
                  </Link>
                </h3>
                <span className="text-sm text-fg-dim">{project.year}</span>
              </div>
              <p className="mt-2 mb-4 max-w-prose text-[14.5px] leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <Link
                  href={projectPath(project.slug)}
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  View project →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
