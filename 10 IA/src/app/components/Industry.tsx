import { motion } from "motion/react";
import Slider from "react-slick";
import { Factory, Droplets, ShoppingCart, Leaf, Battery, Building2, TrendingUp } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const industries = [
  {
    icon: Factory,
    name: "Manufactura",
    description: "Sistemas de control y automatización para líneas de producción",
  },
  {
    icon: Droplets,
    name: "Petróleo y Gas",
    description: "Soluciones SCADA para refinería y distribución",
  },
  {
    icon: ShoppingCart,
    name: "Alimentos y Bebidas",
    description: "Control de procesos con estándares de seguridad alimentaria",
  },
  {
    icon: Leaf,
    name: "Energía Renovable",
    description: "Monitoreo y control para plantas solares y eólicas",
  },
  {
    icon: Battery,
    name: "Química y Farmacéutica",
    description: "Automatización con trazabilidad y cumplimiento regulatorio",
  },
  {
    icon: Building2,
    name: "Construcción",
    description: "Sistemas de gestión y control para edificios inteligentes",
  },
];

const successCases = [
  {
    company: "Planta Procesadora ABC",
    industry: "Alimentos",
    image: "https://images.unsplash.com/photo-1716191300006-ea66bf47e2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwcGxhbnQlMjBhdXRvbWF0aW9ufGVufDF8fHx8MTc3MDEyNzk2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    result: "45% aumento en productividad",
    description: "Implementación de sistema SCADA completo con control de calidad automatizado y reducción de desperdicios.",
    metrics: [
      { label: "Productividad", value: "+45%" },
      { label: "Eficiencia", value: "+38%" },
    ],
  },
  {
    company: "Refinería Industrial XYZ",
    industry: "Petróleo",
    image: "https://images.unsplash.com/photo-1738918937796-743064feefa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY29udHJvbCUyMHBhbmVsJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzcwMTI3OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    result: "30% reducción de costos",
    description: "Optimización de procesos y mantenimiento predictivo con IoT para maximizar tiempo operativo.",
    metrics: [
      { label: "Costos", value: "-30%" },
      { label: "Downtime", value: "-60%" },
    ],
  },
  {
    company: "Fábrica Textil DEF",
    industry: "Manufactura",
    image: "https://images.unsplash.com/photo-1593812725955-6d89f01ded2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZW5naW5lZXIlMjB3b3JraW5nfGVufDF8fHx8MTc3MDEyNzk2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    result: "60% menos tiempo de inactividad",
    description: "Sistema de monitoreo en tiempo real y mantenimiento preventivo que asegura operación continua.",
    metrics: [
      { label: "Uptime", value: "+60%" },
      { label: "ROI", value: "+52%" },
    ],
  },
];

export function Industry() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots: any) => (
      <div style={{ bottom: "-45px" }}>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-muted-foreground/30 hover:bg-primary transition-all hover:w-8" />
    ),
  };

  return (
    <section id="industria" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">Industrias</span>
          </div>
          <h2 className="mb-6">Sectores que Transformamos</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experiencia comprobada en múltiples sectores industriales con soluciones 
            adaptadas a las necesidades específicas de cada industria.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/50 group relative overflow-hidden h-full">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <industry.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h4 className="mb-2 group-hover:text-primary transition-colors">
                    {industry.name}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Success Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm font-semibold text-primary">Casos de Éxito</span>
            </div>
            <h3 className="mb-4">Resultados Comprobados</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Proyectos exitosos que demuestran nuestro compromiso con la excelencia 
              y la innovación industrial.
            </p>
          </div>
          
          <div className="pb-16">
            <Slider {...sliderSettings}>
              {successCases.map((caseItem, index) => (
                <div key={index} className="px-2">
                  <Card className="overflow-hidden border-2 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-72 md:h-auto group">
                        <ImageWithFallback
                          src={caseItem.image}
                          alt={caseItem.company}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                          <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg">
                            {caseItem.industry}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-card to-muted dark:to-card">
                        <h4 className="mb-4 text-2xl">{caseItem.company}</h4>
                        
                        <div className="flex gap-4 mb-6">
                          {caseItem.metrics.map((metric, idx) => (
                            <div key={idx} className="flex-1 p-4 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20">
                              <div className="text-sm text-muted-foreground mb-1">
                                {metric.label}
                              </div>
                              <div className="text-2xl font-bold text-primary flex items-center gap-1">
                                <TrendingUp className="h-5 w-5" />
                                {metric.value}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="text-3xl font-bold text-foreground mb-4">
                          {caseItem.result}
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {caseItem.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
