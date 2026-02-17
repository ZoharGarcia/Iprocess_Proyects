// src/router.tsx 
import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./layouts/RootLayout";

import { Home } from "./pages/Home";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFound } from "./pages/NotFound";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { VerifyResetCode } from "./pages/VerifyResetCode";
import { ChangePassword } from "./pages/ChangePassword";
import { SelectPlan } from "./pages/SelectPlan";
import { Verification } from "./pages/Verification";
import  Inicio  from "@/app/pages/Inicio";
import Profile from "@/app/pages/Profile";

export const router = createBrowserRouter([
  // Rutas de autenticación y flujo sin layout (o con layout mínimo)
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/verification", Component: Verification },
  { path: "/select-plan", Component: SelectPlan },

  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/verify-reset-code", Component: VerifyResetCode },
  { path: "/change-password", Component: ChangePassword },
  { path: "/inicio", Component: Inicio },
  { path: "profile", Component: Profile },
  // Rutas principales → con RootLayout
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,           // 404 y errores generales
    children: [
      { index: true, Component: Home },   // ← "/" muestra la página Home
      { path: "inicio", Component: Inicio },

      { path: "features", Component: FeaturesPage },
      { path: "pricing", Component: PricingPage },
      { path: "contact", Component: ContactPage },


      // Si en el futuro quieres un 404 específico dentro del layout:
      // { path: "*", Component: NotFound },  ← pero errorElement suele ser suficiente
    ],
  },

  // Por si acaso queda alguna ruta no capturada (muy raro con lo de arriba)
  { path: "*", element: <NotFound /> },
]);