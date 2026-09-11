import Link from "next/link";
import { MediaPlaceholder, SectionLabel, Tag } from "@/components/shared";
import type { Project } from "../types";

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
            <MediaPlaceholder className="aspect-video rounded-none border-0" />
            <div className="px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-accent"
                  >
                    {project.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-fg-dim">{project.year}</span>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent"
                    >
                      Live
                    </a>
                  ) : null}
                  {project.codeUrl ? (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent"
                    >
                      Code
                    </a>
                  ) : null}
                </div>
              </div>
              <p className="mt-2 mb-4 max-w-prose text-[14.5px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
