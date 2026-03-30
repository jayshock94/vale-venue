type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} mb-10 md:mb-14`}>
      {label && (
        <>
          <span className="block font-[family-name:var(--font-body)] text-sm font-medium uppercase tracking-widest text-vale-fg-muted mb-3">
            {label}
          </span>
          <div className={`w-10 h-0.5 bg-vale-accent rounded-full mb-5 ${align === "center" ? "mx-auto" : ""}`} />
        </>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">{title}</h2>
      {description && (
        <p className="mt-4 text-vale-fg-muted text-lg max-w-2xl leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
