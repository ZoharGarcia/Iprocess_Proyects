import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'next-themes';

import Inicio from "@/pages/Home";  // O Home si no lo renombraste
import Servicios from "@/pages/servicios";
import Industria from "@/pages/Industria";
import Partner from "@/pages/Partner";
import Contacto from "@/pages/Contacto";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/industria" element={<Industria />} />
      <Route path="/partner" element={<Partner />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
    </ThemeProvider>
  );
}