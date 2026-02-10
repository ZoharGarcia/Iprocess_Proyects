import { Layout } from "@/app/components/Layout";
import { Industry } from "@/app/components/Industry";
import { HeroStorytelling } from "@/app/components/HeroStorytelling";
import { Helmet } from "react-helmet-async";

export default function Storytelling() {
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
      <HeroStorytelling />
      <Industry />
    </Layout>
      </>
  );
}