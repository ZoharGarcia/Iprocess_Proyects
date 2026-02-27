import * as React from "react";
import { motion } from "motion/react";
import {
  ShoppingCart,
  Layers,
  ClipboardCheck,
  Network,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Link } from "react-router-dom";

type Visibility = "Verde" | "Amarillo" | "Azul" | "Dorado";

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  visibility: Visibility;
  bullets: string[];
  focus: string;
  icon: React.ComponentType<{ className?: string }>;
}

const visibilityStyles: Record<Visibility, { badge: string; dot: string }> = {
  Verde: {
    badge: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-500/70",
  },
  Amarillo: {
    badge: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-500/70",
  },
  Azul: {
    badge: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-500/70",
  },
  Dorado: {
    badge: "bg-yellow-500/10 border-yellow-500/20",
    dot: "bg-yellow-500/70",
  },
};

export function WorkProcessSection() {
  const phases: Phase[] = [
    {
      id: "01",
      title: "Fase 1 — Arranque Operativo",
      subtitle: "Activación rápida",
      visibility: "Verde",
      bullets: [
        "Atendemos necesidades inmediatas con soluciones de rápida implementación.",
        "Priorizamos productos de alta rotación para generar impacto inmediato.",
        "Detectamos oportunidades adicionales dentro de la operación.",
        "Registro ágil y respuesta rápida para no perder ritmo comercial.",
      ],
      focus: "Velocidad, disponibilidad y resultados tempranos.",
      icon: ShoppingCart,
    },
    {
      id: "02",
      title: "Fase 2 — Integración Inteligente",
      subtitle: "Conexión y control",
      visibility: "Amarillo",
      bullets: [
        "Diseñamos soluciones conectadas que mejoran la visibilidad del proceso.",
        "Integramos equipos y sistemas para mayor trazabilidad.",
        "Incorporamos seguridad desde el diseño.",
        "Activamos nuevas oportunidades dentro de la base instalada.",
      ],
      focus: "Integración segura y crecimiento estructurado.",
      icon: Layers,
    },
    {
      id: "03",
      title: "Fase 3 — Gestión Estratégica",
      subtitle: "Ejecución y continuidad",
      visibility: "Azul",
      bullets: [
        "Implementamos y comisionamos con acompañamiento técnico.",
        "Optimizamos activos para eficiencia energética y operativa.",
        "Evolucionamos hacia modelos de servicio continuo (OPEX).",
        "Formalizamos compromisos con acuerdos de nivel de servicio.",
      ],
      focus: "Estabilidad operativa y optimización sostenida.",
      icon: ClipboardCheck,
    },
    {
      id: "04",
      title: "Fase 4 — Ecosistema Autónomo",
      subtitle: "Relación estratégica",
      visibility: "Dorado",
      bullets: [
        "Optimizamos continuamente con base en datos reales.",
        "Conectamos operación, tecnología y gestión en un solo entorno.",
        "Aplicamos analítica predictiva para anticipar decisiones.",
        "Construimos una relación de largo plazo con generación constante de valor.",
      ],
      focus: "Permanencia, inteligencia operativa y liderazgo tecnológico.",
      icon: Network,
    },
  ];

  return (
    <section id="proceso" className="relative py-24 overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-24 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-primary/10 border-2 border-primary/20 shadow-lg backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">
              Evolución progresiva orientada al cliente
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl font-bold leading-tight"
          >
            Ruta de crecimiento
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Acompañamos a nuestros clientes desde necesidades inmediatas hasta un
            ecosistema digital completamente integrado.
          </motion.p>
        </div>

        {/* 2x2 phases grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {phases.map((phase, idx) => {
            const vs = visibilityStyles[phase.visibility];

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="rounded-2xl border border-border bg-card/70 backdrop-blur-sm shadow-lg p-6 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-md">
                      <phase.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Color badge (sin texto) */}
                  <span
                    aria-hidden="true"
                    className={`hidden sm:inline-flex h-6 w-10 rounded-full border ${vs.badge}`}
                  />
                </div>

                <ul className="mt-5 space-y-2 text-muted-foreground leading-relaxed">
                  {phase.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className={`mt-2 h-2 w-2 rounded-full ${vs.dot}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 h-px bg-border/60" />
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={`w-2 h-2 rounded-full ${vs.dot}`} />
                  <span>Enfoque: {phase.focus}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA below */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 relative"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl opacity-40 pointer-events-none" />
          <div className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-sm shadow-xl p-8">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold text-foreground">
                ¿En qué fase se encuentra tu operación?
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Te ayudamos a identificar el siguiente paso estratégico para
                avanzar hacia una operación más eficiente y sostenible.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 group px-8"
              >
                <Link to="/contacto">
                  Solicitar sesión estratégica
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-foreground/20 hover:border-primary hover:bg-primary/5 px-8 shadow-lg"
              >
                <Link to="/servicios">Ver servicios</Link>
              </Button>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}