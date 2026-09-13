import type { Project } from "../types";

export const barberSaas: Project = {
  slug: "barber-saas",
  title: "Barber SaaS",
  summary:
    "Salon owners run staff, pricing, and bookings from one panel — instead of WhatsApp threads and double-booked calendars.",
  pitch: "Live product I built and operate end to end.",
  metrics: [
    "7 active salon clients",
    "No bookings on unavailable hours",
  ],
  role: "Full-stack",
  year: 2026,
  tags: [
    "NestJS",
    "Prisma",
    "PostgreSQL",
    "React",
    "Vite",
    "Docker",
    "Cloudflare",
    "Nginx",
    "VPS",
  ],
  liveUrl: "https://app.barbr.space/",
  logo: "/images/projects/barber-saas/mark.png",
  cover: "/images/projects/barber-saas/preview.png",
  previews: [
    "/images/projects/barber-saas/preview.png",
    "/images/projects/barber-saas/reports.png",
  ],
  demoLogin: {
    email: "test1@example.com",
    password: "Password123#",
    note: "Demo salon — try the live app without registering.",
  },
  overview: [
    "Owner-facing B2B panel for one salon: reports home, barbers, services, clients, and a conflict-aware booking calendar.",
    "Each barber owns duration, price, hours, and time off. The calendar and API enforce those rules so unavailable slots can’t be booked.",
  ],
  highlights: [
    "7 active salon clients on the live product.",
    "Schedule rules block bookings on unavailable hours.",
    "Reports dashboard with KPIs and attention items as the home screen.",
    "Per-barber services, pricing, hours, and time off.",
    "Drag-to-book day calendar with overlap checks.",
    "NestJS + Prisma + PostgreSQL with JWT and salon-scoped access.",
    "React/Vite on Cloudflare; API and Postgres in Docker behind Nginx on a VPS.",
  ],
  sections: [
    {
      title: "Problem",
      body: "Shops ran on WhatsApp and notebooks — double bookings, unclear availability, and no shared view of performance. The same service needed different times and prices per barber.",
    },
    {
      title: "Build",
      body: "Owner MVP: NestJS API, React panel, per-barber overrides, and conflict-safe bookings (app rules + DB constraints). Frontend on Cloudflare; API and database Dockerized on a VPS with Nginx/SSL.",
    },
    {
      title: "Outcome",
      body: "Live at app.barbr.space with 7 salon clients. Owners staff, book, and report in one place — and unavailable hours no longer accept appointments.",
    },
  ],
};
