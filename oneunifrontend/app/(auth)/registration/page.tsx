"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
      router.push("/redirecting");
    } catch (error: any) {
      if (error.message.includes("exists")) {
        setErrors((prev) => ({ ...prev, email: "User already exists" }));
      } else {
        setErrors((prev) => ({ ...prev, root: error.message || "Something went wrong" }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Section: Information/Branding */}
      <Content />

      {/* Right Section: Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-15 overflow-y-auto">
        <div className="w-full max-w-md flex flex-col gap-0">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <RegistrationForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onRoleSelect={handleRoleSelect as any}
            />
            
            {errors.root && (
              <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.root}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full h-14 text-base font-semibold transition-all duration-200"
              iconRight={!isLoading ? <ChevronRight size={20} /> : undefined}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
            <p className="text-sm text-text-muted">
              Already have an account?
            </p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-semibold text-sm text-primary hover:text-brand-blue-dark transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
