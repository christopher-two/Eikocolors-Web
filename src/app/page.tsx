import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredProjects, testimonials } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full pt-20 md:pt-32 lg:pt-40 bg-background relative">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto">
            Ayudo a marcas de consumo consciente a traducir sus valores en una identidad visual memorable.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Soy Eikocolors, una diseñadora gráfica estratégica. Mi misión es crear diseños que no solo se vean bien, sino que conecten con tu audiencia, cuenten tu historia y potencien tus ventas.
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
        <div className="absolute bottom-0 left-0 right-0 text-secondary">
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
                    <Image
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

      <section id="about" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
                <Image
                src="https://placehold.co/600x800.png"
                alt="Retrato de Eikocolors"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="designer portrait"
                />
            </div>
            <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold">La historia detrás del color</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                Mi pasión por el diseño nació de la creencia de que la estética y la estrategia pueden ir de la mano para crear un impacto real. No se trata solo de crear algo bonito, sino de resolver problemas, comunicar valores y construir conexiones duraderas.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                Con un enfoque en la sostenibilidad y el minimalismo, ayudo a marcas con propósito a encontrar su voz visual y a destacarse en un mercado saturado.
                </p>
                <Button asChild size="lg" className="mt-6">
                    <Link href="/about">Conóceme mejor</Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Lo que dicen mis clientes</h2>
            <p className="mt-2 text-muted-foreground">La confianza es la base de cualquier gran proyecto.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col">
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
