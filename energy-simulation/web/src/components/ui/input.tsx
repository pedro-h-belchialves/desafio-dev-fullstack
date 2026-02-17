"use client";

import { cn } from "@/src/utils/cn";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode | null;
  rightIcon?: React.ReactNode | null;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, leftIcon, rightIcon, className, id, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="
              block
              text-sm
              font-medium
              text-foreground
              mb-1.5
            "
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-foreground-secondary
            "
            >
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              // base
              "w-full",
              "rounded-lg",
              "border",

              "bg-surface",
              "px-4",
              "py-2.5",
              "text-sm",
              "text-froreground",

              // placeholder
              "placeholder:text-foreground-secondary",

              //focus
              "focus:outline-none",

              "focus:border-primary",

              // disabled
              "disabled:cursor-not-allowed",
              "disabled:bg-secondary",
              "disabled:text-foreground-secondary",

              //error state
              hasError
                ? "border-error focus:ring-error focus:border-error"
                : "border-secondary",

              // padding in caase of icons
              leftIcon ? "pl-10" : "",
              rightIcon ? "pr-10" : "",

              // animation
              "transition-all",

              //others
              className,
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div
              className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-foreground-secondary
            "
            >
              {rightIcon}
            </div>
          )}
        </div>

        {!error && hint && (
          <p
            id={`${inputId}-hint`}
            className="
              text-xs
              text-foreground-secondary
              mt-1.5
            "
          >
            {hint}
          </p>
        )}

        {error && (
          <p
            id={`${inputId}-error`}
            className="
              text-xs
              text-error
              mt-1.5
              font-medium
            "
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
