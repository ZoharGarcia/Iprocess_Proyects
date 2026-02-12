import { Link } from "react-router";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">X</span>
              </div>
              <span className="text-xl font-bold">Proyecto X</span>
            </Link>
            <p className="text-[#a3a2a2] text-sm mb-4">
              Monitoreo inteligente de sensores industriales para optimizar tus operaciones.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#a3a2a2]/20 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#a3a2a2]/20 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#a3a2a2]/20 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#a3a2a2]/20 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-bold mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Documentación
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Actualizaciones
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Soporte
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Comunidad
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Estado del Sistema
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a3a2a2] hover:text-primary transition-colors">
                  Seguridad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#a3a2a2]/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#a3a2a2] text-sm">
            © 2026 Proyecto X. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-[#a3a2a2] hover:text-primary text-sm transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-[#a3a2a2] hover:text-primary text-sm transition-colors">
              Términos
            </a>
            <a href="#" className="text-[#a3a2a2] hover:text-primary text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
