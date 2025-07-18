import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { testimonials } from '@/lib/data';
import { CheckCircle, Quote, Rocket, Clock, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const specialties = [
    "Diseño Gráfico Personalizado",
    "Diseño de Pre-imprenta",
    "Soluciones de Diseño Flexibles",
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
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
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Trabajemos juntos</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
             <Image
                src="https://placehold.co/600x800.png"
                alt="Retrato profesional de Eikocolors"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="professional designer"
              />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Mis Valores Fundamentales</h2>
            <p className="mt-4 text-lg text-muted-foreground">Estos son los pilares que guían cada trazo, cada elección de color y cada proyecto que emprendo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                       <Wallet className="h-6 w-6"/>
                    </div>
                    <h3 className="font-headline text-2xl font-semibold">Accesibilidad</h3>
                    <p className="mt-2 text-muted-foreground">Productos y servicios a precios competitivos.</p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                        <Rocket className="h-6 w-6"/>
                     </div>
                    <h3 className="font-headline text-2xl font-semibold">Rapidez en Entregas</h3>
                    <p className="mt-2 text-muted-foreground">Agilidad para que recibas tus diseños cuando los necesitas.</p>
                </div>
                 <div className="flex flex-col items-center">
                     <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                        <Clock className="h-6 w-6"/>
                     </div>
                    <h3 className="font-headline text-2xl font-semibold">Disponibilidad de Horario</h3>
                    <p className="mt-2 text-muted-foreground">Flexibilidad total para coordinar entregas, adaptándose a tu agenda.</p>
                </div>
          </div>
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

      <section id="testimonials" className="w-full py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Confían en mi trabajo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col bg-background">
                <CardContent className="p-6 flex-grow">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground">{testimonial.quote}</p>
                </CardContent>
                <CardFooter className="p-6 border-t">
                    <div className="flex items-center">
                        <Image
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                            data-ai-hint="person avatar"
                        />
                        <div className="ml-4">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
