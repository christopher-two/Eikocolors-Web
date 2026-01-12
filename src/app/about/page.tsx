import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NextImage from 'next/image';
import { clients } from '@/lib/data';
import { CheckCircle, Rocket, Clock, Wallet } from 'lucide-react';
import Link from 'next/link';

const specialties = [
  "Diseño Gráfico Personalizado",
  "Diseño de Pre-imprenta",
  "Soluciones de Diseño Flexibles",
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="w-full py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">La historia detrás del color</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Mi nombre es Gloria, y soy la fundadora de Eikocolors. Mi pasión por el diseño nació de la creencia de que la estética y la estrategia pueden ir de la mano para crear un impacto real. No se trata solo de crear algo bonito, sino de resolver problemas, comunicar valores y construir conexiones duraderas. Mi trayectoria profesional es una combinación de formación académica y una amplia experiencia práctica. Estudié Contabilidad, lo que me brinda una sólida base en la gestión empresarial, pero mi verdadera pasión y especialidad es el Diseño Gráfico, área en la que me formé profesionalmente.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Además, trabajé en una imprenta durante 15 años, tiempo en el cual me especialicé en Diseño de Pre-imprenta, adquiriendo un conocimiento profundo de todo el proceso gráfico. Con toda esta experiencia y conocimiento, fundé mi propia empresa: Eikocolors. Con un enfoque en la personalización, ayudo a marcas con propósito a encontrar su voz visual y a destacarse en un mercado saturado.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                En Eikocolors, cada diseño es una obra de arte única y exclusiva para cada cliente. Mi filosofía de trabajo se centra en la personalización, creando diseños únicos y especiales e infundiendo un toque distintivo y personal en cada creación. No manejo catálogos preestablecidos, ya que mi objetivo es crear diseños específicos y personalizados, basados estrictamente en las ideas y especificaciones de cada cliente. Tu visión es el punto de partida para mi creatividad.
              </p>
              <div className="text-center">
                <Button asChild size="lg" className="mt-8">
                  <Link href="/contact">Trabajemos juntos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-secondary z-0">
          <svg viewBox="0 0 1440 100" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto">
            <path d="M0,50 C360,150 1080,-50 1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Mis Valores Fundamentales</h2>
            <p className="mt-4 text-lg text-muted-foreground">Estos son los pilares que guían cada trazo, cada elección de color y cada proyecto que emprendo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="font-headline text-2xl font-semibold">Accesibilidad</h3>
              <p className="mt-2 text-muted-foreground">Productos y servicios a precios competitivos.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="font-headline text-2xl font-semibold">Rapidez en Entregas</h3>
              <p className="mt-2 text-muted-foreground">Agilidad para que recibas tus diseños cuando los necesitas.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-headline text-2xl font-semibold">Disponibilidad de Horario</h3>
              <p className="mt-2 text-muted-foreground">Flexibilidad total para coordinar entregas, adaptándose a tu agenda.</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-background z-0">
          <svg viewBox="0 0 1440 100" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto">
            <path d="M0,50 C360,150 1080,-50 1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Mis Especialidades</h2>
          <p className="mt-4 text-lg text-muted-foreground">Estas son las áreas donde mi pasión y experiencia se unen para crear resultados excepcionales.</p>
        </div>
        <div className="max-w-2xl mx-auto mt-12">
          <ul className="space-y-4">
            {specialties.map((specialty, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                <span className="text-lg text-muted-foreground">{specialty}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="clients" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Confían en mi trabajo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <a
                key={index}
                href={client.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="flex flex-col h-full bg-card hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20">
                  <CardContent className="p-8 flex flex-col items-center text-center flex-grow">
                    <div className="h-24 w-full flex items-center justify-center mb-6 relative">
                      <NextImage
                        src={client.logoUrl}
                        alt={`Logo de ${client.name}`}
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{client.name}</h3>
                    <p className="text-muted-foreground">{client.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
