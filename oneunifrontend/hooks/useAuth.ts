"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, getDashboardPathByRole, Role, User } from "@/lib/api/auth";

interface UseAuthGuardResult {
  currentUser: User | null;
  isChecking: boolean;
}

export function useAuthGuard(requiredRole?: Role): UseAuthGuardResult {
  const router = useRouter();
  const [currentUser] = useState<User | null>(() => getCurrentUser());
  const isAuthorized =
    !!currentUser && (!requiredRole || currentUser.role === requiredRole);

  useEffect(() => {
    if (!isAuthorized) {
      router.replace("/login");
    }
  }, [isAuthorized, router]);

  return { currentUser: isAuthorized ? currentUser : null, isChecking: false };
}

export function redirectToRoleHome(user: User, router: ReturnType<typeof useRouter>) {
  router.replace(getDashboardPathByRole(user.role));
}
