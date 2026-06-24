import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-600",
  secondary:
    "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-900 dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
  outline:
    "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-500 hover:bg-neutral-50 focus-visible:outline-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:hover:bg-neutral-900",
  ghost:
    "border-transparent bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white",
  danger:
    "border-rose-600 bg-rose-600 text-white hover:bg-rose-700 focus-visible:outline-rose-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-11 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
