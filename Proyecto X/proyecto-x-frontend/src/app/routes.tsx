import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";

import { Home } from "./pages/Home";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFound } from "./pages/NotFound";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { VerifyCode } from "./pages/VerifyCode";
import { NewPassword } from "./pages/NewPassword";


export const router = createBrowserRouter([
  
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/verify-code", Component: VerifyCode },
  { path: "/new-password", Component: NewPassword },

  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "features", Component: FeaturesPage },
      { path: "pricing", Component: PricingPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
