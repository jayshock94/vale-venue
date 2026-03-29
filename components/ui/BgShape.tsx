/**
 * Soft organic background shape. Positioned absolute behind content.
 * Creates visual depth layers. Uses theme-aware colors.
 */
export default function BgShape({
  className = "",
  variant = "rounded-rect",
}: {
  className?: string;
  variant?: "rounded-rect" | "circle" | "blob";
}) {
  const shapeClass =
    variant === "circle"
      ? "rounded-full"
      : variant === "blob"
        ? "rounded-[40%_60%_55%_45%/50%_40%_60%_50%]"
        : "rounded-[2rem]";

  return (
    <div
      className={`absolute pointer-events-none bg-vale-bg-alt/70 ${shapeClass} ${className}`}
      aria-hidden="true"
    />
  );
}
