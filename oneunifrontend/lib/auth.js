import { mentors, students } from "@/lib/mockData";

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("currentUser");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.email || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getUserProfile() {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  const email = String(currentUser.email).toLowerCase();
  if (currentUser.role === "student") {
    return students.find((student) => student.email.toLowerCase() === email) || null;
  }
  if (currentUser.role === "mentor") {
    return mentors.find((mentor) => mentor.email.toLowerCase() === email) || null;
  }
  return null;
}

export function isStudent() {
  return getCurrentUser()?.role === "student";
}

export function isMentor() {
  return getCurrentUser()?.role === "mentor";
}
