import { projects } from "@/features/projects/data";
import type { Project } from "@/features/projects/types";

export async function listProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projects.find((project) => project.slug === slug) ?? null;
}
