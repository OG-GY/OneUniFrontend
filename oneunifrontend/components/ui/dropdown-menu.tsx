"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // @ts-ignore
          return React.cloneElement(child, { isOpen, setIsOpen });
        }
        return child;
      })}
    </div>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isOpen?: boolean; setIsOpen?: (v: boolean) => void; asChild?: boolean }
>(({ children, onClick, isOpen, setIsOpen, asChild, ...props }, ref) => {
    const Component = asChild ? "div" : "button"; // Simplified logic
    return (
        // @ts-ignore
        <Component onClick={() => setIsOpen && setIsOpen(!isOpen)} {...props}>
             {children}
        </Component>
    )
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean; align?: "start" | "end" | "center" }
>(({ className, children, isOpen, align = "center", ...props }, ref) => {
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 top-full mt-2",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";


export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
