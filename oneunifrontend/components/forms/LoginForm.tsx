"use client";

import Link from "next/link";
import { Mail, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import Button from "@/components/ui/button";

type LoginFormProps = {
  formData: {
    email: string;
    password: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
};

export default function LoginForm({
  formData,
  errors,
  onChange,
  onSubmit,
  isLoading,
}: LoginFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-[440px] flex flex-col gap-8"
    >
      <div className="flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-bold text-3xl text-text-main tracking-tight">
            Welcome back
          </h2>
          <p className="text-[15px] text-text-body mt-2 leading-relaxed">
            Enter your credentials to access your account and continue your
            learning journey.
          </p>
        </motion.div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              name="email"
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              value={formData.email}
              onChange={onChange}
              leftIcon={<Mail size={18} className="text-text-muted" />}
              error={errors.email}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-2"
          >
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={onChange}
              error={errors.password}
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-[13px] font-medium text-primary hover:text-primary/80 transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full h-[52px] text-[16px]"
            iconRight={isLoading ? null : <LogIn size={20} />}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </motion.div>
      </form>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100"
      >
        <p className="text-[14px] text-text-muted">Don't have an account?</p>
        <Link
          href="/registration"
          className="text-[14px] font-semibold text-primary hover:text-primary/80 transition-colors hover:underline"
        >
          Create account
        </Link>
      </motion.div>
    </motion.div>
  );
}
