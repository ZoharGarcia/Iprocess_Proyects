import { Cpu, Settings, Shield, Wrench, Zap, Gauge, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

const services = [
  {
    icon: Cpu,
    title: "Automatización Industrial",
    description:
      "Implementación de sistemas SCADA, PLC y control de procesos para optimizar la producción y reducir costos operativos.",
  },
  {
    icon: Settings,
    title: "Diseño e Ingeniería",
    description:
      "Desarrollo de proyectos personalizados de ingeniería eléctrica, instrumentación y control adaptados a las necesidades de su industria.",
  },
  {
    icon: Shield,
    title: "Sistemas Integrados",
    description:
      "Integración de sistemas de seguridad industrial, monitoreo en tiempo real y gestión de alarmas para proteger su operación.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento Predictivo",
    description:
      "Servicios de mantenimiento preventivo y correctivo con tecnología IoT para minimizar tiempos de inactividad.",
  },
  {
    icon: Zap,
    title: "Optimización Energética",
    description:
      "Análisis y soluciones para reducir el consumo energético, mejorar la eficiencia y cumplir con normativas ambientales.",
  },
  {
    icon: Gauge,
    title: "Soporte Técnico 24/7",
    description:
      "Equipo de ingenieros disponibles para asistencia remota y presencial, garantizando la continuidad de su operación.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-20 sm:py-28 bg-muted dark:bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">Nuestros Servicios</span>
          </div>
          <h2 className="mb-6">Soluciones Integrales para tu Industria</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ofrecemos servicios completos de automatización y control industrial con tecnología 
            de punta para maximizar la eficiencia y seguridad de sus procesos.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 group cursor-pointer relative overflow-hidden">
                {/* Gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <service.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="mb-3 group-hover:text-primary transition-colors text-xl">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <button className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Ver más
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="p-8 sm:p-12 border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-xl max-w-4xl mx-auto">
            <h3 className="mb-4">¿Necesitas una Solución Personalizada?</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Nuestro equipo de expertos está listo para diseñar la solución perfecta 
              para las necesidades específicas de tu industria.
            </p>
            <Button
              size="lg"
              onClick={() => {
                const element = document.getElementById("contacto");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              Solicitar Consultoría Gratuita
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
