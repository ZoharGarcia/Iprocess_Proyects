import { Layout } from "@/app/components/Layout";
import { Storytelling as StoryTelling} from "@/app/components/StorytellingC";
import { HeroStorytelling } from "@/app/components/HeroStorytelling";
import { Helmet } from "react-helmet-async";

export default function Storytelling() {
  return (
      <>
          <Helmet>
  <title>Storytelling - iProcess Ind</title>
  <meta
    name="description"
    content="Descubre cómo nuestras soluciones de automatización y tecnología transforman la narrativa de tu industria."
  />
</Helmet>

    <Layout>
      <HeroStorytelling />
      <StoryTelling />
    </Layout>
      </>
  );
}