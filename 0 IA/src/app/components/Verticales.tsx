import { motion } from "framer-motion";
import { Shield, Server, Zap, Lock, Package, Cpu } from "lucide-react"; 
import { Card } from "@/app/components/ui/card"; 

interface BusinessUnit {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: string; 
}

const businessUnits: BusinessUnit[] = [
  {
    id: "BU_01",
    name: "Smart Power [Predictivo]",
    title: "OT/ET [Tecnología Operación]",
    description:
      "Es el poder físico controlado. Se enfoca en que las máquinas (VDF, Motores) trabajen de forma inteligente.",
    icon: Zap,
    accentColor: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: "BU_02",
    name: "Digital Flow",
    title: "Convergencia OT/IT/ET",
    description:
      "Es el corazón de tu estrategia. Aquí los datos del campo (OT) se convierten en información para la gerencia (IT) mediante SCADA y DCS, protegidos bajo protocolos de ciberseguridad.",
    icon: Cpu,
    accentColor: "from-purple-500/20 to-purple-600/5",
  },
  {
    id: "BU_03",
    name: "High Power",
    title: "OT/ET de Potencia Crítica",
    description:
      "Es la infraestructura eléctrica pesada. Asegura que el flujo de energía sea constante para que el IT y el OT no se detengan.",
    icon: Server,
    accentColor: "from-red-500/20 to-red-600/5",
  },
  {
    id: "BU_04",
    name: "Safety & Asset Protection",
    title: "Seguridad & Protección de Activos OT/IT",
    description:
      "Protege físicamente tanto el hardware de campo (OT) como los centros de datos y redes (IT) contra eventos externos, garantizando la integridad de los sistemas de comunicación.",
    icon: Shield,
    accentColor: "from-green-500/20 to-green-600/5",
  },
  {
    id: "BU_05",
    name: "Industrial Supplies & Materials",
    title: "Suministro Transaccional OT/IT",
    description:
      "Es el soporte de materiales para mantener ambas capas (IT/OT) operativas sin retrasos.",
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
            New Business Units – Soluciones integradas para la convergencia OT/IT/ET
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {businessUnits.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full p-8 relative overflow-hidden border-2 border-transparent hover:border-primary/40 transition-all duration-400 group hover:shadow-2xl dark:hover:shadow-primary/10 hover:scale-[1.03]">
                {/* Gradient sutil de fondo en hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${unit.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/90 group-hover:scale-110 transition-all duration-400 shadow-md">
                    <unit.icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                      {unit.id}
                    </span>
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
          ))}
        </div>
      </div>
    </section>
  );
}