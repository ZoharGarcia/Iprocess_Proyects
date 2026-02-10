import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import logoProyectoX from "@/assets/img/LOGO-IPROCESS-NARANJA-300x53.png"; // Asegúrate de tener el logo en esta ruta
import { ThemeToggle } from "@/app/components/ThemeToggle";
import ReactGA from "react-ga4";
import { Twitter, Linkedin, Mail } from "lucide-react"; // o los íconos que uses
import "@/styles/Footer.css"; 

export function Footer() {
  const currentYear = new Date().getFullYear();

  const trackLinkClick = (label: string) => {
    ReactGA.event({
      category: "Footer",
      action: "Clic Enlace",
      label: label,
    });
  };

  const trackCTA = () => {
    ReactGA.event({
      category: "Footer",
      action: "Clic CTA",
      label: "Comienza Ahora Footer",
    });
  };

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Columna 1: Logo + Descripción + Social */}
          <div className="space-y-6">
            <Link 
              to="/" 
              className="flex items-center gap-3"
              onClick={() => trackLinkClick("Footer Logo")}
            >
              <img
                src={logoProyectoX}
                alt="Proyecto X - iProcess Ind"
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold">Proyecto X</span>
            </Link>
            
            <p className="text-sm text-muted-foreground max-w-xs">
              Monitoreo inteligente de sensores en la nube. 
              Suscripción mensual simple, datos en tiempo real y alertas predictivas para tu industria.
            </p>

            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackLinkClick("Twitter")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/iprocess-ind" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackLinkClick("LinkedIn")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contacto@iprocessind.com" 
                onClick={() => trackLinkClick("Email")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              {/* Agrega más redes si tienes */}
            </div>
          </div>

          {/* Columna 2: Producto */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Producto</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/caracteristicas" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackLinkClick("Características Footer")}
                >
                  Características
                </Link>
              </li>
              <li>
                <Link 
                  to="/precios" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackLinkClick("Precios Footer")}
                >
                  Precios y Planes
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackLinkClick("Dashboard Footer")}
                >
                  Dashboard Demo
                </Link>
              </li>
              <li>
                <Link 
                  to="/documentacion" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackLinkClick("Documentación Footer")}
                >
                  Documentación
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Empresa */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/acerca" // Crea esta página si no existe
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackLinkClick("Acerca de Nosotros")}
                >
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackLinkClick("Blog")}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/partner" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackLinkClick("Socios")}
                >
                  Socios y Partners
                </Link>
              </li>
              <li>
                <a 
                  href="https://prueba-iprocess.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => trackLinkClick("iProcess Ind")}
                >
                  iProcess Ind
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Soporte + CTA */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-4">Soporte</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link 
                    to="/contacto" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => trackLinkClick("Contacto Footer")}
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/faq" // Si tienes FAQ
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => trackLinkClick("FAQ")}
                  >
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <a 
                    href="/soporte" // o enlace a portal de tickets
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => trackLinkClick("Soporte Técnico")}
                  >
                    Soporte Técnico
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿Listo para optimizar tus procesos?
              </p>
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                <Link 
                  to="/register"
                  onClick={trackCTA}
                >
                  Comienza Ahora
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} iProcess Ind. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            <Link 
              to="/privacidad" 
              className="hover:text-foreground transition-colors"
              onClick={() => trackLinkClick("Política de Privacidad")}
            >
              Privacidad
            </Link>
            <Link 
              to="/terminos" 
              className="hover:text-foreground transition-colors"
              onClick={() => trackLinkClick("Términos de Servicio")}
            >
              Términos
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}