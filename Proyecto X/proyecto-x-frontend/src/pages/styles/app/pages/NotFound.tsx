import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-foreground mt-4 mb-2">
            Página no encontrada
          </h2>
          <p className="text-xl text-secondary">
            Lo sentimos, la página que buscas no existe.
          </p>
        </div>
        <Link to="/">
          <Button size="lg">
            <Home className="mr-2 h-5 w-5" />
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
