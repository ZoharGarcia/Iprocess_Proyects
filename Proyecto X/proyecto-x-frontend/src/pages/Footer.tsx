import ReactGA from "react-ga4";
import FooterForm from "../app/components/FooterForm";
import "@/styles/Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const trackLinkClick = (label: string) => {
    ReactGA.event({
      category: "Footer",
      action: "Clic Enlace",
      label,
    });
  };

  const trackCTA = () => {
    ReactGA.event({
      category: "Footer",
      action: "Clic CTA",
      label: "Comienza Ahora",
    });
  };

  return (
    <FooterForm
      currentYear={currentYear}
      onTrackLinkClick={trackLinkClick}
      onTrackCTA={trackCTA}
    />
  );
}
