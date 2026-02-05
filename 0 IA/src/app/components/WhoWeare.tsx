import { Users2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import recursoIndustrial from "@/assets/img/WhoWeAre.png";

export function WhoWeAre() {
  const highlights = [
    "Equipo profesional orientado a resultados",
    "Innovación aplicada a procesos industriales",
    "Diseño, ejecución y puesta en marcha",
    "Proyectos llave en mano",
  ];

  return (
    <section id="quienes-somos" className="relative py-16 bg-background overflow-hidden">
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
          <span className="block">¿Quiénes somos?</span>
          <span className="block bg-gradient-to-r from-primary via-primary to-orange-dark bg-clip-text text-transparent">
            Proyectos de Ingeniería
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
              Somos un equipo de profesionales enfocados en la innovación y ejecución de
              proyectos de ingeniería y desarrollo en los procesos industriales.
              Concebimos todas las etapas de un requerimiento, desde el diseño hasta el
              proyecto llave en mano.
            </motion.p>

            {/* Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-card border border-border p-6 shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-border">
                  <Users2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Enfoque integral</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Transformamos requerimientos industriales en soluciones operativas:
                    análisis, ingeniería, suministro, instalación, programación y puesta en marcha.
                  </p>
                </div>
              </div>
            </motion.div>
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
              alt="Equipo y soluciones de ingeniería industrial"
              className="rounded-xl shadow-2xl max-w-full h-96 object-cover border border-border/50"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
