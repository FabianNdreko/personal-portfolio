import type { Project } from "../types";
import { barberSaas } from "./barber-saas";

/**
 * How to add a project
 * 1. Create `features/projects/data/<slug>.ts` exporting a `Project`.
 * 2. Import it here and append to `projects` (this order is the homepage order).
 * 3. Optional cover: `public/images/projects/<slug>/cover.jpg`.
 * The route `/projects/<slug>` is generated from the slug — no new page file.
 */
export const projects: Project[] = [barberSaas];
