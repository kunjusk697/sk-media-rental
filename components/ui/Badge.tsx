import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-gold/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}
