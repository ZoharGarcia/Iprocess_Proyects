import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Button } from "@/app/components/ui/button";
import logo from "@/assets/img/LOGO-IPROCESS-NARANJA-300x53.png";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollToSection = (sectionId: string) => {
    if (!isHome) {
      // Si no estamos en home, navegamos primero y luego scroll (se maneja en useEffect de la página)
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (!isHome) return;

      const sections = ["inicio", "servicios", "industria", "partner", "contacto"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120; // margen más amplio
      });

      setActiveSection(current || "inicio");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // inicial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navItems = [
    { label: "Inicio",     section: "inicio", path: "/",     isSection: false },
    { label: "Servicios",  section: null,     path: "/servicios", isSection: false },
    { label: "Industria",  section: null,     path: "/industria", isSection: false },
    { label: "Partner",    section: null,     path: "/partner", isSection: false },
    { label: "Contacto",   section: "null", path: "/contacto", isSection: false }, 
    // Agrega aquí más páginas o secciones según necesites
    // Ejemplo: { label: "Contacto", section: "contacto", path: "/", isSection: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - siempre vuelve a home + scroll a inicio */}
          <Link
            to="/"
            onClick={() => scrollToSection("inicio")}
            className="flex items-center group z-10"
          >
            <img
              src={logo}
              alt="iProcess Logo"
              className="
                h-8 w-auto
                transition-transform duration-300
                group-hover:scale-110
                drop-shadow-md
              "
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = item.isSection
                ? isHome && activeSection === item.section
                : location.pathname === item.path;

              if (item.isSection) {
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.section!)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 hover:opacity-100 hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Side - CTA + Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={() => scrollToSection("/contacto")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Solicita Presupuesto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3 z-10">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md shadow-xl">
          <nav className="container mx-auto px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = item.isSection
                ? isHome && activeSection === item.section
                : location.pathname === item.path;

              if (item.isSection) {
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.section!)}
                    className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4">
              <Button
                onClick={() => scrollToSection("contacto")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              >
                Solicita Presupuesto
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}