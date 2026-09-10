import type { Project } from "./types";

/** Static placeholder — replace with DB/API via server/services later. */
export const projects: Project[] = [
  {
    slug: "commerce-dashboard",
    title: "Commerce Dashboard",
    summary:
      "Admin dashboard for tracking orders, revenue, and inventory, with charted reporting and role-based access.",
    description:
      "Admin dashboard for tracking orders, revenue, and inventory, with charted reporting and role-based access. — replace with your own project summary.",
    tags: ["Next.js", "Prisma", "Stripe", "Recharts"],
    year: 2025,
    imageCaption: "commerce-dashboard.png",
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    slug: "qa-automation-suite",
    title: "Automated QA Suite",
    summary:
      "Regression and API test suite covering critical user flows, wired into CI with defect tracking.",
    description:
      "Regression and API test suite covering critical user flows, wired into CI with defect tracking. — replace with your own project summary.",
    tags: ["Selenium", "PyTest", "Postman", "Jira"],
    year: 2025,
    imageCaption: "qa-automation-suite.png",
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    slug: "booking-platform",
    title: "Client Booking Platform",
    summary:
      "Full-stack booking app with authentication, scheduling, and payments for a small service business.",
    description:
      "Full-stack booking app with authentication, scheduling, and payments for a small service business. — replace with your own project summary.",
    tags: ["NextAuth", "PostgreSQL", "PayPal", "Tailwind"],
    year: 2024,
    imageCaption: "booking-platform.png",
    liveUrl: "#",
    codeUrl: "#",
  },
];
