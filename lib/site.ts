export const SITE = {
  name: "Fabian Ndreko",
  handle: "fabian@ndreko",
  repoPath: "fabian-ndreko / portfolio",
  role: "Software Developer — Frontend / Backend / QA",
  location: "Tirana, AL · UTC+2",
  available: true,
  statusStack: "TypeScript · Next.js 15 · React 19",
  whoami: "fabian_ndreko — software developer, tirana/al",
  headline: "I build software, then I break it on purpose.",
  subline:
    "// frontend interfaces, backend systems, and the QA discipline to keep both honest",
  intro:
    "Currently shipping production frontend at Tetrix and full-stack freelance work with Next.js, React, and Node — with a QA background that means I write tests before someone else finds the bug.",
  about: [
    "I started on the frontend, moved into QA to see how software actually breaks in the hands of real users, and now build full-stack — carrying that testing instinct into every feature I ship.",
    "Outside of client and freelance work, I'm usually deep in a side project, trying out a new part of the stack, or reading through documentation I probably should have read sooner.",
  ],
  developerObject: {
    name: "Fabian Ndreko",
    role: "Frontend, Backend & QA",
    basedIn: "Tirana, Albania",
    focus: [
      "full-stack apps",
      "clean APIs",
      "tests that catch what reviewers miss",
    ],
    available: true,
  },
  social: {
    github: "https://github.com/FabianNdrekoGitHub",
    linkedin: "http://linkedin.com/in/fabian-ndreko-415259234",
    site: "https://fabianndrekogithub.github.io/PersonalWebPage/",
  },
  contact: {
    email: "ndrekof@gmail.com",
    phone: "+355 67 243 0872",
    phoneHref: "tel:+355672430872",
  },
} as const;

export const NAV_SECTIONS = [
  { id: "about", label: "about", ext: ".tsx" },
  { id: "experience", label: "experience", ext: ".log" },
  { id: "projects", label: "projects", ext: "/" },
  { id: "stack", label: "stack", ext: ".json" },
  { id: "education", label: "education", ext: ".md" },
  { id: "contact", label: "contact", ext: ".sh" },
] as const;

export const EXPERIENCE = [
  {
    range: "2025-10 → present",
    role: "Frontend Developer",
    company: "@ Tetrix",
    bullets: [
      "Build and optimize responsive apps with React, Vite, TypeScript, Tailwind, and Shadcn/UI.",
      "Manage state with Redux Toolkit; integrate REST APIs, payments, and AI-driven features.",
      "Deploy and maintain frontend services with a focus on scale and reliability.",
    ],
  },
  {
    range: "2025-01 → present",
    role: "Software Developer",
    company: "— Freelance",
    bullets: [
      "Full-stack apps on Next.js 15, React 19, Node.js, PostgreSQL, and Prisma.",
      "Auth with NextAuth, forms with React Hook Form, payments via PayPal and Stripe.",
      "Code quality enforced with ESLint, Jest, and Git, following Agile practice.",
    ],
  },
  {
    range: "2024-07 → 2025-10",
    role: "QA Engineer",
    company: "@ Revelop",
    bullets: [
      "Manual and automated testing with Selenium, PyTest, and unit test suites.",
      "System, regression, and API testing conducted through Postman.",
      "Tracked defects in Jira and worked directly with developers to resolve them.",
    ],
  },
  {
    range: "2022-09 → 2023-01",
    role: "Frontend Developer",
    company: "@ Intermedia.al",
    bullets: [
      "Responsive web apps with React, Next.js, TypeScript, and Tailwind CSS.",
      "Backend integration plus performance and SEO optimization in an Agile team.",
    ],
  },
  {
    range: "2022-06 → 2022-08",
    role: "WordPress Developer",
    company: "@ Intermedia.al",
    bullets: [
      "Custom WordPress themes and plugins with WooCommerce and third-party APIs.",
      "SEO, responsive design, troubleshooting, and UX improvements.",
    ],
  },
] as const;

export const STACK = {
  languages: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C++"],
  frontend: [
    "React 19",
    "Next.js 15",
    "Vite",
    "Tailwind CSS",
    "ShadCN UI",
    "Redux",
    "React Hook Form",
    "Recharts",
  ],
  backend: ["Node.js", "PostgreSQL", "MongoDB", "Prisma", "Zod", "NextAuth"],
  testing: ["Jest", "Selenium", "PyTest", "Postman", "Jira"],
  cloud: [
    "AWS Cognito",
    "AWS Lambda",
    "AWS Amplify",
    "AWS S3",
    "Git",
    "Figma",
    "Uploadthing",
  ],
  payments: ["Stripe", "PayPal"],
} as const;

export const EDUCATION = {
  degree: "BSc in Computer Science",
  school: "University of Tirana — Faculty of Natural Sciences",
  when: "Oct 2021 → Jul 2024",
  body: "Coursework centered on software development, algorithms, database management, and system architecture — the foundation for the full-stack and QA work above.",
} as const;

export const CONTACT_COMMANDS = [
  {
    cmd: "open --mail",
    value: "ndrekof@gmail.com",
    href: "mailto:ndrekof@gmail.com",
  },
  {
    cmd: "open --call",
    value: "+355 67 243 0872",
    href: "tel:+355672430872",
  },
  {
    cmd: "git clone",
    value: "github.com/FabianNdrekoGitHub",
    href: "https://github.com/FabianNdrekoGitHub",
    external: true,
  },
  {
    cmd: "open --linkedin",
    value: "/in/fabian-ndreko",
    href: "http://linkedin.com/in/fabian-ndreko-415259234",
    external: true,
  },
  {
    cmd: "curl",
    value: "fabianndrekogithub.github.io/PersonalWebPage",
    href: "https://fabianndrekogithub.github.io/PersonalWebPage/",
    external: true,
  },
] as const;
