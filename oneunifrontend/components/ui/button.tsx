"use client";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "link"
    | "subtle"
    | "destructive"
    | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  const baseStyle =
    "rounded-2xl font-medium transition-all duration-200 inline-flex items-center justify-center gap-2";
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2 font-medium",
    lg: "px-6 py-3 text-lg font-semibold",
    icon: "h-10 w-10 p-2 flex items-center justify-center rounded-full",
  };

  const variantStyles = {
    primary:
      "cursor-pointer border border-primary text-white bg-primary hover:bg-[#1e2266] transition-colors shadow-sm",
    secondary:
      "cursor-pointer border border-slate-200 text-primary bg-transparent hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm",
    ghost:
      "cursor-pointer border-0 bg-transparent text-primary hover:bg-slate-50 transition-colors",
    destructive:
      "cursor-pointer border border-red-600 bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm",
    subtle:
      "cursor-pointer border border-transparent bg-slate-100 text-text-main hover:bg-slate-200 transition-colors",
    link: "cursor-pointer px-0 py-0 border-0 bg-transparent text-primary underline-offset-4 hover:underline",
    outline:
      "cursor-pointer border border-slate-200 bg-transparent hover:bg-slate-50 text-text-main hover:border-slate-300 transition-colors",
  };

  return (
    <button
      className={cn(baseStyle, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {iconLeft && <span className="inline-flex items-center">{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex items-center">{iconRight}</span>}
    </button>
  );
}
