import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary dark:bg-card border-t-2 border-primary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-primary-foreground">iP</span>
              </div>
              <div>
                <div className="text-lg font-bold text-secondary-foreground">
                  iProcess <span className="text-primary">Ind</span>
                </div>
                <div className="text-xs text-muted-foreground -mt-0.5">
                  Industrial Solutions
                </div>
              </div>
            </div>
            <p className="text-secondary-foreground/80 dark:text-muted-foreground text-sm leading-relaxed mb-6">
              Líderes en automatización industrial con más de 15 años transformando 
              procesos y optimizando operaciones en Centroamérica.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary-foreground/10 dark:bg-muted hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group shadow-md"
                >
                  <social.icon className="h-4 w-4 text-secondary-foreground dark:text-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-secondary-foreground dark:text-foreground mb-4 text-lg">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {["Inicio", "Servicios", "Industria", "Partner", "Contacto"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-secondary-foreground/80 dark:text-muted-foreground hover:text-primary transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-secondary-foreground dark:text-foreground mb-4 text-lg">
              Servicios
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Automatización Industrial",
                "Diseño e Ingeniería",
                "Sistemas Integrados",
                "Mantenimiento Predictivo",
                "Soporte Técnico 24/7",
              ].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection("servicios")}
                    className="text-secondary-foreground/80 dark:text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-secondary-foreground dark:text-foreground mb-4 text-lg">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80 dark:text-muted-foreground leading-relaxed">
                  21 Ave Sureste, Calle Strauss, Managua, Nicaragua.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="tel:+50522223333"
                    className="text-secondary-foreground/80 dark:text-muted-foreground hover:text-primary transition-colors block font-medium"
                  >
                    +505 2298 3170
                  </a>
                  <a
                    href="tel:+50588889999"
                    className="text-secondary-foreground/80 dark:text-muted-foreground hover:text-primary transition-colors block font-medium"
                  >
                    +505 8403 8777
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="mailto:info@iprocess-ind.com"
                    className="text-secondary-foreground/80 dark:text-muted-foreground hover:text-primary transition-colors block font-medium"
                  >
                    info@iprocess-ind.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-secondary-foreground/10 dark:border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/70 dark:text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} <strong className="font-semibold">iProcess Industrial Solutions</strong>. 
              Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <button className="text-secondary-foreground/70 dark:text-muted-foreground hover:text-primary transition-colors font-medium">
                Política de Privacidad
              </button>
              <button className="text-secondary-foreground/70 dark:text-muted-foreground hover:text-primary transition-colors font-medium">
                Términos de Uso
              </button>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-5 w-5 text-primary-foreground group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
