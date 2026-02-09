import { ArrowRight, CheckCircle2, Users, Globe } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Link } from "react-router-dom";
import recursoUnidades from "@/assets/img/PortadaUnidades.jpeg";

export function HeroUnidades() {
  const capabilities = [
    "Cobertura regional en planta",
    "Respuesta rapida ante paradas",
    "Personal tecnico certificado",
    "Soporte remoto y en sitio",
    "Repuestos criticos disponibles",
  ];

  return (
    <section id="unidades" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={recursoUnidades}
          alt="Unidades de Servicio en Automatizacion Industrial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-muted/98 via-muted/85 to-transparent dark:from-background/98 dark:via-background/90 dark:to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border-2 border-primary/20 shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">
                Unidades de Servicio Especializadas
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="block text-foreground">Soporte Cercano</span>
            <span className="block bg-gradient-to-r from-primary via-primary to-orange-dark bg-clip-text text-transparent">
              Donde Tu Operacion Lo Necesita
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl"
          >
            Nuestras unidades de servicio brindan atencion inmediata en campo y soporte remoto
            especializado para mantener la continuidad operativa de tu planta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card/70 p-4 shadow-md">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-semibold text-foreground">Equipo local</div>
                <div className="text-xs text-muted-foreground">Ingenieros en tu region</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card/70 p-4 shadow-md">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-semibold text-foreground">Cobertura amplia</div>
                <div className="text-xs text-muted-foreground">Presencia en zonas clave</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-md"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{capability}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-base px-8"
            >
              <Link to="/contacto">
                Agenda una Visita
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-foreground/20 hover:border-primary hover:bg-primary/5 group text-base px-8 shadow-lg"
            >
              <Link to="/servicios">Ver Servicios</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            {[
              { value: "6+", label: "Unidades de Servicio" },
              { value: "12h", label: "Tiempo Promedio" },
              { value: "100%", label: "Cobertura Regional" },
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border shadow-lg">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-primary to-orange-dark bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
    </section>
  );
}