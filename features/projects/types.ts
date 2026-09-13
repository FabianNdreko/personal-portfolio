export type ProjectSection = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Short copy for the home list. */
  summary: string;
  /** Optional product pitch shown on the homepage card. */
  pitch?: string;
  role: string;
  year: number;
  tags: string[];
  /** When false, homepage-only — no `/projects/<slug>` page. Defaults to true. */
  caseStudy?: boolean;
  /** Public path, e.g. `/images/projects/<slug>/cover.jpg`. */
  cover?: string;
  /** Optional brand mark for homepage card (preferred over full screenshots). */
  logo?: string;
  /** Optional product stills for homepage card preview. */
  previews?: string[];
  /** Short outcome lines shown on the homepage card. */
  metrics?: string[];
  liveUrl?: string;
  codeUrl?: string;
  /** Public demo account for the live app (optional). */
  demoLogin?: {
    email: string;
    password: string;
    note?: string;
  };
  overview?: string[];
  highlights?: string[];
  sections?: ProjectSection[];
};

export const PROJECTS_BASE_PATH = "/projects";

export function projectPath(slug: string) {
  return `${PROJECTS_BASE_PATH}/${slug}`;
}

export function projectCoverPath(slug: string, file = "cover.jpg") {
  return `/images/projects/${slug}/${file}`;
}

export function hasCaseStudy(project: Project) {
  return project.caseStudy !== false;
}
