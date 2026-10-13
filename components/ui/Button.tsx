"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "pill-light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-white shadow-sm shadow-forest/25 hover:bg-forest-light active:scale-[0.98]",
  secondary:
    "bg-white text-forest border border-stone-200 hover:border-forest/30 active:scale-[0.98]",
  ghost: "bg-transparent text-forest hover:bg-surface active:scale-[0.98]",
  whatsapp:
    "bg-[#25D366] text-[#053017] hover:bg-[#1ebe57] active:scale-[0.98]",
  "pill-light":
    "bg-white text-forest hover:bg-white/90 active:scale-[0.98]",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
