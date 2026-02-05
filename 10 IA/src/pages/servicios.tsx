import { Layout } from "@/app/components/Layout";
import { Services } from "@/app/components/Services";
import { HeroServicios } from "@/app/components/HeroServicios";
import { Helmet } from "react-helmet-async";

export default function Servicios() {
  return (
    <>
          <Helmet>
  <title>Servicios - iProcess Ind</title>
  <meta
    name="description"
    content="Servicios de automatización industrial, IoT, monitoreo de procesos, desarrollo de software y consultoría técnica para empresas industriales."
  />
</Helmet>

    <Layout>
      <HeroServicios />
      <Services />
    </Layout>
    </>
  );
}
