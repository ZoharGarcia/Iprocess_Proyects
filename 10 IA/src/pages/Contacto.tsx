import { Layout } from "@/app/components/Layout";
import { Contact } from "@/app/components/Contact";
import { HeroContacto } from "@/app/components/HeroContacto";
import { Helmet } from "react-helmet-async";

export default function Contacto() {
  return (
    <>
         <Helmet>
  <title>Contacto - iProcess Ind</title>
  <meta
    name="description"
    content="Contáctanos para recibir asesoría técnica personalizada en automatización, ingeniería industrial y soluciones tecnológicas adaptadas a tu empresa."
  />
</Helmet>


    <Layout>
      <HeroContacto />
      <Contact />
    </Layout>
          </>
  );
}