import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useEffect, Suspense, lazy } from 'react';
import ReactGA from 'react-ga';

const Inicio = lazy(() => import("@/pages/Home"));
const Servicios = lazy(() => import("@/pages/servicios"));
const Unidades = lazy(() => import("@/pages/Unidades"));
const Industria = lazy(() => import("@/pages/Industria"));
const Partner = lazy(() => import("@/pages/Partner"));
const Contacto = lazy(() => import("@/pages/Contacto"));
//const NotFound = lazy(() => import("@/pages/NotFound")); // Assuming you have or will create this

function EshopRedirect() {
  return <Navigate to="https://e-shop.iprocess-ind.com/password" replace />;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (trackingId) {
      ReactGA.initialize(trackingId);
    } else {
      console.warn('Google Analytics tracking ID not found in environment variables.');
    }
  }, []); 

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]); 
  
 // <Route path="*" element={<NotFound />} /> {/* 404 handler */}
 //<Suspense fallback={<div>Cargando página...</div>}>
 //</Suspense>
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/industria" element={<Industria />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/e-shop" element={<EshopRedirect />} />
        </Routes>
    </ThemeProvider>
  );
}