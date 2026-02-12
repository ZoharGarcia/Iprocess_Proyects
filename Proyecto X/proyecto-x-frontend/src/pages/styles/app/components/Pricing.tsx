import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Básico",
    price: "$29",
    period: "/mes",
    description: "Perfecto para pequeñas operaciones y pruebas iniciales",
    features: [
      "Hasta 10 sensores",
      "Monitoreo en tiempo real",
      "Alertas por email",
      "Dashboard básico",
      "Retención de datos 7 días",
      "Soporte por email",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mes",
    description: "Ideal para operaciones medianas que requieren más control",
    features: [
      "Hasta 100 sensores",
      "Monitoreo en tiempo real",
      "Alertas multi-canal (Email, SMS, Slack)",
      "Dashboard personalizable",
      "Retención de datos 90 días",
      "Analytics avanzado",
      "API completa",
      "Soporte prioritario 24/7",
      "Reportes automatizados",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$299",
    period: "/mes",
    description: "Solución empresarial para operaciones a gran escala",
    features: [
      "Sensores ilimitados",
      "Monitoreo en tiempo real",
      "Alertas multi-canal ilimitadas",
      "Dashboards ilimitados",
      "Retención de datos ilimitada",
      "Analytics avanzado + ML",
      "API completa + Webhooks",
      "Soporte dedicado 24/7",
      "Reportes personalizados",
      "SLA garantizado 99.99%",
      "Onboarding personalizado",
      "Auditoría y cumplimiento",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#ff5b22]/10 rounded-full mb-4">
            <span className="text-sm text-primary">Precios</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Planes que escalan con tu{" "}
            <span className="text-primary">negocio</span>
          </h2>
          <p className="text-xl text-secondary">
            Elige el plan perfecto para tus necesidades. Todos incluyen prueba gratuita de 14 días.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 ${
                plan.highlighted
                  ? "border-2 border-primary shadow-2xl scale-105 z-10"
                  : "border border-border shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm rounded-full">
                  Más Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-secondary text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-secondary ml-2">{plan.period}</span>
                </div>
              </div>

              <Button
                className="w-full mb-6"
                variant={plan.highlighted ? "default" : "outline"}
                size="lg"
              >
                {plan.highlighted ? "Comenzar Ahora" : "Probar Gratis"}
              </Button>

              <div className="space-y-4">
                <div className="text-sm font-bold text-foreground mb-3">Incluye:</div>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "bg-primary" : "bg-[#a3a2a2]"
                      }`}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="mt-16 text-center">
          <div className="bg-white border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              ¿Necesitas una solución empresarial personalizada?
            </h3>
            <p className="text-secondary mb-6">
              Contáctanos para planes personalizados con precios especiales por volumen, implementación dedicada y características exclusivas.
            </p>
            <Button size="lg" variant="outline">
              Contactar Ventas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
