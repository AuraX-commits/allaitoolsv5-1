
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "muted" | "secondary";
  className?: string;
}

const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none";
  
  const variantStyles = {
    default: "bg-primary/10 text-primary hover:bg-primary/20",
    outline: "border border-primary/30 text-primary",
    muted: "bg-muted text-muted-foreground hover:bg-muted/80",
    secondary: "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20"
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
