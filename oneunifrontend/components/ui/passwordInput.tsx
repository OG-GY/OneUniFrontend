"use client";
import React, { useMemo, useState } from "react";
import Input from "./input";
import { Eye, EyeOff, Lock, Check } from "lucide-react";
import clsx from "clsx";

type Strength = { strength: number; label: string; color: string };

const getPasswordStrength = (password = ""): Strength => {
  if (!password) return { strength: 0, label: "", color: "" };
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;

  if (strength < 40) return { strength, label: "Weak", color: "bg-red-500" };
  if (strength < 70) return { strength, label: "Good", color: "bg-amber-500" };
  return { strength, label: "Strong", color: "bg-emerald-500" };
};

type PasswordInputProps = {
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  confirmValue?: string;
  className?: string;
  disabled?: boolean;
  showRequirements?: boolean;
};

export default function PasswordInput({
  label = "Password",
  name,
  value,
  placeholder = "Enter a strong password",
  error,
  onChange,
  onBlur,
  confirmValue,
  className,
  disabled,
  showRequirements = true,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const passwordStrength = useMemo(() => getPasswordStrength(value), [value]);

  const meets8 = value.length >= 8;
  const meetsCase = /[A-Z]/.test(value) && /[a-z]/.test(value);
  const meetsNumber = /[0-9]/.test(value);
  const allMet = meets8 && meetsCase && meetsNumber;

  return (
    <div className={className}>
      <Input
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        type={visible ? "text" : "password"}
        leftIcon={<Lock size={18} />}
        rightIcon={visible ? <EyeOff size={18} /> : <Eye size={18} />}
        onRightIconClick={() => setVisible(!visible)}
        error={error}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />

      {/* Password Strength Meter */}
      {value && (
        <div className="flex flex-col gap-2 pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
              style={{ width: `${passwordStrength.strength}%` }}
            />
          </div>
          <p className={clsx("font-bold text-[12px]", passwordStrength.color.replace('bg-', 'text-'))}>
            Strength: <span className="font-bold">{passwordStrength.label}</span>
          </p>
        </div>
      )}

      {/* Confirm Check */}
      {typeof confirmValue === "string" && confirmValue.length > 0 && (
        <div className="pt-2">
          {confirmValue === value ? (
            <div className="flex items-center gap-2 text-emerald-600 animate-in fade-in duration-200">
              <Check size={14} strokeWidth={3} />
              <span className="text-[12px] font-bold">Passwords match</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-500 animate-in fade-in duration-200">
              <span className="text-[12px] font-bold">Passwords do not match</span>
            </div>
          )}
        </div>
      )}

      {/* Requirements List */}
      {showRequirements && value.length > 0 && !allMet && (
        <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="font-bold text-[12px] text-text-muted mb-3 uppercase tracking-wider">
            Required:
          </p>
          <ul className="space-y-2.5">
            {[
              { met: meets8, label: "Minimum 8 characters" },
              { met: meetsCase, label: "Uppercase & Lowercase" },
              { met: meetsNumber, label: "At least one number" }
            ].map((req, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className={clsx(
                  "w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-200",
                  req.met ? "bg-emerald-500" : "bg-slate-200"
                )}>
                  {req.met && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                <span className={clsx(
                  "text-[13px] font-medium transition-colors duration-200",
                  req.met ? "text-text-main" : "text-slate-500"
                )}>
                  {req.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
