import { Features } from "../components/Features";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { 
  Gauge, 
  Shield, 
  Workflow, 
  LineChart, 
  Smartphone, 
  Globe,
  Database,
  Clock
} from "lucide-react";

const additionalFeatures = [
  {
    icon: Gauge,
    title: "Performance Optimizado",
    description: "Procesamiento de datos ultrarrápido con latencia mínima para decisiones en tiempo real.",
  },
  {
    icon: Shield,
    title: "Certificaciones de Seguridad",
    description: "ISO 27001, SOC 2 Type II y cumplimiento con regulaciones industriales internacionales.",
  },
  {
    icon: Workflow,
    title: "Automatización de Procesos",
    description: "Crea flujos de trabajo automatizados basados en datos de sensores y triggers personalizados.",
  },
  {
    icon: LineChart,
    title: "Machine Learning",
    description: "Predicción de fallos y mantenimiento preventivo con algoritmos de ML avanzados.",
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "Aplicaciones nativas para iOS y Android para monitoreo desde cualquier lugar.",
  },
  {
    icon: Globe,
    title: "Multi-región",
    description: "Infraestructura global con centros de datos en múltiples regiones para baja latencia.",
  },
  {
    icon: Database,
    title: "Big Data Analytics",
    description: "Procesamiento de millones de puntos de datos con capacidades de análisis masivo.",
  },
  {
    icon: Clock,
    title: "Historial Completo",
    description: "Acceso ilimitado a datos históricos con visualizaciones y exportación flexible.",
  },
];

export function FeaturesPage() {
  return (
    <div>
      <Features />
      
      {/* Additional Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Más funcionalidades <span className="text-primary">potentes</span>
            </h2>
            <p className="text-xl text-secondary">
              Herramientas adicionales para llevar tu monitoreo al siguiente nivel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <feature.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1641757625075-d018760a4fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwSW9UJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzA5MTEyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Tecnología IoT Industrial"
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                Integraciones con tus herramientas favoritas
              </h3>
              <p className="text-lg text-secondary">
                Conecta Proyecto X con tu stack tecnológico existente. Soportamos los protocolos y plataformas más populares.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-bold text-foreground mb-1">MQTT</div>
                  <div className="text-sm text-secondary">Protocolo IoT estándar</div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-bold text-foreground mb-1">Modbus</div>
                  <div className="text-sm text-secondary">Industrial legacy</div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-bold text-foreground mb-1">OPC UA</div>
                  <div className="text-sm text-secondary">Automatización</div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="font-bold text-foreground mb-1">REST API</div>
                  <div className="text-sm text-secondary">Integración web</div>
                </div>
              </div>

              <Button size="lg">
                Ver Todas las Integraciones
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
