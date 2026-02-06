import type { ReactNode } from "react";

interface SectionProps {
  children?: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      {children}
    </section>
  );
}
