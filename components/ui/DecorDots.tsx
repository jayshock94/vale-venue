/**
 * Subtle corner accent lines. Purely visual, no semantic meaning.
 * Position with className (e.g. "top-0 right-0").
 * Uses accent color at low opacity so it picks up theme changes.
 */
export default function DecorDots({
  className = "",
}: {
  className?: string;
  count?: number;
  spread?: number;
}) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-vale-accent opacity-20"
      >
        <path d="M0 48V28" stroke="currentColor" strokeWidth="1" />
        <path d="M0 48H20" stroke="currentColor" strokeWidth="1" />
        <path d="M8 48V36" stroke="currentColor" strokeWidth="1" />
        <path d="M0 40H12" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
