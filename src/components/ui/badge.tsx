import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "default" && "bg-primary text-text-primary",
        variant === "secondary" && "bg-surface-raised text-text-secondary",
        variant === "outline" && "border border-border text-text-secondary",
        className
      )}
      {...props}
    />
  );
}
