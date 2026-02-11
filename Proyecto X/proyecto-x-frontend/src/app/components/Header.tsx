import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Button } from "@/app/components/ui/button";
import logoProyectoX from "@/assets/img/LOGO-IPROCESS-NARANJA-300x53.png"; // Asegúrate de tener el logo en esta ruta 
import { Link, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";  
import "@/styles/Header.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
   
      const sections = ["inicio", "caracteristicas", "precios", "documentacion", "contacto"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { path: "/", label: "Inicio", section: "inicio" },
    { path: "/caracteristicas", label: "Características", section: "caracteristicas" },
    { path: "/precios", label: "Precios", section: "precios" },
    { path: "/documentacion", label: "Documentación", section: "documentacion" },
    { path: "/dashboard", label: "Dashboard" }, // Página separada para login/usuarios
    { path: "/contacto", label: "Contacto", section: "contacto" },
  ];

  const trackMenuClick = (label: string, isCTA: boolean = false) => {
    ReactGA.event({
      category: "Navegación",
      action: isCTA ? "Clic CTA" : "Clic Menú",
      label: label,
    });
  };

  return (
    <header
      className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "is-scrolled bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo con subtítulo */}
          <Link 
            to="/" 
            className="site-header__brand flex items-center group z-10"
            onClick={() => trackMenuClick("Logo", false)}
          >
            <img
              src={logoProyectoX}
              alt="Proyecto X - iProcess Ind"
              className="h-8 w-auto drop-shadow-md"
            />
            <span className="site-header__subtitle ml-2 text-sm font-medium text-foreground/80 hidden sm:block">
              Monitoreo de Sensores en la Nube
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-header__nav hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link  
                key={item.path}
                to={item.path}
                className={`site-header__nav-link relative px-4 py-2 text-sm font-medium transition-colors group ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={(e) => {
                  if (item.section && location.pathname === '/') {
                    e.preventDefault();
                    scrollToSection(item.section);
                  }
                  trackMenuClick(item.label);
                }}
              >
                {item.label}
                <span
                  className={`site-header__nav-underline absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === item.section
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Side - CTA + Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild> 
              <Link
                to="/register" // O a /precios o dashboard
                className="site-header__cta bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => trackMenuClick("Comienza Ahora", true)}
              >
                Comienza Ahora
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="site-header__mobile flex lg:hidden items-center space-x-3 z-10">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="site-header__mobile-button p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="site-header__mobile-panel lg:hidden border-t border-border bg-background/98 backdrop-blur-md shadow-xl">
          <nav className="container mx-auto px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link  
                key={item.path}
                to={item.path}
                className={`site-header__mobile-link block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={(e) => {
                  if (item.section && location.pathname === '/') {
                    e.preventDefault();
                    scrollToSection(item.section);
                  }
                  trackMenuClick(item.label);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button asChild>  
                <Link
                  to="/register"
                  className="site-header__cta w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  onClick={() => {
                    trackMenuClick("Comienza Ahora", true);
                    setIsMenuOpen(false);
                  }}
                >
                  Comienza Ahora
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}