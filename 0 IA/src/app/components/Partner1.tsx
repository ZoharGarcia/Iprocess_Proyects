import { motion } from "motion/react";
import { Target, Eye, Award, Users, CheckCircle2, HeartHandshake } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import recursoPartner from "@/assets/img/recurso-partner.png";

import siemensLogo from "@/assets/img/LogoSiemens.png";
import rockwellLogo from "@/assets/img/LogoRockwell.png";
import schneiderLogo from "@/assets/img/LogoSchneider.png";
import abbLogo from "@/assets/img/LogoABB.png";
import honeywellLogo from "@/assets/img/LogoHoneywell.png";
import emersonLogo from "@/assets/img/LogoEmerson.png";

const values = [
  {
    icon: Target,
    title: "Misión",
    description:
      "Innovamos con soluciones inteligentes, optimizamos procesos con tecnología avanzada para el éxito de nuestros clientes.",
  },
  {
    icon: Eye,
    title: "Visión",
    description:
      "Ser la elección principal de nuestros clientes en la región centroamericana al suministrar soluciones industriales con tecnologías innovadoras y calidad en la automatización, digitalización y optimización de procesos.",
  },
{
  icon: HeartHandshake,
  title: "Valores",
  description: (
    <ul className="list-disc list-inside space-y-1 text-left text-muted-foreground">
      <li>Respeto</li>
      <li>Empatía</li>
      <li>Compromiso</li>
      <li>Honestidad</li>
      <li>Integridad</li>
    </ul>
  ),
},

  {
    icon: Users,
    title: "Equipo",
    description:
      "Ingenieros certificados con amplia experiencia en control, instrumentación y automatización de procesos industriales complejos.",
  },
];

const partners = [
  { name: "Siemens", specialty: "Automatización y Control", logo: siemensLogo },
  { name: "Rockwell Automation", specialty: "PLC y SCADA", logo: rockwellLogo },
  { name: "Schneider Electric", specialty: "Gestión Energética", logo: schneiderLogo },
  { name: "ABB", specialty: "Robótica Industrial", logo: abbLogo },
  { name: "Honeywell", specialty: "Sistemas de Seguridad", logo: honeywellLogo },
  { name: "Emerson", specialty: "Control de Procesos", logo: emersonLogo },
];

const achievements = [
  { value: "200+", label: "Proyectos Completados" },
  { value: "50+", label: "Clientes Activos" },
  { value: "15+", label: "Años de Experiencia" },
  { value: "98%", label: "Satisfacción del Cliente" },
];

export function Partner1() {
  return (
    <section id="partner" className="py-20 sm:py-28 bg-muted dark:bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* About Us Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">Sobre Nosotros</span>
          </div>
          <h2 className="mb-6">Líderes en Automatización Industrial</h2>
        </motion.div>

        {/* About Section with Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6">iProcess Industrial Solutions</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Con más de <strong className="text-primary font-semibold">15 años de experiencia</strong> en 
              el sector industrial de Nicaragua y Centroamérica, nos hemos posicionado como un socio 
              estratégico confiable para empresas que buscan optimizar sus procesos mediante la 
              automatización y control inteligente.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nuestro equipo multidisciplinario de ingenieros especializados trabaja de la mano con cada 
              cliente para diseñar, implementar y mantener soluciones personalizadas que se adaptan a las 
              necesidades específicas de cada industria.
            </p>
            
            {/* Features List */}
            <div className="space-y-3">
              {[
                "Certificaciones internacionales",
                "Soporte técnico 24/7",
                "Tecnología de vanguardia",
                "Garantía en todos nuestros servicios",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
              <ImageWithFallback
                src={recursoPartner}
                alt="Team Engineers"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary rounded-2xl -z-10 hidden lg:block" />
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/20 rounded-2xl -z-10 hidden lg:block" />
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50 group"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-orange-dark bg-clip-text text-transparent mb-2">
                {achievement.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {achievement.label}
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="mb-4">Nuestros Valores</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Principios que guían cada proyecto y decisión en iProcess Ind
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 group cursor-pointer border-2 hover:border-primary/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <value.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h4 className="mb-3 group-hover:text-primary transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

{/* Partners */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <div className="text-center mb-12">
    <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
      <span className="text-sm font-semibold text-primary">Partners Tecnológicos</span>
    </div>
    <h3 className="mb-4">Trabajamos con los Mejores</h3>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      Alianzas estratégicas con líderes mundiales en tecnología industrial para garantizar 
      soluciones de la más alta calidad y con soporte internacional.
    </p>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
    {partners.map((partner, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card className="p-4 text-center hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300 hover:scale-105 cursor-pointer group border-2 hover:border-primary/50 h-full flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10">
            {/* Aquí agregamos la imagen del logo */}
            <div className="mb-3 flex justify-center">
              <ImageWithFallback
                src={partner.logo}
                alt={`Logo de ${partner.name}`}
                className="w-16 h-16 object-contain" // Ajusta el tamaño y estilos según necesites
                fallbackSrc="/fallback-logo.png" // Asume que tienes un fallback genérico
              />
            </div>
            <div className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {partner.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {partner.specialty}
            </div>
          </div>
        </Card>
      </motion.div>
    ))}
  </div>
</motion.div>
</div>
</section>
  );
}
