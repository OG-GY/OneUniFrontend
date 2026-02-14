"use client";
import clsx from "clsx";
import { useState } from "react";

type InputProps = {
  label?: React.ReactNode;
  placeholder?: string;
  value?: string;
  name?: string;
  error?: string | null;
  classname?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function Input({
  label,
  placeholder,
  value,
  name,
  error,
  classname,
  leftIcon,
  rightIcon,
  onRightIconClick,
  type = "text",
  disabled,
  onChange,
  onBlur,
  inputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasBeenTouched(true);
    onBlur?.(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const showError = error && (hasBeenTouched || error) && !isFocused;
  const isFloating = isFocused || (value && value.length > 0);

  return (
    <div className={clsx("flex flex-col min-h-[70px]", classname)}>
      {/* Label and Input Container */}
      <div className="relative mt-[10px]">
        {/* Left Icon - Positioned absolutely inside the input area */}
        {leftIcon && (
          <div className={clsx(
            "absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 pointer-events-none",
            error ? "text-red-400" : "text-text-muted",
            isFocused && !error && "text-primary",
            disabled && "opacity-50"
          )}>
            {leftIcon}
          </div>
        )}

        {/* The Input - The anchor for the layout */}
        <input
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={isFocused ? placeholder : ""}
          disabled={disabled}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(
            "peer w-full h-[54px] transition-all duration-200 border rounded-xl bg-transparent outline-none z-0 px-4",
            "text-[15px] text-text-main font-medium",
            leftIcon && "pl-12",
            rightIcon && "pr-12",
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : "border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-4 focus:ring-primary/10",
            disabled && "opacity-60 cursor-not-allowed bg-slate-50 shadow-none"
          )}
          {...inputProps}
        />

        {/* Floating Label - Border Cut Style */}
        {label && (
          <label
            htmlFor={name}
            className={clsx(
              "absolute left-0 transition-all duration-200 pointer-events-none z-20 px-1 bg-white ml-2 origin-top-left",
              leftIcon ? "left-10" : "left-4",
              isFloating 
                ? "top-0 -translate-y-[50%] scale-[0.85] text-primary font-bold opacity-100" 
                : "top-1/2 -translate-y-1/2 text-[15px] font-medium text-text-muted",
              error && "text-red-500",
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>
        )}

        {/* Right Icon / Action */}
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className={clsx(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 p-1.5 rounded-full hover:bg-slate-50",
              error ? "text-red-400" : "text-slate-400 hover:text-text-main"
            )}
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        )}
      </div>

      {/* Error Message - Below the container to prevent shifting input */}
      {showError && (
        <p className="text-[12px] font-semibold text-red-500 px-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
