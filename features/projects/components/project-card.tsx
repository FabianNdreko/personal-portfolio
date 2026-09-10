import Link from "next/link";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block border-b border-border py-6 transition-colors hover:text-muted-foreground"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-medium text-foreground">{project.title}</h2>
        <span className="text-sm text-muted-foreground">{project.year}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
    </Link>
  );
}
