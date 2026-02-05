// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "@/app/components/Header";
import { ThemeProvider } from "@/app/components/theme-provider";  

export function MainLayout() {
  return (
    <ThemeProvider 
      attribute="class"         
      defaultTheme="system"
      enableSystem
      storageKey="mi-tema-app"   
      disableTransitionOnChange   
    >
      <div className="relative min-h-screen">
        <Header />
        <main className="pt-20">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}