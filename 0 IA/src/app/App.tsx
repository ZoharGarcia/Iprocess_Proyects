import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import Inicio from "@/pages/Home";
import Servicios from "@/pages/servicios";
import Unidades from "@/pages/Unidades";
import Industria from "@/pages/Industria";
import Partner from "@/pages/Partner";
import Contacto from "@/pages/Contacto";

function EshopRedirect() {
  window.location.href = "https://e-shop.iprocess-ind.com/password";
  return null;
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize('G-J8GD11MG9X'); 
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
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
