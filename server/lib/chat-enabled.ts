/** Chat kill switch. Default ON when unset. Set CHAT_ENABLED=false to disable. */
export function isChatEnabled() {
  const raw = process.env.CHAT_ENABLED?.trim().toLowerCase();
  if (!raw) return true;
  return raw !== "false" && raw !== "0" && raw !== "off" && raw !== "no";
}
