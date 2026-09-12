import { EDUCATION, EXPERIENCE, SITE } from "@/lib/site";
import type { ChatMessage } from "../types";

export const CHAT_SUGGESTIONS = [
  "Is he available?",
  "What tech does he use?",
  "Where has he worked?",
  "How do I reach him?",
] as const;

export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: `Hi — I can walk you through ${SITE.name}'s work, the tech he uses on the job, and how to get in touch. What do you want to know?`,
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
      ? `${SITE.name} is ${SITE.availableLabel.toLowerCase()}, based in ${SITE.location}. Frontend, backend, or QA — locally or remote.`
      : `${SITE.name} is not taking new work right now. You can still reach him through the contact form.`;
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
    return `Email ${SITE.contact.email} or use the form on this page. LinkedIn and GitHub are in the sidebar too.`;
  }

  if (
    q.includes("where") ||
    q.includes("location") ||
    q.includes("tirana") ||
    q.includes("based") ||
    q.includes("live")
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

  return `I only know ${SITE.name}'s profile: roles, skills from experience, education, and contact. Try a prompt below — live answers from his CV come next.`;
}
