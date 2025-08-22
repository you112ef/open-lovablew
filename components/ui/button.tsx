import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "accent" | "outline" | "default" | "secondary";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export function Button({ className, variant="primary", size="md", asChild, ...props }: Props) {
  const base = "inline-flex items-center justify-center font-medium transition shadow-soft";
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-xl",
    md: "px-4 py-2 rounded-2xl",
    lg: "px-6 py-3 text-lg rounded-2xl",
  }[size];
  
  const styles = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white",
    ghost: "bg-white/5 hover:bg-white/10 text-text-primary border border-white/10",
    accent: "bg-accent-500 hover:bg-accent-400 text-ink-950",
    outline: "bg-transparent hover:bg-white/5 text-text-primary border border-white/20 hover:border-white/30",
    default: "bg-white/10 hover:bg-white/20 text-text-primary border border-white/20",
    secondary: "bg-white/5 hover:bg-white/15 text-text-primary border border-white/15",
  }[variant];

  const buttonClasses = `${base} ${sizes} ${styles} ${className||""}`;

  if (asChild) {
    return <span className={buttonClasses} {...props} />;
  }

  return <button className={buttonClasses} {...props} />;
}