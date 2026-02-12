import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#ff5b22]/10 rounded-full mb-4">
              <span className="text-sm text-primary">Contacto</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              ¿Listo para transformar tu{" "}
              <span className="text-primary">operación</span>?
            </h2>
            <p className="text-xl text-secondary mb-8">
              Nuestro equipo está listo para ayudarte a implementar la solución perfecta para tu industria.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">Email</div>
                  <a href="mailto:contacto@proyectox.com" className="text-secondary hover:text-primary transition-colors">
                    contacto@proyectox.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">Teléfono</div>
                  <a href="tel:+1234567890" className="text-secondary hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">Oficina</div>
                  <p className="text-secondary">
                    Av. Industrial 123<br />
                    Ciudad Empresarial, CP 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-border">
              <h3 className="font-bold text-foreground mb-2">Horario de Atención</h3>
              <p className="text-secondary text-sm">
                Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                Sábados: 10:00 AM - 2:00 PM<br />
                Soporte técnico 24/7 disponible para clientes Premium
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Envíanos un mensaje
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Nombre
                  </label>
                  <Input placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Empresa
                  </label>
                  <Input placeholder="Tu empresa" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Email
                </label>
                <Input type="email" placeholder="tu@email.com" />
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Teléfono
                </label>
                <Input type="tel" placeholder="+1 (234) 567-890" />
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Plan de Interés
                </label>
                <select className="w-full px-4 py-2 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Básico</option>
                  <option>Pro</option>
                  <option>Premium</option>
                  <option>Personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Mensaje
                </label>
                <Textarea
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={4}
                />
              </div>

              <Button size="lg" className="w-full">
                Enviar Mensaje
              </Button>

              <p className="text-xs text-secondary text-center">
                Al enviar este formulario, aceptas nuestra{" "}
                <a href="#" className="text-primary hover:underline">
                  Política de Privacidad
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
