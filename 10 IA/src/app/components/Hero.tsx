import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import recurso1 from "@/assets/img/recurso1.png";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    "Automatización Industrial Avanzada",
    "Soporte Técnico 24/7",
    "15+ Años de Experiencia",
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={recurso1}
          alt="Industrial Automation"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays with brand colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-muted/98 via-muted/85 to-transparent dark:from-background/98 dark:via-background/90 dark:to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {/* Accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Content */}
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
                Líderes en Automatización Industrial
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="block text-foreground">
              Soluciones de Automatización
            </span>
            <span className="block bg-gradient-to-r from-primary via-primary to-orange-dark bg-clip-text text-transparent">
              Industrial Inteligentes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl"
          >
            Transformamos la industria con tecnología de vanguardia en automatización, 
            ingeniería y control de procesos. Aumenta la productividad y seguridad de 
            tu operación industrial.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-md"
              >
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contacto")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-base px-8"
            >
              Solicita Presupuesto
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("servicios")}
              className="border-2 border-foreground/20 hover:border-primary hover:bg-primary/5 group text-base px-8 shadow-lg"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Ver Servicios
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            {[
              { value: "15+", label: "Años" },
              { value: "200+", label: "Proyectos" },
              { value: "50+", label: "Clientes" },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-center sm:text-left p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border shadow-lg">
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Descubre más</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
    </section>
  );
}
