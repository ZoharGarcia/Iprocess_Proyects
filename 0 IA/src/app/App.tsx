import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Servicios from "@/pages/Servicios";
import Industria from "@/pages/Industria";
import Partner from "@/pages/Partner";
import Contacto from "@/pages/Contacto";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"          element={<Home />}      />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/industria" element={<Industria />} />
        <Route path="/partner"   element={<Partner />}   />
        <Route path="/contacto"  element={<Contacto />}  />
      </Route>
    </Routes>
  );
}
