import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import logoProyectoX from "@/assets/img/LOGO-IPROCESS-NARANJA-300x53.png";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Twitter, Linkedin, Mail } from "lucide-react";

type FooterFormProps = {
  currentYear: number;
  onTrackLinkClick: (label: string) => void;
  onTrackCTA: () => void;
};

export default function FooterForm({
  currentYear,
  onTrackLinkClick,
  onTrackCTA,
}: FooterFormProps) {
  return (
    <footer className="site-footer bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Columna 1: Logo + Descripción + Social */}
          <div className="space-y-6">
            <Link
              to="/"
              className="site-footer__brand flex items-center gap-3"
              onClick={() => onTrackLinkClick("Footer Logo")}
            >
              <img
                src={logoProyectoX}
                alt="Proyecto X - iProcess Ind"
                className="h-8 w-auto"
              />
              <span className="site-footer__brand-name text-lg font-semibold">
                Proyecto X
              </span>
            </Link>

            <p className="text-sm text-muted-foreground max-w-xs">
              Monitoreo inteligente de sensores en la nube. Suscripción mensual
              simple, datos en tiempo real y alertas predictivas para tu
              industria.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrackLinkClick("Twitter")}
                className="site-footer__social-link text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="https://linkedin.com/company/iprocess-ind"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onTrackLinkClick("LinkedIn")}
                className="site-footer__social-link text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="mailto:contacto@iprocessind.com"
                onClick={() => onTrackLinkClick("Email")}
                className="site-footer__social-link text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Producto */}
          <div>
            <h3 className="site-footer__heading text-sm font-semibold mb-4">
              Producto
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/caracteristicas"
                  className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onTrackLinkClick("Características Footer")}
                >
                  Características
                </Link>
              </li>
              <li>
                <Link
                  to="/precios"
                  className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onTrackLinkClick("Precios Footer")}
                >
                  Precios y Planes
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onTrackLinkClick("Dashboard Footer")}
                >
                  Dashboard Demo
                </Link>
              </li>
              <li>
                <Link
                  to="/documentacion"
                  className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onTrackLinkClick("Documentación Footer")}
                >
                  Documentación
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Empresa */}
          <div>
            <h3 className="site-footer__heading text-sm font-semibold mb-4">
              Empresa
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/acerca"
                  className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onTrackLinkClick("Acerca de Nosotros")}
                >
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onTrackLinkClick("Blog")}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/partner"
                  className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onTrackLinkClick("Socios")}
                >
                  Socios y Partners
                </Link>
              </li>
              <li>
                <a
                  href="https://prueba-iprocess.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => onTrackLinkClick("iProcess Ind")}
                >
                  iProcess Ind
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Soporte + CTA */}
          <div className="space-y-6">
            <div>
              <h3 className="site-footer__heading text-sm font-semibold mb-4">
                Soporte
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/contacto"
                    className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => onTrackLinkClick("Contacto Footer")}
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => onTrackLinkClick("FAQ")}
                  >
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <a
                    href="/soporte"
                    className="site-footer__link text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => onTrackLinkClick("Soporte Técnico")}
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

              <Button
                asChild
                variant="default"
                size="lg"
                className="site-footer__cta w-full sm:w-auto"
              >
                <Link to="/register" onClick={onTrackCTA}>
                  Comienza Ahora
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="site-footer__bottom mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} iProcess Ind. Todos los derechos reservados.</p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacidad"
              className="site-footer__link hover:text-foreground transition-colors"
              onClick={() => onTrackLinkClick("Política de Privacidad")}
            >
              Privacidad
            </Link>

            <Link
              to="/terminos"
              className="site-footer__link hover:text-foreground transition-colors"
              onClick={() => onTrackLinkClick("Términos de Servicio")}
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
