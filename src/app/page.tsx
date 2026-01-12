import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NextImage from 'next/image';
import heroImage from '@/app/assets/fondo.webp';
import Link from 'next/link';
import { clients } from '@/lib/data';

export default function Home() {
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
              <Link href="/services">Explorar mis servicios</Link>
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

      <section id="about" className="w-full py-16 md:py-24 bg-secondary relative">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
            <NextImage
              src={heroImage}
              alt="Retrato de Eikocolors"
              className="rounded-lg object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
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
        <div className="absolute bottom-0 left-0 right-0 text-background z-0">
          <svg viewBox="0 0 1440 100" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto">
            <path d="M0,50 C360,150 1080,-50 1440,50 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      <section id="clients" className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Confían en mi trabajo</h2>
            <p className="mt-2 text-muted-foreground">La confianza es la base de cualquier gran proyecto.</p>
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
