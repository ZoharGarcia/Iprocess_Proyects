import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Card } from "@/app/components/ui/card";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log("Form submitted:", formData);
    alert("¡Gracias por contactarnos! Nos pondremos en contacto con usted pronto.");
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Dirección",
      content: ["Managua, Nicaragua", "Km. 5.5 Carretera Masaya, de American Donuts 100 MTS al este, frente al Casino Aladdín"],
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: ["+505 2298 3170", "+505 8403 8777"],
    },
    {
      icon: Mail,
      title: "Email",
      content: ["info@iprocess-ind.com", "soporte.tecnico@iprocess-ind.com"],
    },
    {
      icon: Clock,
      title: "Horario",
      content: ["Lunes - Viernes: 7:00am - 5:00pm", "Sábados: 8:00 AM - 11:00 PM"],
    },
  ];

  return (
    <section id="contacto" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
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
            <span className="text-sm font-semibold text-primary">Contáctanos</span>
          </div>
          <h2 className="mb-6">¿Listo para Transformar tu Industria?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nuestro equipo de expertos está listo para ayudarte. 
            Solicita una consultoría gratuita y descubre cómo podemos optimizar tus procesos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-6">Información de Contacto</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Estamos aquí para responder tus preguntas y brindarte la mejor solución 
                para las necesidades de tu industria.
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/10 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <info.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 group-hover:text-primary transition-colors">
                      {info.title}
                    </h4>
                    {info.content.map((line, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {/* Emergency Support Badge */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <div>
                  <div className="font-semibold text-foreground">
                    Soporte Técnico 24/7 Disponible
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Atención de emergencias en todo momento
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-2 shadow-2xl dark:shadow-primary/5 bg-gradient-to-br from-card to-muted dark:to-card">
              <h3 className="mb-6">Solicita tu Presupuesto</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-foreground">
                    Nombre Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Juan Pérez"
                    className="w-full border-2 focus:border-primary transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-foreground">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="juan@empresa.com"
                      className="border-2 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-foreground">
                      Teléfono *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+505 8888-9999"
                      className="border-2 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-2 text-foreground">
                    Empresa
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nombre de tu empresa"
                    className="w-full border-2 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-foreground">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto o necesidades de automatización."
                    className="w-full resize-none border-2 focus:border-primary transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-base"
                >
                  Enviar Mensaje
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Nos comprometemos a responder en menos de 24 horas
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
