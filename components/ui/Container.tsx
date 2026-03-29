import { type HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  narrow?: boolean;
};

export default function Container({
  as: Tag = "div",
  narrow = false,
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={[
        "mx-auto w-full px-5 md:px-8",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
