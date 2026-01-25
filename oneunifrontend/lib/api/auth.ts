import { env } from '@/lib/config/env';
import { ENDPOINTS } from '@/lib/api/endpoint';

// ============ Types ============

export type Role = 'student' | 'mentor' | 'university_representative';

const ROLE_TO_ID: Record<Role, number> = {
  student: 0,
  mentor: 1,
  university_representative: 2,
};

const ID_TO_ROLE: Record<number, Role> = {
  0: 'student',
  1: 'mentor',
  2: 'university_representative',
};

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

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
}

interface ApiUser {
  id: string;
  email: string;
  name?: string;
  role: number;
}

export interface AuthResponse {
  user: User;
  expiresAt: string;
}

interface ApiAuthResponse {
  user: ApiUser;
  expiresAt: string;
}

export interface CompleteSignupPayload {
  role: Role;
}

// ============ Helpers ============

function mapApiUserToUser(apiUser: ApiUser): User {
  return {
    ...apiUser,
    role: ID_TO_ROLE[apiUser.role] || 'student', // Fallback to student
  };
}

// Client-side helper to read cookie if needed, but usually browser handles it.
// However, typically XSRF token needs to be read from cookie and sent in header.
// I'll add a simple helper for that.
function getXsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// ============ API Functions ============

/**
 * Register a new user with email/password.
 */
export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  const apiPayload = {
    ...payload,
    role: ROLE_TO_ID[payload.role],
  };

  const response = await fetch(`${env.apiUrl}${ENDPOINTS.REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(apiPayload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(error.message || 'Registration failed');
  }

  const data: ApiAuthResponse = await response.json();
  return {
    ...data,
    user: mapApiUserToUser(data.user),
  };
}

/**
 * Login with email/password.
 */
export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Login failed');
  }

  const data: ApiAuthResponse = await response.json();
  return {
    ...data,
    user: mapApiUserToUser(data.user),
  };
}

/**
 * Refresh access token using refresh token.
 */
export async function refreshToken(): Promise<AuthResponse> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.REFRESH}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const data: ApiAuthResponse = await response.json();
  return {
    ...data,
    user: mapApiUserToUser(data.user),
  };
}

/**
 * Logout the current user.
 */
export async function logout(): Promise<void> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.LOGOUT}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}

/**
 * Get the current authenticated user.
 */
export async function getMe(): Promise<User> {
  const response = await fetch(`${env.apiUrl}${ENDPOINTS.ME}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-XSRF-TOKEN': getXsrfToken() || '',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to get user');
  }

  const data: ApiUser = await response.json();
  return mapApiUserToUser(data);
}

/**
 * Complete Google OAuth signup with role selection.
 */
export async function completeGoogleSignup(payload: CompleteSignupPayload): Promise<AuthResponse> {
  const apiPayload = {
    role: ROLE_TO_ID[payload.role],
  };

  const response = await fetch(`${env.apiUrl}${ENDPOINTS.GOOGLE_OAUTH_COMPLETE_SIGNUP}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(apiPayload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Signup completion failed' }));
    throw new Error(error.message || 'Signup completion failed');
  }

  const data: ApiAuthResponse = await response.json();
  return {
    ...data,
    user: mapApiUserToUser(data.user),
  };
}
