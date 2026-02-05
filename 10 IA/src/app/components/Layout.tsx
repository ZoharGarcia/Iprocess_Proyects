import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-foreground">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}