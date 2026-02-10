import { Layout } from "@/app/components/Layout";
import { Industry } from "@/app/components/Industry";
import { HeroIndustria } from "@/app/components/HeroIndustria";
import { Helmet } from "react-helmet-async";

export default function Industria() {
  return (
      <>
            <Helmet>
  <title>Industrias - iProcess Ind</title>
  <meta
    name="description"
    content="Soluciones tecnológicas y de automatización industrial para agroindustria, manufactura, energía, logística y producción sostenible."
  />
</Helmet>

    <Layout>
      <HeroIndustria />
      <Industry />
    </Layout>
      </>
  );
}