import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App";
import "./styles/index.css";
import ReactGA from "react-ga4";
import { useEffect } from "react"; 

ReactGA.initialize("G-J8GD11MG9X");

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null; 
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <HelmetProvider>
     
      <AnalyticsTracker />
      <App />
    </HelmetProvider>
  </BrowserRouter>
);