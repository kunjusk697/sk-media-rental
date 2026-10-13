"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-charcoal text-white shadow-sm shadow-charcoal/20 hover:bg-charcoal/90 active:scale-[0.98]",
  secondary:
    "bg-white text-charcoal border border-stone-200 hover:border-stone-300 active:scale-[0.98]",
  ghost: "bg-transparent text-charcoal hover:bg-stone-100 active:scale-[0.98]",
  whatsapp:
    "bg-[#25D366] text-[#053017] hover:bg-[#1ebe57] active:scale-[0.98]",
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
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
