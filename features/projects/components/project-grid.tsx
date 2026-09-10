import type { Project } from "../types";
import { ProjectCard } from "./project-card";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="divide-y-0">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
