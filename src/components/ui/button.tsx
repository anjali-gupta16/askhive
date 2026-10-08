import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variants = {
      primary:
        "bg-primary text-surface font-semibold hover:bg-primary-container hover:text-white shadow-sm active:scale-[0.98]",
      secondary:
        "bg-secondary text-surface font-semibold hover:bg-secondary-container hover:text-white shadow-sm active:scale-[0.98]",
      outline:
        "border border-outline/30 bg-transparent text-on-surface hover:bg-surface-container-high hover:border-outline/50 active:scale-[0.98]",
      ghost:
        "bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
      danger:
        "bg-error/20 text-error border border-error/30 hover:bg-error/30 active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
