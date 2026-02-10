import { motion } from "motion/react";
import {
	BookOpen,
	Lightbulb,
	Megaphone,
	PenTool,
	Share2,
	TrendingUp,
	Video,
	FileText,
	BarChart3,
	ArrowRight,
} from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Link } from "react-router-dom";

const storytellingServices = [
	{
		icon: Lightbulb,
		title: "Curaduria de Proyectos",
		description:
			"Seleccionamos los proyectos con mayor impacto, contexto y aprendizajes clave.",
	},
	{
		icon: PenTool,
		title: "Resena y Contexto",
		description:
			"Documentamos el reto inicial, la solucion aplicada y el valor aportado.",
	},
	{
		icon: BookOpen,
		title: "Casos de Exito",
		description:
			"Historias reales con resultados medibles en eficiencia, calidad y ROI.",
	},
	{
		icon: BarChart3,
		title: "Indicadores Clave",
		description:
			"KPIs, tiempos y mejoras presentados de forma clara y comparativa.",
	},
	{
		icon: Video,
		title: "Evidencia Visual",
		description:
			"Imagenes, videos y recursos que respaldan cada caso con credibilidad.",
	},
	{
		icon: Share2,
		title: "Publicacion y Archivo",
		description:
			"Organizamos el portafolio para web, presentaciones y propuestas comerciales.",
	},
];

const storytellingFormats = [
	{
		icon: FileText,
		title: "Ficha de Proyecto",
		description: "Resumen ejecutivo con alcance, tecnologia y resultados.",
	},
	{
		icon: TrendingUp,
		title: "Caso de Exito",
		description: "Antes y despues con indicadores y aprendizajes clave.",
	},
	{
		icon: Megaphone,
		title: "Resena de Cliente",
		description: "Testimonio y valor percibido por el cliente.",
	},
];

const processSteps = [
	{
		step: "01",
		title: "Seleccion del Caso",
		description:
			"Definimos el proyecto, el reto y los objetivos que se van a documentar.",
	},
	{
		step: "02",
		title: "Analisis de Resultados",
		description:
			"Recopilamos datos, indicadores y evidencia para sustentar el impacto.",
	},
	{
		step: "03",
		title: "Redaccion y Diseno",
		description:
			"Creamos la resena, la ficha y los recursos visuales del proyecto.",
	},
	{
		step: "04",
		title: "Publicacion y Actualizacion",
		description:
			"Publicamos el caso y lo mantenemos actualizado con nuevos resultados.",
	},
];

export function Storytelling() {
	return (
		<section
			id="storytelling-contenido"
			className="py-20 sm:py-28 bg-muted dark:bg-background relative overflow-hidden"
		>
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
						<span className="text-sm font-semibold text-primary">Casos de Exito</span>
					</div>
					<h2 className="mb-6">Resenas y Proyectos que Demuestran Resultados</h2>
					<p className="text-lg text-muted-foreground leading-relaxed">
						Este apartado reune los proyectos y casos de exito de la empresa. Encontraras
						resenas claras, resultados medibles y aprendizajes que respaldan nuestra experiencia.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
					{storytellingServices.map((service, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card className="p-6 h-full hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 group cursor-pointer relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="relative z-10">
									<div className="w-16 h-16 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
										<service.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
									</div>
									<h3 className="mb-3 group-hover:text-primary transition-colors text-xl">
										{service.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">{service.description}</p>
								</div>
							</Card>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="grid lg:grid-cols-2 gap-12 items-center mb-20"
				>
					<div>
						<h3 className="mb-6">Formatos para Documentar el Impacto</h3>
						<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
							Cada caso se presenta con evidencia tecnica, indicadores y contexto operativo para
							facilitar la toma de decisiones.
						</p>
						<div className="grid gap-4">
							{storytellingFormats.map((format, index) => (
								<Card
									key={index}
									className="p-5 flex items-start gap-4 border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
								>
									<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
										<format.icon className="h-6 w-6 text-primary" />
									</div>
									<div>
										<h4 className="mb-1">{format.title}</h4>
										<p className="text-sm text-muted-foreground">{format.description}</p>
									</div>
								</Card>
							))}
						</div>
					</div>

					<Card className="p-8 sm:p-10 border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-xl">
						<div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
							<span className="text-xs font-semibold text-primary">Proceso iProcess</span>
						</div>
						<h3 className="mb-6">Como Documentamos Cada Caso</h3>
						<div className="space-y-5">
							{processSteps.map((step) => (
								<div key={step.step} className="flex gap-4">
									<div className="text-primary font-bold text-lg">{step.step}</div>
									<div>
										<h4 className="mb-1 text-base">{step.title}</h4>
										<p className="text-sm text-muted-foreground">{step.description}</p>
									</div>
								</div>
							))}
						</div>
					</Card>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<Card className="p-8 sm:p-12 border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-xl max-w-4xl mx-auto">
						<h3 className="mb-4">Quieres Incluir tu Proyecto?</h3>
						<p className="text-muted-foreground mb-6 text-lg">
							Comparte tu proyecto y documentamos el caso con resultados claros y accionables.
						</p>
						<Button
							size="lg"
							asChild
							className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
						>
							<Link to="/contacto">
								Proponer un Caso de Exito
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Link>
						</Button>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}
