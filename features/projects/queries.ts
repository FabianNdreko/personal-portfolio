import { getProjectBySlug as getProjectBySlugService, listProjects } from "@/server/services/projects";
import type { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  return listProjects();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getProjectBySlugService(slug);
}
