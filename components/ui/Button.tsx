import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-vale-accent text-vale-accent-fg hover:bg-vale-accent-hover active:bg-vale-accent-hover",
  secondary:
    "bg-transparent text-vale-fg border border-vale-border-strong hover:bg-vale-bg-alt active:bg-vale-bg-alt",
  ghost:
    "bg-transparent text-vale-fg hover:bg-vale-bg-alt active:bg-vale-bg-alt",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center font-medium",
    "rounded-md transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vale-accent",
    "disabled:opacity-50 disabled:pointer-events-none",
    "font-[family-name:var(--font-body)]",
    "tracking-wide uppercase text-[0.85em] leading-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...rest} />
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)} />
  );
}
