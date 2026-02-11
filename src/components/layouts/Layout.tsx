import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="bg-gray-200 dark:bg-slate-800 min-h-[calc(100vh-64px)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
