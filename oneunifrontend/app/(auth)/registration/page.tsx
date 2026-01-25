"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Content from "@/components/sections/(Auth)/content-section";
import RegistrationForm from "@/components/forms/RegistrationForm";
import Button from "@/components/ui/button";
import { register } from "@/lib/api/auth";
import type { Role } from "@/lib/api/auth";

export default function RegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "" as Role | "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRoleSelect = (role: Role | "") => {
    setFormData((prev) => ({ ...prev, role }));
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.role) newErrors.role = "Please select your role";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role as Role,
      });
      // Redirect to redirecting screen on success
      router.push("/redirecting");
    } catch (error: any) {
      if (error.message.includes("exists")) {
        setErrors((prev) => ({ ...prev, email: "User already exists" }));
      } else {
        // General error handling - validation errors could be mapped here if backend returns them
        console.error("Registration error:", error);
        // For now, show a generic error or toast - since no global toast is set up in this context, 
        // I'll set a form-level error or just log it. 
        // Ideally we'd use the toast component from components/ui/toast
        // checking imports... I see toast.tsx in components/ui.
        // I will just use a generic alert or error state if I can't easily access toast context.
        // But the requirements said "Inline validation errors".
        // I'll set a generic error on the email field or a general error state if suitable.
        // Actually, let's just assume inline errors are sufficient for specific fields.
        // If it's a 500, maybe alerting is fine for MVP.
         setErrors((prev) => ({ ...prev, root: error.message || "Something went wrong" }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      <Content />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white w-full min-h-screen">
        <div className="flex flex-col gap-[32px] w-full max-w-[480px]">
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <RegistrationForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onRoleSelect={handleRoleSelect as any}
            />
            {errors.root && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {errors.root}
              </div>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full h-[52px] text-[16px]"
              iconRight={!isLoading ? <ChevronRight size={20} /> : undefined}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center gap-[8px] w-full pt-[8px]">
            <p className="text-[14px] text-text-muted">
              Already have an account?
            </p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-medium text-[14px] text-primary hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
