"use client";
import { User, Mail } from "lucide-react";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";

type Role = "student" | "mentor" | "";

type RegistrationFormProps = {
  formData: {
    fullName: string;
    email: string;
    role: Role;
    password?: string;
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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-3xl tracking-tight text-text-main">
          Create account
        </h2>
        <p className="text-text-muted text-[15px]">
          Join our community of students and mentors today.
        </p>
      </div>

      <div className="flex flex-col gap-4">
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

        {/* Password */}
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password || ""}
          onChange={onChange}
          error={errors.password}
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="role"
            className="font-medium text-sm text-text-body ml-1"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={(e) => onRoleSelect(e.target.value as Role)}
            className="w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-[15px] text-text-main shadow-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
          >
            <option value="">Select your role</option>
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>
          {errors.role && (
            <p className="text-[12px] text-red-500 font-medium ml-1">
              {errors.role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
