import { ThemeProvider } from "@/app/components/ThemeProvider";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { Services } from "@/app/components/Services";
import { Industry } from "@/app/components/Industry";
import { Partner } from "@/app/components/Partner";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    
      <div className="min-h-screen bg-background text-foreground">
        
        <main>
          <section id="inicio"><Hero /></section>
          <section id="servicios"><Services /></section>
          <section id="industria"><Industry /></section>
          <section id="partner"><Partner /></section>
          <section id="contacto"><Contact /></section>
        </main>
        <Footer />
      </div>
    
  );
}
