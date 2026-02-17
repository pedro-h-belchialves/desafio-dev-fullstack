"use client";

import * as React from "react";
import { cn } from "@/src/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";

  size?: "sm" | "md" | "lg";

  loading?: boolean;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          //base
          "inline-flex items-center justify-center",
          "rounded-lg",
          "font-medium",
          "transition-all",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-offset-2",
          "focus:ring-border",

          "disabled:opacity-50",
          "disabled:cursor-not-allowed",

          //hover effect
          "cursor-pointer",
          "hover:-translate-y-1",
          "hover:shadow-lg",
          "active:translate-y-0.5",
          "active:shadow-sm",

          //dinamic sizes
          size === "sm" && "px-3 py-1.5 text-sm gap-1.5",
          size === "md" && "px-4 py-2.5 text-sm gap-2",
          size === "lg" && "px-6 py-3 text-base gap-2.5",

          //colors variants
          variant === "primary" && [
            "bg-primary",
            "text-surface",
            "hover:opacity-90",
            "shadow-sm",
          ],

          variant === "secondary" && [
            "bg-secondary",
            "text-secondary-foreground",
            "hover:opacity-90",
          ],

          variant === "outline" && [
            "border",
            "border-border",
            "bg-transparent",
            "text-foreground",
            "hover:bg-muted",
          ],

          variant === "ghost" && [
            "bg-transparent",
            "text-foreground",
            "hover:bg-muted",
          ],

          variant === "danger" && [
            "bg-error",
            "text-white",
            "hover:opacity-90",
          ],

          //custom
          className,
        )}
        {...props}
      >
        {leftIcon && !loading && (
          <span className="flex items-center">{leftIcon}</span>
        )}

        {loading && <Spinner />}

        <span>{children}</span>

        {rightIcon && !loading && (
          <span className="flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      />
      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );
}
