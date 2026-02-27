import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useEffect, Suspense, lazy } from "react";
import ReactGA from "react-ga";

const Inicio = lazy(() => import("@/pages/Home"));
const Servicios = lazy(() => import("@/pages/servicios"));
const Storytelling = lazy(() => import("@/pages/StorytellingP"));
const Industria = lazy(() => import("@/pages/Industria"));
const Partner = lazy(() => import("@/pages/Partner"));
const Contacto = lazy(() => import("@/pages/Contacto"));

function EshopRedirect() {
  useEffect(() => {
    window.location.replace("https://e-shop.iprocess-ind.com");
  }, []);
  return null;
}

export default function App() {
  const location = useLocation();
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID as string | undefined;

  useEffect(() => {
    if (!trackingId) {
      console.warn(
        "Google Analytics tracking ID not found in environment variables."
      );
      return;
    }
    ReactGA.initialize(trackingId);
  }, [trackingId]);

  useEffect(() => {
    if (!trackingId) return;
    ReactGA.pageview(location.pathname + location.search);
  }, [location.pathname, location.search, trackingId]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/storytelling" element={<Storytelling />} />
          <Route path="/industria" element={<Industria />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/e-shop" element={<EshopRedirect />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}