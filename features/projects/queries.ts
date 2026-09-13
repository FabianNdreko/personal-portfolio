import {
  getProjectBySlug as getProjectBySlugService,
  listCaseStudies,
  listProjects,
} from "@/server/services/projects";
import type { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  return listProjects();
}

export async function getCaseStudies(): Promise<Project[]> {
  return listCaseStudies();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getProjectBySlugService(slug);
}

export async function getProjectPage(slug: string): Promise<{
  project: Project;
  previous: Project | null;
  next: Project | null;
} | null> {
  const caseStudies = await listCaseStudies();
  const index = caseStudies.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return null;
  }

  return {
    project: caseStudies[index],
    previous: caseStudies[index - 1] ?? null,
    next: caseStudies[index + 1] ?? null,
  };
}
