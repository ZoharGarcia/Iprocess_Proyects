import type { ReactNode } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import "@/styles/Header.css";
import "@/styles/Footer.css";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <main className="flex-1">{children}</main>
      <Footer />
      </div>
    </>
  );
}