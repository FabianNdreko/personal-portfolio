import type { Project } from "../types";

export const commerceDashboard: Project = {
  slug: "commerce-dashboard",
  title: "Commerce Dashboard",
  summary:
    "Admin dashboard for tracking orders, revenue, and inventory, with charted reporting and role-based access.",
  role: "Full-stack",
  year: 2025,
  tags: ["Next.js", "Prisma", "Stripe", "Recharts"],
  overview: [
    "An admin surface for a small commerce team: orders, inventory, and revenue in one place, with role-based access so operators and managers see the right depth of data.",
    "Replace this overview with the real problem, the users, and what shipped.",
  ],
  highlights: [
    "Order, revenue, and inventory views with charted reporting.",
    "Role-based access for operators and managers.",
    "Stripe-backed payment status reflected in the dashboard.",
  ],
  sections: [
    {
      title: "Problem",
      body: "Staff were jumping between spreadsheets and the storefront admin to answer basic questions about stock and sales. Replace with the actual constraint.",
    },
    {
      title: "Approach",
      body: "Next.js app on Prisma, charts with Recharts, payments via Stripe. Replace with the architecture and trade-offs you actually made.",
    },
    {
      title: "Outcome",
      body: "A single dashboard for day-to-day operations. Replace with results — speed, adoption, or what you would do next.",
    },
  ],
};
