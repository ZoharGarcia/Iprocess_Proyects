import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Button } from "@/app/components/ui/button";
import logoProyectoX from "@/assets/img/LOGO-IPROCESS-NARANJA-300x53.png";
import type { NavItem } from "@/pages/Header";


type HeaderFormProps = {
  locationPathname: string;
  isMenuOpen: boolean;
  isScrolled: boolean;
  activeSection: string;
  navItems: NavItem[];

  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onScrollToSection: (sectionId: string) => void;
  onTrackClick: (label: string, isCTA?: boolean) => void;
};

export default function HeaderForm({
  locationPathname,
  isMenuOpen,
  isScrolled,
  activeSection,
  navItems,
  onToggleMenu,
  onCloseMenu,
  onScrollToSection,
  onTrackClick,
}: HeaderFormProps) {
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
          {/* Brand */}
          <Link
            to="/"
            className="site-header__brand flex items-center group z-10"
            onClick={() => onTrackClick("Logo", false)}
          >
            <img
              src={logoProyectoX}
              alt="Proyecto X - iProcess Ind"
              className="site-header__logo h-8 w-auto"
            />
            <span className="site-header__subtitle ml-2 text-sm font-medium text-foreground/80 hidden sm:block">
              Monitoreo de Sensores en la Nube
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="site-header__nav hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`site-header__nav-link relative px-4 py-2 text-sm font-medium transition-colors group ${
                  locationPathname === item.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={(e) => {
                  if (item.section && locationPathname === "/") {
                    e.preventDefault();
                    onScrollToSection(item.section);
                  }
                  onTrackClick(item.label, false);
                }}
              >
                {item.label}
                {item.section && (
                  <span
                    className={`site-header__nav-underline absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === item.section
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild>
              <Link
                to="/register"
                className="site-header__cta"
                onClick={() => onTrackClick("Comienza Ahora", true)}
              >
                Comienza Ahora
              </Link>
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="site-header__mobile flex lg:hidden items-center space-x-3 z-10">
            <ThemeToggle />
            <button
              onClick={onToggleMenu}
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
                  locationPathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={(e) => {
                  if (item.section && locationPathname === "/") {
                    e.preventDefault();
                    onScrollToSection(item.section);
                  }
                  onTrackClick(item.label, false);
                  onCloseMenu();
                }}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4">
              <Button asChild>
                <Link
                  to="/register"
                  className="site-header__cta w-full"
                  onClick={() => {
                    onTrackClick("Comienza Ahora", true);
                    onCloseMenu();
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
