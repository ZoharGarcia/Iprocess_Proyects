import { Layout } from "@/app/components/Layout";
import { Hero } from "@/app/components/Hero";
import { Helmet } from "react-helmet-async";
import { WhatWeDo } from "@/app/components/WhatWeDo";
import { WhoWeAre } from "@/app/components/WhoWeare";

export default function Inicio() {
  return (
    <>
      <Helmet>
        <title>Inicio - iProcess Ind</title>
        <meta
          name="description"
          content="Soluciones de automatización industrial, ingeniería y tecnología para la industria moderna."
        />
      </Helmet>

      <Layout>
        <Hero />
        <WhoWeAre />
        <WhatWeDo />
      </Layout>
    </>
  );
}
