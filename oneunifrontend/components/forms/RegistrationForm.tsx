"use client";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Briefcase, Building2 } from "lucide-react";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import RoleSelector from "@/components/ui/role-selector";
import { getGoogleOAuthUrl } from "@/lib/auth/google-oauth";

type Role = "student" | "mentor" | "university_representative" | "";

type RegistrationFormProps = {
  formData: {
    fullName: string;
    email: string;
    role: Role;
    password?: string;
    confirmPassword?: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoleSelect: (role: Role) => void;
};

export default function RegistrationForm({
  formData,
  errors,
  onChange,
  onRoleSelect,
}: RegistrationFormProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-[24px]"
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-bold text-[28px] text-text-main">
          Create your account
        </h2>
      </div>

      <div className="flex flex-col gap-[20px]">
        {/* Full Name */}
        <Input
          name="fullName"
          placeholder="John Doe"
          label="Full Name"
          value={formData.fullName}
          onChange={onChange}
          leftIcon={<User size={18} />}
          error={errors.fullName}
        />

        {/* Email */}
        <Input
          name="email"
          placeholder="example@email.com"
          label="Email"
          type="email"
          value={formData.email}
          onChange={onChange}
          leftIcon={<Mail size={18} />}
          error={errors.email}
        />

        {/* Password Fields */}
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password || ""}
          onChange={onChange}
          error={errors.password}
        />

        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword || ""}
          onChange={onChange}
          error={errors.confirmPassword}
        />

        {/* Role Selection */}
        <div className="flex flex-col gap-[12px]">
          <label className="font-medium text-[14px] text-text-body">
            I am a
          </label>
          <div className="grid grid-cols-3 gap-[12px]">
            <RoleSelector
              roleId="student"
              label="Student"
              icon={GraduationCap}
              isSelected={formData.role === "student"}
              onRoleSelect={onRoleSelect as any}
            />
            <RoleSelector
              roleId="mentor"
              label="Mentor"
              icon={Briefcase}
              isSelected={formData.role === "mentor"}
              onRoleSelect={onRoleSelect as any}
            />
            <RoleSelector
              roleId="university_representative"
              label="University"
              icon={Building2}
              isSelected={formData.role === "university_representative"}
              onRoleSelect={onRoleSelect as any}
            />
          </div>
          {errors.role && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[13px] text-red-500"
            >
              {errors.role}
            </motion.p>
          )}
        </div>
      </div>
          
      <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-text-muted">Or continue with</span>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => { window.location.href = getGoogleOAuthUrl(); }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full cursor-pointer flex items-center justify-center gap-[12px] px-[24px] py-[12px] bg-white border-2 border-slate-200 hover:border-slate-300 rounded-[10px] font-medium text-[15px] text-text-body transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.04-3.71 1.04-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </motion.button>
      </div>
    </motion.div>
  );
}
