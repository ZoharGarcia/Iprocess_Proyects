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
		title: "Estrategia Narrativa",
		description:
			"Definimos el mensaje central, la audiencia y los objetivos para que cada historia impulse decisiones y resultados medibles.",
	},
	{
		icon: PenTool,
		title: "Guion y Storyboard",
		description:
			"Traducimos procesos industriales complejos en guiones claros, con un enfoque técnico y humano.",
	},
	{
		icon: BookOpen,
		title: "Casos de Exito",
		description:
			"Convertimos proyectos reales en historias de valor, mostrando impacto operativo, eficiencia y ROI.",
	},
	{
		icon: BarChart3,
		title: "Visualizacion de Datos",
		description:
			"Graficas y dashboards que convierten datos industriales en argumentos claros y memorables.",
	},
	{
		icon: Video,
		title: "Contenido Multimedia",
		description:
			"Animaciones, videos explicativos y piezas audiovisuales para transmitir innovacion con claridad.",
	},
	{
		icon: Share2,
		title: "Distribucion Multicanal",
		description:
			"Planificamos la difusion en web, ferias, presentaciones comerciales y redes industriales.",
	},
];

const storytellingFormats = [
	{
		icon: FileText,
		title: "Articulos Tecnicos",
		description: "Contenido editorial con enfoque industrial y respaldo tecnico.",
	},
	{
		icon: TrendingUp,
		title: "Historias de Impacto",
		description: "Antes y despues con indicadores de rendimiento y resultados.",
	},
	{
		icon: Megaphone,
		title: "Presentaciones Comerciales",
		description: "Narrativas para ventas consultivas y licitaciones.",
	},
];

const processSteps = [
	{
		step: "01",
		title: "Diagnostico y Brief",
		description:
			"Analizamos el proceso, los datos clave y el publico objetivo para construir un mapa narrativo.",
	},
	{
		step: "02",
		title: "Construccion de la Historia",
		description:
			"Definimos guion, estructura y lenguaje tecnico adaptado a la industria.",
	},
	{
		step: "03",
		title: "Produccion de Contenido",
		description:
			"Disenamos piezas visuales, textos, videos y recursos que comunican valor real.",
	},
	{
		step: "04",
		title: "Lanzamiento y Medicion",
		description:
			"Publicamos y optimizamos con base en alcance, conversion y engagement.",
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
						<span className="text-sm font-semibold text-primary">Storytelling Industrial</span>
					</div>
					<h2 className="mb-6">Contenido que Explica, Convence y Genera Valor</h2>
					<p className="text-lg text-muted-foreground leading-relaxed">
						Transformamos la innovacion en mensajes claros para clientes, inversionistas y equipos
						internos. Unimos datos, contexto y emocion para que tu tecnologia se entienda y se
						recuerde.
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
						<h3 className="mb-6">Formatos que Multiplican la Credibilidad</h3>
						<p className="text-lg text-muted-foreground mb-8 leading-relaxed">
							Seleccionamos el formato ideal para tu industria y tu audiencia. Cada pieza se
							construye con base en evidencia tecnica y narrativa estrategica.
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
						<h3 className="mb-6">Como Construimos tu Historia</h3>
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
						<h3 className="mb-4">Listo para Contar tu Historia Industrial?</h3>
						<p className="text-muted-foreground mb-6 text-lg">
							Te ayudamos a convertir tecnologia en narrativa, y narrativa en oportunidades
							comerciales reales.
						</p>
						<Button
							size="lg"
							asChild
							className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
						>
							<Link to="/contacto">
								Solicitar Sesion de Storytelling
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Link>
						</Button>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}
