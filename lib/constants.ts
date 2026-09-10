import { SITE } from "./site";

export const SITE_NAME = SITE.name;

/** Hash nav used by the single-page portfolio shell. */
export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;
