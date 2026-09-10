import type { Project } from "./types";

/** Static placeholder — replace with DB/API via server/services later. */
export const projects: Project[] = [
  {
    slug: "portfolio-site",
    title: "Portfolio Site",
    summary: "Personal site built with Next.js.",
    description:
      "A scalable portfolio architecture with App Router, feature modules, and a BFF-ready backend layer.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    year: 2026,
  },
  {
    slug: "design-system",
    title: "Design System",
    summary: "Reusable UI primitives and tokens.",
    description:
      "Component library and design tokens used across product surfaces.",
    tags: ["UI", "Design"],
    year: 2025,
  },
  {
    slug: "api-platform",
    title: "API Platform",
    summary: "Backend services and integrations.",
    description:
      "API layer for content and integrations, ready to plug into this portfolio.",
    tags: ["API", "Node"],
    year: 2025,
  },
];
