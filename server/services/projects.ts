import { projects } from "@/features/projects/data";
import type { Project } from "@/features/projects/types";
import { hasCaseStudy } from "@/features/projects/types";

export async function listProjects(): Promise<Project[]> {
  return projects;
}

export async function listCaseStudies(): Promise<Project[]> {
  return projects.filter(hasCaseStudy);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = projects.find((entry) => entry.slug === slug) ?? null;
  if (!project || !hasCaseStudy(project)) return null;
  return project;
}
