"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GraduationCap, Briefcase, ChevronRight } from "lucide-react";
import Content from "@/components/sections/(Auth)/content-section";
import RoleSelector from "@/components/ui/role-selector";
import Button from "@/components/ui/button";

import type { Role } from "@/lib/api/auth";

export default function SelectRolePage() {
  const [role, setRole] = useState<Role | "">("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRoleSelect = (selectedRole: Role | "") => {
    setRole(selectedRole);
    setError("");
  };

  const handleNext = () => {
    if (!role) {
      setError("Please select a role to continue");
      return;
    }
    
    if (role === "student") {
      router.push("/onboarding/student");
    } else if (role === "mentor") {
      router.push("/onboarding/mentor");
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
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-bold text-3xl text-text-main tracking-tight">
                Choose your role
              </h2>
              <p className="text-[15px] text-text-muted mt-2 leading-relaxed">
                Select how you want to use the platform to get started.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6">
            <RoleSelector
              value={role}
              onChange={handleRoleSelect}
              error={error}
              label="Select your role"
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[13px] text-red-500"
              >
                {error}
              </motion.p>
            )}

            <Button
              onClick={handleNext}
              variant="primary"
              className="w-full h-[52px] text-[16px]"
              iconRight={<ChevronRight size={20} />}
            >
              Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}