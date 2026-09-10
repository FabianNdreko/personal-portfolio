import Link from "next/link";
import { MediaPlaceholder, Pane, SectionLabel } from "@/components/shared";
import type { Project } from "../types";

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-[26px]">
      <SectionLabel>projects/</SectionLabel>
      <Pane filename="projects" meta={`${projects.length} items`}>
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className={
              index === projects.length - 1
                ? "pt-[26px] first:pt-0"
                : "border-b border-border py-[26px] first:pt-0"
            }
          >
            <MediaPlaceholder
              className="aspect-video"
              captionLeft="projects/"
              captionRight={project.imageCaption}
            />
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-lg font-semibold">
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:text-accent"
                >
                  {project.title}
                </Link>
              </h3>
              <div className="flex gap-2.5">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-border-strong font-mono text-xs text-muted-foreground hover:border-accent hover:text-accent"
                  >
                    live
                  </a>
                ) : null}
                {project.codeUrl ? (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-border-strong font-mono text-xs text-muted-foreground hover:border-accent hover:text-accent"
                  >
                    code
                  </a>
                ) : null}
              </div>
            </div>
            <p className="mt-2 mb-3.5 max-w-[60ch] text-[14.5px] text-muted-foreground">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border-strong px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </Pane>
    </section>
  );
}
