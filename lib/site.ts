export const SITE = {
  name: "Fabian Ndreko",
  handle: "fabian@ndreko",
  repoPath: "fabian-ndreko / portfolio",
  role: "Software Developer — Frontend / Backend / QA",
  shortRole: "Frontend, Backend & QA",
  roleDetail:
    "React/Next UI, real APIs and SQL, and the QA habit of catching edge cases before users do.",
  location: "Tirana, Albania",
  locationShort: "Tirana, AL · UTC+2",
  available: true,
  availableLabel: "Open to work",
  availabilityDetail:
    "Contract or full-time · remote, hybrid, or on-site from Tirana.",
  lookingFor:
    "A product team that wants one owner for UI, API, and the quality bar.",
  statusStack: "TypeScript · Next.js 15 · React 19",
  headline: "A frontend Dev who also knows how to join tables",
  subline:
    "Interfaces people use — plus the APIs, data, and checks that keep them honest.",
  intro:
    "Production UI by day, full-stack SaaS on the side. QA taught me to ship like someone will try to break it.",
  aboutTitle: "How I build",
  about: [
    "I began in frontend with React and TypeScript, then worked in QA building Selenium suites, API checks, and regression coverage. That experience shaped how I ship: I design for contracts, fixtures, and failure modes — not only for what looks correct on screen.",
    "I now work full-stack end to end: typed APIs, Prisma on PostgreSQL, authentication, Dockerized services behind Nginx on a VPS, and React/Next interfaces connected to real backends. Side projects are where I validate new parts of that stack under production-like constraints.",
  ],
  social: {
    github: "https://github.com/FabianNdreko",
    linkedin: "https://www.linkedin.com/in/fabian-ndreko-415259234",
    site: "https://fabianndrekogithub.github.io/PersonalWebPage/",
  },
  contact: {
    email: "ndrekof@gmail.com",
    phone: "+355 67 243 0872",
    phoneHref: "tel:+355672430872",
  },
  portrait: "/images/fabian.jpg",
} as const;

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

/** Wrap skills in **like this** — ExperienceSection renders them highlighted. */
export const EXPERIENCE = [
  {
    range: "Oct 2025 — Present",
    role: "Frontend Developer",
    company: "Tetrix",
    current: true,
    bullets: [
      "Ship production screens in **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI** — Figma to deploy.",
      "Own client state with **Redux Toolkit** / **Zustand**; wire UI to **REST APIs**, payments, and **AI features**.",
      "Keep releases boring: cloud deploys, regression passes, and UX fixes when production talks back.",
    ],
  },
  {
    range: "Jan 2025 — Present",
    role: "Software Developer",
    company: "Freelance",
    current: true,
    bullets: [
      "Deliver client products with **Next.js 15**, **React 19**, **TypeScript**, **Node.js**, **PostgreSQL**, **Prisma**, and **REST APIs**.",
      "Auth (**NextAuth**), forms, payments (**PayPal** / **Stripe**), and charts when the product needs them.",
      "Production on **VPS**: **Docker**, **Nginx**, SSL — plus **ESLint** / **Jest** in **Agile** delivery.",
    ],
  },
  {
    range: "Jul 2024 — Oct 2025",
    role: "QA Engineer",
    company: "Revelop",
    current: false,
    bullets: [
      "Automated coverage with **Selenium** (**Python**), **PyTest**, and unit tests — caught breaks before users did.",
      "System, regression, and **API testing** in **Postman**; defects tracked in **Jira** with enough detail to fix once.",
    ],
  },
  {
    range: "Jun 2022 — Jan 2023",
    role: "Frontend Developer",
    company: "Intermedia.al",
    current: false,
    bullets: [
      "Shipped responsive apps in **React**, **Next.js**, **TypeScript**, and **Tailwind CSS**; hooked UI to backends and tightened **SEO** and performance in an **Agile** team.",
      "Earlier there: custom **WordPress** themes and plugins with **WooCommerce** and third-party APIs — layouts, performance, and conversion-blocking UX fixes.",
    ],
  },
] as const;

export const EDUCATION = {
  degree: "BSc in Computer Science",
  school: "University of Tirana — Faculty of Natural Sciences",
  when: "Oct 2021 — Jul 2024",
  body: "Algorithms, software design, and systems — with coursework in **JavaScript**, **Java**, **PHP**, **C++**, **SQL**, and **MongoDB** that still shows up in how I model data.",
} as const;

/** Strip **skill** markers for plain-text contexts (chat, etc.). */
export function plainBullet(bullet: string): string {
  return bullet.replace(/\*\*(.+?)\*\*/g, "$1");
}

/** Unique skills pulled from experience and education highlights. */
export function skillsFromExperience(): string[] {
  const skills: string[] = [];
  const seen = new Set<string>();

  const collect = (text: string) => {
    for (const match of text.matchAll(/\*\*(.+?)\*\*/g)) {
      const skill = match[1];
      if (!seen.has(skill)) {
        seen.add(skill);
        skills.push(skill);
      }
    }
  };

  for (const entry of EXPERIENCE) {
    for (const bullet of entry.bullets) {
      collect(bullet);
    }
  }
  collect(EDUCATION.body);

  return skills;
}

export const CONTACT_LINKS = [
  {
    label: "Email",
    value: "ndrekof@gmail.com",
    href: "mailto:ndrekof@gmail.com",
  },
  {
    label: "Phone",
    value: "+355 67 243 0872",
    href: "tel:+355672430872",
  },
  {
    label: "GitHub",
    value: "FabianNdreko",
    href: "https://github.com/FabianNdreko",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "fabian-ndreko",
    href: "https://www.linkedin.com/in/fabian-ndreko-415259234",
    external: true,
  },
] as const;
