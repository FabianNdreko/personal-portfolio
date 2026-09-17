/** Structured chat abuse / safety logs (Vercel / server logs). No message bodies. */

export function redactClientKey(ip: string) {
  if (!ip || ip === "local") return "local";

  const v4 = ip.split(".");
  if (v4.length === 4) {
    return `${v4[0]}.${v4[1]}.${v4[2]}.x`;
  }

  // IPv6: keep a short prefix only
  return `${ip.slice(0, 16)}…`;
}

export function logChatEvent(
  event: string,
  details: Record<string, string | number | boolean | undefined> = {},
) {
  console.warn(
    JSON.stringify({
      scope: "chat",
      event,
      ...details,
      at: new Date().toISOString(),
    }),
  );
}
