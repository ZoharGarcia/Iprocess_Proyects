import { Pricing } from "../components/Pricing";
import { Check } from "lucide-react";

const faqs = [
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer: "Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplican inmediatamente y se prorratea el costo.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), transferencias bancarias y PayPal para planes anuales.",
  },
  {
    question: "¿Ofrecen descuentos por pago anual?",
    answer: "Sí, ofrecemos un 20% de descuento en todos los planes con facturación anual. Contacta a ventas para más información.",
  },
  {
    question: "¿Qué incluye la prueba gratuita?",
    answer: "La prueba gratuita de 14 días incluye acceso completo a todas las funcionalidades del plan Pro, sin necesidad de tarjeta de crédito.",
  },
  {
    question: "¿Hay costos adicionales por sensores extra?",
    answer: "No, cada plan incluye un número fijo de sensores. Para más sensores, puedes actualizar a un plan superior o contactar ventas para planes personalizados.",
  },
  {
    question: "¿Qué sucede con mis datos si cancelo?",
    answer: "Puedes exportar todos tus datos antes de cancelar. Los datos se retienen por 30 días después de la cancelación, luego se eliminan permanentemente.",
  },
];

const comparisons = [
  {
    feature: "Sensores incluidos",
    basic: "10",
    pro: "100",
    premium: "Ilimitados",
  },
  {
    feature: "Usuarios del equipo",
    basic: "1",
    pro: "5",
    premium: "Ilimitados",
  },
  {
    feature: "Retención de datos",
    basic: "7 días",
    pro: "90 días",
    premium: "Ilimitado",
  },
  {
    feature: "Dashboards personalizados",
    basic: "1",
    pro: "10",
    premium: "Ilimitados",
  },
  {
    feature: "Alertas por email",
    basic: true,
    pro: true,
    premium: true,
  },
  {
    feature: "Alertas SMS/Slack",
    basic: false,
    pro: true,
    premium: true,
  },
  {
    feature: "API REST",
    basic: false,
    pro: true,
    premium: true,
  },
  {
    feature: "Webhooks",
    basic: false,
    pro: false,
    premium: true,
  },
  {
    feature: "Analytics avanzado",
    basic: false,
    pro: true,
    premium: true,
  },
  {
    feature: "Machine Learning",
    basic: false,
    pro: false,
    premium: true,
  },
  {
    feature: "Soporte 24/7",
    basic: false,
    pro: true,
    premium: true,
  },
  {
    feature: "SLA garantizado",
    basic: false,
    pro: false,
    premium: "99.99%",
  },
];

export function PricingPage() {
  return (
    <div>
      <Pricing />

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comparación detallada de <span className="text-primary">planes</span>
            </h2>
            <p className="text-xl text-secondary">
              Encuentra el plan perfecto comparando todas las características
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-6 font-bold text-foreground">Característica</th>
                  <th className="text-center py-4 px-6 font-bold text-foreground">Básico</th>
                  <th className="text-center py-4 px-6 font-bold text-primary">Pro</th>
                  <th className="text-center py-4 px-6 font-bold text-foreground">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className="border-b border-border hover:bg-gray-50">
                    <td className="py-4 px-6 text-foreground">{item.feature}</td>
                    <td className="text-center py-4 px-6">
                      {typeof item.basic === 'boolean' ? (
                        item.basic ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-secondary">-</span>
                        )
                      ) : (
                        <span className="text-foreground">{item.basic}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-6 bg-primary/5">
                      {typeof item.pro === 'boolean' ? (
                        item.pro ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-secondary">-</span>
                        )
                      ) : (
                        <span className="text-foreground font-bold">{item.pro}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-6">
                      {typeof item.premium === 'boolean' ? (
                        item.premium ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-secondary">-</span>
                        )
                      ) : (
                        <span className="text-foreground">{item.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-secondary">
              Respuestas a las dudas más comunes sobre nuestros planes
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
