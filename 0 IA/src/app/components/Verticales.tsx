import * as React from "react";
import { motion } from "framer-motion";
import { Shield, Server, Zap, Package, Cpu } from "lucide-react";
import { Card } from "@/app/components/ui/card";

interface BusinessUnit {
  name: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: string;
}

const businessUnits: BusinessUnit[] = [
  {
    name: "Smart Power [Predictivo]",
    title: "OT/ET – Tecnología de Operación",
    description:
      "Potencia y control en el campo. Optimiza el desempeño de equipos como VDF y motores para que operen de forma más inteligente, eficiente y confiable.",
    icon: Zap,
    accentColor: "from-blue-500/20 to-blue-600/5",
  },
  {
    name: "Digital Flow",
    title: "Convergencia OT/IT/ET",
    description:
      "El núcleo de la estrategia digital. Convierte los datos del campo (OT) en información útil para la gestión (IT) mediante SCADA y DCS, con ciberseguridad industrial como base.",
    icon: Cpu,
    accentColor: "from-purple-500/20 to-purple-600/5",
  },
  {
    name: "High Power",
    title: "OT/ET de Potencia Crítica",
    description:
      "Infraestructura eléctrica de alta exigencia. Garantiza continuidad y estabilidad en el suministro de energía para que el IT y el OT operen sin interrupciones.",
    icon: Server,
    accentColor: "from-red-500/20 to-red-600/5",
  },
  {
    name: "Safety & Asset Protection",
    title: "Seguridad & Protección de Activos OT/IT",
    description:
      "Protección integral para el entorno industrial. Resguarda el hardware de campo (OT), centros de datos y redes (IT) ante eventos externos, asegurando la integridad de los sistemas de comunicación.",
    icon: Shield,
    accentColor: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    name: "Industrial Supplies & Materials",
    title: "Suministro Transaccional OT/IT",
    description:
      "Soporte de materiales para la operación diaria. Asegura disponibilidad oportuna de suministros para mantener IT y OT en marcha, sin demoras.",
    icon: Package,
    accentColor: "from-amber-500/20 to-amber-600/5",
  },
];

export function Verticales() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Arquitectura de Negocio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unidades de Negocio – Soluciones integradas para la convergencia OT/IT/ET
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {businessUnits.map((unit, index) => {
            const isFourth = index === 3;
            const isFifth = index === 4;

            return (
              <motion.div
                key={unit.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={[
                  "lg:col-span-2",
                  isFourth ? "lg:col-start-2" : "",
                  isFifth ? "lg:col-start-4" : "",
                ].join(" ")}
              >
                <Card className="h-full p-8 relative overflow-hidden border-2 border-transparent hover:border-primary/40 transition-all duration-400 group hover:shadow-2xl dark:hover:shadow-primary/10 hover:scale-[1.03]">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${unit.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/90 group-hover:scale-110 transition-all duration-400 shadow-md">
                      <unit.icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>

                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {unit.name}
                      </h3>
                      <p className="text-sm uppercase tracking-wider text-muted-foreground/80 mb-4">
                        {unit.title}
                      </p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {unit.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}