"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { getDashboardPathByRole, getMe } from "@/lib/api/auth";

export default function RedirectingPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndRedirect = async () => {
      try {
        const user = await getMe();
        
        // Add a small delay for smoother UX so the loading screen doesn't just flash
        await new Promise(resolve => setTimeout(resolve, 800));

        router.push(getDashboardPathByRole(user.role));
      } catch (err) {
        console.error("Redirect logic error:", err);
        setError("Failed to verify identity. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    fetchUserAndRedirect();
  }, [router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        {!error ? (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-xl font-semibold text-text-main">
                Redirecting...
              </h2>
              <p className="text-sm text-text-muted">
                Taking you to your dashboard
              </p>
            </div>
          </>
        ) : (
          <div className="text-red-500 font-medium text-center px-4">
            {error}
          </div>
        )}
      </motion.div>
    </div>
  );
}
