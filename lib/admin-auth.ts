export const ADMIN_PIN =
  process.env.NEXT_PUBLIC_ADMIN_PIN ?? "452958";

export const ADMIN_SESSION_KEY = "royal-specs-admin-session";

export function verifyAdminPin(pin: string) {
  return pin === ADMIN_PIN;
}

export function isAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
}

export function setAdminSession(active: boolean) {
  if (typeof window === "undefined") return;
  if (active) sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
  else sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
