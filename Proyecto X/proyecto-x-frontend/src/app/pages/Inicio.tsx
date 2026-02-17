// src/pages/inicio.tsx  (o Home.tsx)
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";          
import { useAuth } from "@/hooks/useAuth";       
import "../../assets/Logo_Iprocess.png";

export default function Inicio() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header con botón de perfil */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/Logo_Iprocess.png" alt="IProcess" className="h-10 w-auto" />
            <span className="font-bold text-xl">IProcess</span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button asChild variant="outline" size="sm">
                <Link to="/profile">Mi Perfil</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Iniciar sesión</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Registrarse</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <Features />

        {/* Stats Section */}
        <section className="py-20 bg-[#000000] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">10K+</div>
                <div className="text-[#a3a2a2]">Sensores Activos</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-[#a3a2a2]">Empresas</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-[#a3a2a2]">Uptime</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">24/7</div>
                <div className="text-[#a3a2a2]">Soporte</div>
              </div>
            </div>
          </div>
        </section>

        <Pricing />

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-[#ff5b22] to-[#ff7b42] rounded-3xl p-12 text-white">
              <h2 className="text-4xl font-bold mb-4">
                Comienza tu prueba gratuita hoy
              </h2>
              <p className="text-xl mb-8 opacity-90">
                14 días gratis. No se requiere tarjeta de crédito. Cancela cuando quieras.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-[#ff5b22] hover:bg-gray-100">
                  Comenzar Ahora
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Agendar Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}