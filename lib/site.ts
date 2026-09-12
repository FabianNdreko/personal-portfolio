export const SITE = {
  name: "Fabian Ndreko",
  handle: "fabian@ndreko",
  repoPath: "fabian-ndreko / portfolio",
  role: "Software Developer — Frontend / Backend / QA",
  shortRole: "Frontend, Backend & QA",
  location: "Tirana, Albania",
  locationShort: "Tirana, AL · UTC+2",
  available: true,
  availableLabel: "Available for work",
  statusStack: "TypeScript · Next.js 15 · React 19",
  headline: "I build software, then I break it on purpose.",
  subline:
    "Frontend interfaces, backend systems, and the QA discipline to keep both honest.",
  intro:
    "Currently shipping production frontend at Tetrix and full-stack freelance work with Next.js, React, and Node — with a QA background that means I write tests before someone else finds the bug.",
  about: [
    "I started on the frontend, moved into QA to see how software actually breaks in the hands of real users, and now build full-stack — carrying that testing instinct into every feature I ship.",
    "Outside of client and freelance work, I'm usually deep in a side project, trying out a new part of the stack, or reading through documentation I probably should have read sooner.",
  ],
  focus: [
    "Full-stack apps",
    "Clean APIs",
    "Tests that catch what reviewers miss",
  ],
  social: {
    github: "https://github.com/FabianNdrekoGitHub",
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
      "Built and optimized responsive web apps using **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Shadcn/UI**, with a focus on clean UI and performance.",
      "Implemented state management with **Redux Toolkit** and **Zustand**, and integrated **REST APIs**, payment systems, and **AI features**.",
      "Deployed and maintained frontend services on **cloud platforms**, prioritizing scalability, reliability, and UX.",
    ],
  },
  {
    range: "Jan 2025 — Present",
    role: "Software Developer",
    company: "Freelance",
    current: true,
    bullets: [
      "Built and deployed full-stack apps with **Next.js 15**, **React 19**, **TypeScript**, **Node.js**, **PostgreSQL**, **Prisma**, **Zod**, and **RESTful APIs**.",
      "Integrated **NextAuth**, **React Hook Form**, **PayPal**, **Stripe**, **AWS**, and **Uploadthing**, plus responsive UI with **Tailwind CSS**, **ShadCN UI**, and **Recharts**.",
      "Handled **VPS deployment**: installed and configured servers, containerized apps with **Docker**, and set up **Nginx** reverse proxies (SSL, routing, production hardening).",
      "Kept quality high with **ESLint**, **Jest**, and **Git**, working in **Agile** teams.",
    ],
  },
  {
    range: "Jul 2024 — Oct 2025",
    role: "QA Engineer",
    company: "Revelop",
    current: false,
    bullets: [
      "Ran manual and automated testing with **Selenium**, **PyTest**, and unit test suites.",
      "Covered system, regression, and **API testing** with **Postman**.",
      "Tracked defects in **Jira** and worked with developers to resolve them quickly.",
    ],
  },
  {
    range: "Sep 2022 — Jan 2023",
    role: "Frontend Developer",
    company: "Intermedia.al",
    current: false,
    bullets: [
      "Built responsive web apps with **React**, **Next.js**, **TypeScript**, and **Tailwind CSS**.",
      "Integrated backend services, improved performance and **SEO**, and collaborated in an **Agile** team.",
    ],
  },
  {
    range: "Jun 2022 — Aug 2022",
    role: "WordPress Developer",
    company: "Intermedia.al",
    current: false,
    bullets: [
      "Built and maintained custom **WordPress** themes and plugins with **WooCommerce** and third-party APIs.",
      "Handled **SEO**, responsive design, optimization, troubleshooting, and UX improvements.",
    ],
  },
] as const;

export const EDUCATION = {
  degree: "BSc in Computer Science",
  school: "University of Tirana — Faculty of Natural Sciences",
  when: "Oct 2021 — Jul 2024",
  body: "Coursework centered on software development, algorithms, database management, and system architecture — the foundation for the full-stack and QA work above.",
} as const;

/** Strip **skill** markers for plain-text contexts (chat, etc.). */
export function plainBullet(bullet: string): string {
  return bullet.replace(/\*\*(.+?)\*\*/g, "$1");
}

/** Unique skills pulled from experience bullet highlights. */
export function skillsFromExperience(): string[] {
  const skills: string[] = [];
  const seen = new Set<string>();
  for (const entry of EXPERIENCE) {
    for (const bullet of entry.bullets) {
      for (const match of bullet.matchAll(/\*\*(.+?)\*\*/g)) {
        const skill = match[1];
        if (!seen.has(skill)) {
          seen.add(skill);
          skills.push(skill);
        }
      }
    }
  }
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
    value: "FabianNdrekoGitHub",
    href: "https://github.com/FabianNdrekoGitHub",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "fabian-ndreko",
    href: "https://www.linkedin.com/in/fabian-ndreko-415259234",
    external: true,
  },
] as const;
