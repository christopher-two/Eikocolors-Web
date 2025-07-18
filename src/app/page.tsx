import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';
import { testimonials } from '@/lib/data';
import { getPortfolioProjects } from '@/services/portfolioService';
import type { PortfolioProject } from '@/lib/types';

export default function Home() {
  const allProjects: PortfolioProject[] = getPortfolioProjects();
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="w-full min-h-screen bg-background relative flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto">
            Una impresión que cautiva
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Soy Gloria, fundadora de Eikocolors. En Eikocolors, soy una diseñadora gráfica con una misión clara: crear diseños que no solo se vean bien, sino que conecten con tu audiencia, cuenten tu historia y potencien tus ventas. Cada diseño es una obra de arte única y exclusiva para cada cliente, con un toque distintivo y personal.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/portfolio">Explorar mis trabajos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold">
              <Link href="/contact">Hablemos de tu proyecto</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-secondary z-0">
            <svg viewBox="0 0 1440 100" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto">
                <path d="M0,50 C360,150 1080,-50 1440,50 L1440,100 L0,100 Z"></path>
            </svg>
        </div>
      </section>

      <section id="portfolio" className="w-full py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Proyectos Destacados</h2>
            <p className="mt-2 text-muted-foreground">Una selección de mis trabajos favoritos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="overflow-hidden group">
                 <CardHeader className="p-0">
                  <Link href={`/portfolio/${project.slug}`}>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-105"
                      data-ai-hint={project.aiHint}
                    />
                  </Link>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-headline text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-muted-foreground">{project.category}</p>
                </CardContent>
                <CardFooter>
                   <Button asChild variant="link" className="p-0 h-auto">
                     <Link href={`/portfolio/${project.slug}`}>Ver caso de estudio <ArrowRight className="ml-2 h-4 w-4"/></Link>
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">Ver todo el portafolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-16 md:py-24 bg-background relative">
        <div className="absolute top-0 left-0 right-0 text-secondary z-0 -translate-y-1/2">
            <svg viewBox="0 0 1440 100" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto">
                <path d="M0,50 C360,150 1080,-50 1440,50 L1440,0 L0,0 Z"></path>
            </svg>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
                <img
                src="https://placehold.co/600x800.png"
                alt="Retrato de Eikocolors"
                className="rounded-lg object-cover w-full h-full"
                data-ai-hint="designer portrait"
                />
            </div>
            <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold">La historia detrás del color</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                Mi nombre es Gloria, fundadora de Eikocolors. Mi pasión por el diseño nace de la creencia de que la estética y la estrategia pueden ir de la mano para crear un impacto real. Con 15 años de experiencia en imprenta, especializada en diseño de pre-imprenta, y formación profesional en Diseño Gráfico, fundé Eikocolors. Cada diseño es una obra de arte única y exclusiva, creada con un toque personal y basada estrictamente en las ideas y especificaciones de cada cliente. Tu visión es el punto de partida para mi creatividad.
                </p>
                <Button asChild size="lg" className="mt-6">
                    <Link href="/about">Conóceme mejor</Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Lo que dicen mis clientes</h2>
            <p className="mt-2 text-muted-foreground">La confianza es la base de cualquier gran proyecto.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col bg-card">
                <CardContent className="p-6 flex-grow">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground">{testimonial.quote}</p>
                </CardContent>
                <CardFooter className="p-6 border-t">
                    <div className="flex items-center">
                        <img
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
