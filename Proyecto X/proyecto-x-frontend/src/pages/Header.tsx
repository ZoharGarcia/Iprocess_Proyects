import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import HeaderForm from "../app/components/HeaderForm";
import "../styles/Header.css";

export type NavItem = {
  path: string;
  label: string;
  section?: string;
};

const SECTIONS = ["inicio", "caracteristicas", "precios", "documentacion", "contacto"] as const;

export function Header() {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");

  const navItems = useMemo<NavItem[]>(
    () => [
      { path: "/", label: "Inicio", section: "inicio" },
      { path: "/caracteristicas", label: "Características", section: "caracteristicas" },
      { path: "/precios", label: "Precios", section: "precios" },
      { path: "/documentacion", label: "Documentación", section: "documentacion" },
      { path: "/dashboard", label: "Dashboard" },
      { path: "/contacto", label: "Contacto", section: "contacto" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (location.pathname !== "/") return;

      const current = SECTIONS.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Si cambias de ruta, cierra el menú móvil para evitar estados raros.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  const trackMenuClick = (label: string, isCTA = false) => {
    ReactGA.event({
      category: "Navegación",
      action: isCTA ? "Clic CTA" : "Clic Menú",
      label,
    });
  };

  const toggleMenu = () => setIsMenuOpen((p) => !p);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <HeaderForm
      locationPathname={location.pathname}
      isMenuOpen={isMenuOpen}
      isScrolled={isScrolled}
      activeSection={activeSection}
      navItems={navItems}
      onToggleMenu={toggleMenu}
      onCloseMenu={closeMenu}
      onScrollToSection={scrollToSection}
      onTrackClick={trackMenuClick}
    />
  );
}
