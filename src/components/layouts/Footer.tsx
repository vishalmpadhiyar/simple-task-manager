import Section from "./Section";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white text-black dark:bg-slate-900 dark:border-gray-600 dark:text-white">
      <Section className="text-sm py-2">
        <p className="text-center">
          © 2026,
          <a
            href="https://www.linkedin.com/in/thevishalpadhiyar/"
            aria-label="linkdin link"
            className="px-1"
          >
            Vishal Padhiyar
          </a>
          All Rights Reserved.
        </p>
      </Section>
    </footer>
  );
}
