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
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

export const EXPERIENCE = [
  {
    range: "Oct 2025 — Present",
    role: "Frontend Developer",
    company: "Tetrix",
    current: true,
    bullets: [
      "Build and optimize responsive apps with React, Vite, TypeScript, Tailwind, and Shadcn/UI.",
      "Manage state with Redux Toolkit; integrate REST APIs, payments, and AI-driven features.",
      "Deploy and maintain frontend services with a focus on scale and reliability.",
    ],
  },
  {
    range: "Jan 2025 — Present",
    role: "Software Developer",
    company: "Freelance",
    current: true,
    bullets: [
      "Full-stack apps on Next.js 15, React 19, Node.js, PostgreSQL, and Prisma.",
      "Auth with NextAuth, forms with React Hook Form, payments via PayPal and Stripe.",
      "Code quality enforced with ESLint, Jest, and Git, following Agile practice.",
    ],
  },
  {
    range: "Jul 2024 — Oct 2025",
    role: "QA Engineer",
    company: "Revelop",
    current: false,
    bullets: [
      "Manual and automated testing with Selenium, PyTest, and unit test suites.",
      "System, regression, and API testing conducted through Postman.",
      "Tracked defects in Jira and worked directly with developers to resolve them.",
    ],
  },
  {
    range: "Sep 2022 — Jan 2023",
    role: "Frontend Developer",
    company: "Intermedia.al",
    current: false,
    bullets: [
      "Responsive web apps with React, Next.js, TypeScript, and Tailwind CSS.",
      "Backend integration plus performance and SEO optimization in an Agile team.",
    ],
  },
  {
    range: "Jun 2022 — Aug 2022",
    role: "WordPress Developer",
    company: "Intermedia.al",
    current: false,
    bullets: [
      "Custom WordPress themes and plugins with WooCommerce and third-party APIs.",
      "SEO, responsive design, troubleshooting, and UX improvements.",
    ],
  },
] as const;

export const STACK = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C++"],
  },
  {
    label: "Frontend",
    items: [
      "React 19",
      "Next.js 15",
      "Vite",
      "Tailwind CSS",
      "ShadCN UI",
      "Redux",
      "React Hook Form",
      "Recharts",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "MongoDB", "Prisma", "Zod", "NextAuth"],
  },
  {
    label: "Testing",
    items: ["Jest", "Selenium", "PyTest", "Postman", "Jira"],
  },
  {
    label: "Cloud",
    items: ["AWS Cognito", "AWS Lambda", "AWS Amplify", "AWS S3"],
  },
  {
    label: "Tools",
    items: ["Git", "Figma", "Uploadthing"],
  },
  {
    label: "Payments",
    items: ["Stripe", "PayPal"],
  },
] as const;

export const EDUCATION = {
  degree: "BSc in Computer Science",
  school: "University of Tirana — Faculty of Natural Sciences",
  when: "Oct 2021 — Jul 2024",
  body: "Coursework centered on software development, algorithms, database management, and system architecture — the foundation for the full-stack and QA work above.",
} as const;

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
