import {
  getProjectBySlug as getProjectBySlugService,
  listProjects,
} from "@/server/services/projects";
import type { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  return listProjects();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getProjectBySlugService(slug);
}

export async function getProjectPage(slug: string): Promise<{
  project: Project;
  previous: Project | null;
  next: Project | null;
} | null> {
  const projects = await listProjects();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return null;
  }

  return {
    project: projects[index],
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}
