import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { testimonials } from '@/lib/data';
import { CheckCircle, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const specialties = [
    "Identidad Visual Estratégica",
    "Diseño de Packaging Sostenible",
    "Diseño de Interfaces (UI/UX) Centrado en el Usuario",
    "Ilustración Conceptual y Editorial"
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">La historia detrás del color</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Hola, soy Eikocolors. Mi viaje en el diseño no comenzó en un aula, sino con una fascinación por cómo las formas y los colores pueden contar historias y evocar emociones. Creo firmemente que el buen diseño es una herramienta poderosa para resolver problemas y construir puentes entre las marcas y las personas.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Mi misión es ayudar a marcas con propósito, especialmente aquellas en el espacio del consumo consciente, a articular sus valores a través de un diseño honesto, bello y funcional. No creo en las tendencias pasajeras, sino en crear identidades visuales atemporales que crezcan con tu negocio.
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
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13a10 10 0 0 1 10-10 10 10 0 0 1 10 10h-2a7 7 0 0 0-7-7 7 7 0 0 0-7 7z"/><path d="M12 21a10 10 0 0 0 10-10h-2a7 7 0 0 1-7 7z"/></svg>
                    </div>
                    <h3 className="font-headline text-2xl font-semibold">Sostenibilidad</h3>
                    <p className="mt-2 text-muted-foreground">Diseño con conciencia, eligiendo materiales y procesos que respetan nuestro planeta.</p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gem"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M12 22V9"/><path d="m3.5 8.5 17 0"/><path d="m2 9 4-6"/><path d="m22 9-4-6"/></svg>
                     </div>
                    <h3 className="font-headline text-2xl font-semibold">Minimalismo</h3>
                    <p className="mt-2 text-muted-foreground">Busco la claridad y la esencia. Menos es más cuando cada elemento tiene un propósito.</p>
                </div>
                 <div className="flex flex-col items-center">
                     <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9.2 18 8a6 6 0 0 0-12 0c0 1.2.3 2.2 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                     </div>
                    <h3 className="font-headline text-2xl font-semibold">Innovación</h3>
                    <p className="mt-2 text-muted-foreground">Me mantengo curiosa y en constante aprendizaje para ofrecer soluciones frescas y efectivas.</p>
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
