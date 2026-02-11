import { Layout } from "@/app/components/Layout";
import "@/styles/Header.css"; 
import "@/styles/Index.css";
import "@/styles/Footer.css"; 

export default function Main() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Main</h1>
        <p className="text-muted-foreground text-lg">
          Esta es la página principal después de iniciar sesión. 
        </p>
      </div>
    </Layout>
  ); 
}