export type Role = "student" | "mentor";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

const SEEDED_USERS: StoredUser[] = [
  {
    name: "Student User",
    email: "student@oneuni.com",
    password: "password123",
    role: "student",
  },
  {
    name: "Mentor User",
    email: "mentor@oneuni.com",
    password: "password123",
    role: "mentor",
  },
];

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
}

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function readUsers(): StoredUser[] {
  if (!canUseStorage()) return SEEDED_USERS;
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublicUser(user: StoredUser): User {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function ensureSeedUsers() {
  if (!canUseStorage()) return;
  const existing = localStorage.getItem(USERS_KEY);
  if (!existing) {
    writeUsers(SEEDED_USERS);
  }
}

export function getCurrentUser(): User | null {
  if (!canUseStorage()) return null;
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as User;
    if (!parsed?.email || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User) {
  if (!canUseStorage()) return;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getDashboardPathByRole(role: Role): string {
  return role === "mentor" ? "/mentor" : "/student";
}

export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  ensureSeedUsers();
  const users = readUsers();
  const normalizedEmail = normalizeEmail(payload.email);
  const emailExists = users.some((user) => normalizeEmail(user.email) === normalizedEmail);

  if (emailExists) {
    throw new Error("User already exists");
  }

  const newUser: StoredUser = {
    name: payload.fullName.trim(),
    email: normalizedEmail,
    password: payload.password,
    role: payload.role,
  };

  writeUsers([...users, newUser]);

  const publicUser = toPublicUser(newUser);
  setCurrentUser(publicUser);
  return { user: publicUser };
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  ensureSeedUsers();
  const users = readUsers();
  const normalizedEmail = normalizeEmail(payload.email);
  const matched = users.find(
    (user) =>
      normalizeEmail(user.email) === normalizedEmail && user.password === payload.password
  );

  if (!matched) {
    throw new Error("Invalid email or password");
  }

  const publicUser = toPublicUser(matched);
  setCurrentUser(publicUser);
  return { user: publicUser };
}

export async function logout(): Promise<void> {
  if (!canUseStorage()) return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export async function getMe(): Promise<User> {
  ensureSeedUsers();
  const user = getCurrentUser();
  if (!user) {
    throw new Error("No authenticated user");
  }
  return user;
}
