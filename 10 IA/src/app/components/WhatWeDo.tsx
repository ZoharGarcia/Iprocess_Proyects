import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import recursoIndustrial from "@/assets/img/recursotanque.jpg"; 

export function WhatWeDo() {
  const services = [
    "Automatizaciones industriales",
    "Diseño e ingeniería",
    "Sistemas integrados",
    "Soporte técnico",
    "Mantenimiento y refacciones",
  ];

  return (
    <section id="que-hacemos" className="relative py-16 bg-background overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-foreground mb-12"
        >
          <span className="block">¿Qué hacemos?</span>
          <span className="block bg-gradient-to-r from-primary via-primary to-orange-dark bg-clip-text text-transparent">
            Soluciones de Ingeniería Industrial
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna de texto */}
          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              En iProcess, ofrecemos soluciones integrales de ingeniería diseñadas para optimizar y transformar tus operaciones industriales. Nuestros servicios incluyen:
            </motion.p>

            {/* Service Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{service}</span>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-muted-foreground leading-relaxed"
            >
              Nos especializamos en el diseño, suministro, instalación, programación y puesta en marcha de sistemas de automatización industrial. Además, ofrecemos soporte técnico especializado, reingeniería de procesos industriales, ingeniería y suministros para el tratamiento, control y manejo de fluidos industriales, así como el suministro de materias primas industriales y reactivos de análisis.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-muted-foreground leading-relaxed"
            >
              A lo largo de los años, hemos diseñado, fabricado y ejecutado una amplia variedad de proyectos de integración, brindando apoyo experto para elevar la eficiencia y seguridad en las operaciones industriales de nuestros clientes.
            </motion.p>
          </div>

          {/* Columna de imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <img
              src={recursoIndustrial}
              alt="Soluciones de automatización industrial en fábrica"
              className="rounded-xl shadow-2xl max-w-full h-96 object-cover border border-border/50" // Aumentada la altura a h-96 (24rem ≈ 384px) para hacerla más alta
            />
            {/* Accent gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}