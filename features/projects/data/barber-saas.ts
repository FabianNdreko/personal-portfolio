import type { Project } from "../types";

export const barberSaas: Project = {
  slug: "barber-saas",
  title: "Barber SaaS",
  summary:
    "Full-stack salon panel with a reports dashboard, per-barber service pricing and duration, customizable hours and time off, clients, and a drag-to-book calendar — one account, one salon.",
  role: "Full-stack",
  year: 2026,
  tags: [
    "NestJS",
    "Prisma",
    "PostgreSQL",
    "Docker",
    "React",
    "Vite",
    "Cloudflare",
    "Nginx",
    "VPS",
  ],
  liveUrl: "https://app.barbr.space/",
  cover: "/images/barbrimg.png",
  demoLogin: {
    email: "test1@example.com",
    password: "Password123#",
    note: "Demo salon account — try the live app without registering.",
  },
  overview: [
    "Barber SaaS is a B2B operations panel for barbershop owners in Albania and Kosovo. Register creates the owner and salon together; after login there is no salon picker — one account maps to one shop.",
    "The home screen is a reports dashboard: KPIs, volume and status charts, open bookings, attention items, and top services. From there owners manage barbers, a salon service catalog, clients, and day-to-day bookings.",
    "Each barber gets a personalized setup: which services they offer, with their own duration and price in lek, plus fully customizable weekly working hours and time-off / break ranges. The day calendar respects those rules when booking.",
    "It is not a public customer booking marketplace. The product is the staff/admin UI plus a multi-tenant NestJS API with JWT auth, tenant isolation, and concurrency-safe bookings. Live at app.barbr.space: frontend on Cloudflare; backend and database containerized with Docker on an Ubuntu VPS, fronted by Nginx.",
  ],
  highlights: [
    "Reports dashboard as the app home: date ranges, KPIs, volume/status charts, open and attention lists, top services, barber breakdown.",
    "Per-barber service catalog: each barber chooses which services they offer and sets their own duration and price (lek).",
    "Per-barber schedule: customizable weekly working hours plus fully customizable time-off and break ranges.",
    "NestJS 11 API with Prisma and PostgreSQL: auth, salons, barbers, services, schedule, clients, bookings, reports.",
    "Secure sessions: memory-only access token, httpOnly refresh cookie, rate-limited auth, salon-scoped access checks.",
    "Bookings with working-hours and time-off validation, anti-overlap constraints, and Serializable transactions for race conditions.",
    "React 19 + Vite panel with Feature-Sliced layout, TanStack Query, and a custom drag-to-select day calendar.",
    "Dockerized backend on Ubuntu VPS: API and PostgreSQL run in Docker; Nginx reverse proxy with SSL routes traffic to NestJS.",
    "Frontend hosted on Cloudflare (static Vite build) talking to the VPS API.",
  ],
  sections: [
    {
      title: "Problem",
      body: "Salon owners often juggle WhatsApp messages, paper notebooks, and shared calendars. Double-bookings, unclear who is free, and no simple view of revenue or no-shows are common. Different barbers also charge different times and prices for the same service — a one-size catalog is not enough. They need a focused owner panel with a real dashboard, not a generic CRM or a consumer booking site.",
    },
    {
      title: "Approach",
      body: "Split into barber-saas-api (NestJS modular monolith, Prisma, PostgreSQL, Swagger) and barber-saas-frontend (React + Vite, Tailwind, shadcn, brass-and-ink design system). Salon-level services stay in a shared catalog; BarberService overrides let each barber customize duration and price. Schedule is per barber: weekly hours plus arbitrary time-off windows. Auth is owner-only for the MVP. Booking conflicts are blocked in app logic and at the database with an exclusion constraint. The calendar is custom-built for snap, drag, resize, and status workflows. Reports power the dashboard home. Production hosting: frontend on Cloudflare; on the Ubuntu VPS the API and Postgres run in Docker containers, with Nginx terminating TLS and reverse-proxying to NestJS.",
    },
    {
      title: "Outcome",
      body: "A live MVP at app.barbr.space where an owner can open a reports dashboard, staff the floor, assign per-barber services with custom time and price, set hours and time off, book walk-ins or known clients, update statuses, and track salon performance. Deployed with Docker on a VPS plus Cloudflare for the UI. Strong foundations for concurrency and sessions; next steps would be staff roles, public booking, and notifications.",
    },
  ],
};
