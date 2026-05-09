"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Content from "@/components/sections/(Auth)/content-section";
import LoginForm from "@/components/forms/LoginForm";
import { motion } from "framer-motion";
import { getCurrentUser, getDashboardPathByRole, login } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      router.replace(getDashboardPathByRole(user.role));
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
        });
        router.push(getDashboardPathByRole(response.user.role));
      } catch (error: any) {
        console.error("Login error:", error);
        setErrors({
          root:
            error?.message?.toLowerCase().includes("invalid")
              ? "Invalid email or password"
              : error.message || "Login failed. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      <Content />
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white w-full min-h-screen"
      >
        <div className="w-full max-w-[440px] flex flex-col gap-4">
           {errors.root && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {errors.root}
              </div>
            )}
            <LoginForm 
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
        </div>
      </motion.div>
    </section>
  );
}
