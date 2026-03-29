import Container from "./Container";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <Container as="main" className="py-32 md:py-40 text-center">
      <h1 className="text-3xl md:text-4xl font-light font-[family-name:var(--font-heading)] mb-4">
        {title}
      </h1>
      <p className="text-vale-fg-muted">
        This page is still being built. Check back soon.
      </p>
    </Container>
  );
}
