import type { Project } from "../types";

export const bookingPlatform: Project = {
  slug: "booking-platform",
  title: "Client Booking Platform",
  summary:
    "Full-stack booking app with authentication, scheduling, and payments for a small service business.",
  role: "Full-stack",
  year: 2024,
  tags: ["NextAuth", "PostgreSQL", "PayPal", "Tailwind"],
  overview: [
    "A booking app for a small service business: customers pick a slot, pay, and get a confirmation; staff see the calendar without a spreadsheet.",
    "Replace this overview with the client, the booking rules, and what had to be true on day one.",
  ],
  highlights: [
    "Auth with NextAuth and a PostgreSQL source of truth.",
    "Scheduling that respects working hours and existing bookings.",
    "PayPal checkout on confirmed slots.",
  ],
  sections: [
    {
      title: "Problem",
      body: "Bookings arrived over chat and were copied into a calendar by hand. Replace with the actual workflow.",
    },
    {
      title: "Approach",
      body: "Next.js app, Postgres for slots and customers, PayPal for payment. Replace with the constraints you designed around.",
    },
    {
      title: "Outcome",
      body: "Customers book without a back-and-forth. Replace with what shipped and what you would change.",
    },
  ],
};
