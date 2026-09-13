import { EDUCATION, EXPERIENCE, SITE } from "@/lib/site";
import type { ChatMessage } from "../types";

export const CHAT_SUGGESTIONS = [
  "Is Barber SaaS live?",
  "Can he ship a Nest API?",
  "Is he open to hire?",
  "How do I reach him?",
] as const;

export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: `Hi — ask anything quick about ${SITE.name}'s work, stack, or how to hire him. I’ll keep it short.`,
};

export function cannedReply(question: string): string {
  const q = question.toLowerCase();

  if (
    q.includes("available") ||
    q.includes("hire") ||
    q.includes("open to") ||
    q.includes("looking")
  ) {
    return SITE.available
      ? `${SITE.name} is ${SITE.availableLabel.toLowerCase()} — ${SITE.lookingFor} Based in ${SITE.location}; open to remote, hybrid, or on-site.`
      : `${SITE.name} is not taking new work right now. You can still reach him through the contact form.`;
  }

  if (
    q.includes("barber") ||
    q.includes("barbr") ||
    q.includes("saas") ||
    (q.includes("live") && (q.includes("product") || q.includes("app") || q.includes("demo")))
  ) {
    return `Yes — Barber SaaS is live at https://app.barbr.space/ with 7 active salon clients. Schedule rules block bookings on unavailable hours. Demo login is on the Projects section.`;
  }

  if (
    q.includes("nest") ||
    q.includes("api") ||
    q.includes("backend") ||
    q.includes("prisma") ||
    q.includes("postgres")
  ) {
    return `Yes. He ships NestJS/Node APIs with Prisma and PostgreSQL, plus auth, Docker, and Nginx on a VPS — see Barber SaaS and his freelance roles.`;
  }

  if (
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("tools") ||
    q.includes("skill")
  ) {
    const byRole = EXPERIENCE.map((entry) => {
      const skills = [
        ...new Set(
          entry.bullets.flatMap((bullet) =>
            [...bullet.matchAll(/\*\*(.+?)\*\*/g)].map((m) => m[1]),
          ),
        ),
      ];
      return `${entry.role} @ ${entry.company}: ${skills.join(", ")}`;
    });
    return `He picks tools per role — not a separate stack list:\n\n${byRole.join("\n")}`;
  }

  if (
    q.includes("work") ||
    q.includes("experience") ||
    q.includes("job") ||
    q.includes("tetrix") ||
    q.includes("revelop") ||
    q.includes("intermedia") ||
    q.includes("freelance") ||
    q.includes("role")
  ) {
    const lines = EXPERIENCE.map(
      (entry) =>
        `${entry.role} · ${entry.company} (${entry.range})${entry.current ? " — current" : ""}`,
    );
    return `Recent roles:\n\n${lines.join("\n")}`;
  }

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("phone") ||
    q.includes("linkedin") ||
    q.includes("github")
  ) {
    return `Email ${SITE.contact.email} or use the contact form on this page. LinkedIn and GitHub are linked in the header/footer.`;
  }

  if (
    q.includes("where") ||
    q.includes("location") ||
    q.includes("tirana") ||
    q.includes("based")
  ) {
    return `${SITE.name} is based in ${SITE.location}.`;
  }

  if (
    q.includes("educat") ||
    q.includes("universit") ||
    q.includes("degree") ||
    q.includes("school") ||
    q.includes("study")
  ) {
    return `${EDUCATION.degree} at ${EDUCATION.school} (${EDUCATION.when}).`;
  }

  if (q.includes("who") || q.includes("about") || q.includes("fabian")) {
    return `${SITE.name} — ${SITE.role}. ${SITE.intro}`;
  }

  return `I can cover ${SITE.name}'s roles, skills, Barber SaaS, education, and contact. Try one of the prompts below.`;
}
