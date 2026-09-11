export type ProjectSection = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Short copy for the home list. */
  summary: string;
  role: string;
  year: number;
  tags: string[];
  /** Public path, e.g. `/images/projects/<slug>/cover.jpg`. */
  cover?: string;
  liveUrl?: string;
  codeUrl?: string;
  overview: string[];
  highlights: string[];
  sections: ProjectSection[];
};

export const PROJECTS_BASE_PATH = "/projects";

export function projectPath(slug: string) {
  return `${PROJECTS_BASE_PATH}/${slug}`;
}

export function projectCoverPath(slug: string, file = "cover.jpg") {
  return `/images/projects/${slug}/${file}`;
}
