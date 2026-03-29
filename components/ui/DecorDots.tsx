/**
 * Scattered decorative dots. Purely visual, no semantic meaning.
 * Position with className (e.g. "top-0 right-0").
 * Uses accent color at low opacity so it picks up theme changes.
 */
export default function DecorDots({
  className = "",
  count = 12,
  spread = 120,
}: {
  className?: string;
  count?: number;
  spread?: number;
}) {
  // Deterministic "random" positions based on index
  const dots = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + i * 0.7;
    const radius = (spread / 2) * (0.3 + ((i * 7 + 3) % 10) / 10);
    const x = spread / 2 + Math.cos(angle) * radius;
    const y = spread / 2 + Math.sin(angle) * radius;
    const size = 2 + ((i * 3 + 1) % 4);
    const opacity = 0.15 + ((i * 5 + 2) % 6) / 30;
    return { x, y, size, opacity };
  });

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: spread, height: spread }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${spread} ${spread}`}
        fill="currentColor"
        className="w-full h-full text-vale-accent"
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={dot.size}
            opacity={dot.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
