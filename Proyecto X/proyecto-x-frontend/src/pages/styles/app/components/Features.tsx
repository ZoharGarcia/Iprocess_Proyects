import { Activity, Bell, BarChart3, Lock, Zap, Cloud } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const features = [
  {
    icon: Activity,
    title: "Monitoreo en Tiempo Real",
    description: "Visualiza datos de sensores en tiempo real con actualizaciones instantáneas y alertas automáticas.",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    description: "Recibe notificaciones cuando los valores excedan umbrales críticos predefinidos.",
  },
  {
    icon: BarChart3,
    title: "Analytics Avanzado",
    description: "Analiza tendencias históricas y genera reportes detallados para optimizar operaciones.",
  },
  {
    icon: Lock,
    title: "Seguridad Empresarial",
    description: "Protección de datos con cifrado de extremo a extremo y cumplimiento de estándares industriales.",
  },
  {
    icon: Zap,
    title: "Integración Rápida",
    description: "Conecta tus sensores en minutos con soporte para protocolos industriales estándar.",
  },
  {
    icon: Cloud,
    title: "Infraestructura Cloud",
    description: "Escalabilidad automática y acceso desde cualquier dispositivo, en cualquier momento.",
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#ff5b22]/10 rounded-full mb-4">
            <span className="text-sm text-primary">Características</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Todo lo que necesitas para{" "}
            <span className="text-primary">monitorear</span> tu industria
          </h2>
          <p className="text-xl text-secondary">
            Plataforma completa de monitoreo con todas las herramientas para mantener tus operaciones funcionando al máximo.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Image Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1717386255773-1e3037c81788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwYXV0b21hdGlvbiUyMGNvbnRyb2x8ZW58MXx8fHwxNzcwOTExMjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Control de Automatización Industrial"
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
              Potencia tu producción con datos en tiempo real
            </h3>
            <p className="text-lg text-secondary">
              Proyecto X te permite tomar decisiones informadas basadas en datos precisos de tus sensores industriales. 
              Reduce tiempo de inactividad, optimiza procesos y aumenta la eficiencia operativa.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-foreground">Dashboard Personalizable</div>
                  <div className="text-secondary">Crea vistas personalizadas para cada área de tu planta</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-foreground">API Completa</div>
                  <div className="text-secondary">Integra con tus sistemas existentes sin problemas</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-foreground">Soporte 24/7</div>
                  <div className="text-secondary">Equipo técnico disponible cuando lo necesites</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
