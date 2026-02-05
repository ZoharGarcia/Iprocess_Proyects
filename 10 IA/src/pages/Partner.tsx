import { Layout } from "@/app/components/Layout";
import { Partner1 } from "@/app/components/Partner1";
import { HeroPartner } from "@/app/components/HeroPartner";
import { Helmet } from "react-helmet-async";

export default function Partner() {
  return (
    <>
          <Helmet>
  <title>Partner - iProcess Ind</title>
  <meta
    name="description"
    content="Conviértete en partner de Iprocess y crece con alianzas estratégicas en automatización, ingeniería, IoT y transformación digital."
  />
</Helmet>


    <Layout>
      <HeroPartner />
      <Partner1 />
    </Layout>
    </>
  );
}
