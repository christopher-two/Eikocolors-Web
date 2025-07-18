import { getPortfolioProjects, getProjectBySlug } from "@/services/portfolioService";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/types";

export async function generateStaticParams() {
  const projects = getPortfolioProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project: PortfolioProject | null = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background">
      <section className="bg-secondary">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
            <Badge variant="outline" className="mb-4">{project.category}</Badge>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">{project.title}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{project.client}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <img
          src={project.imageUrl}
          alt={`Imagen principal del proyecto ${project.title}`}
          width={1200}
          height={675}
          className="rounded-lg shadow-lg mx-auto"
          data-ai-hint={project.aiHint}
        />
      </div>

      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
                <h2 className="font-headline text-2xl font-bold sticky top-24">El Caso de Estudio</h2>
            </div>
            <div className="md:col-span-1 lg:col-span-2 space-y-12">
                <div>
                    <h3 className="font-headline text-3xl font-semibold mb-4">El Desafío</h3>
                    <p className="text-lg text-muted-foreground">{project.challenge}</p>
                </div>
                <div>
                    <h3 className="font-headline text-3xl font-semibold mb-4">Mi Proceso</h3>
                    <p className="text-lg text-muted-foreground">{project.process}</p>
                </div>
                <div>
                    <h3 className="font-headline text-3xl font-semibold mb-4">La Solución Visual</h3>
                    <p className="text-lg text-muted-foreground">{project.solution}</p>
                </div>
                <div>
                    <h3 className="font-headline text-3xl font-semibold mb-4">Resultados e Impacto</h3>
                    <p className="text-lg text-muted-foreground">{project.impact}</p>
                </div>
            </div>
        </div>
      </section>

        {project.testimonial && (
            <section className="bg-secondary py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <Card className="max-w-3xl mx-auto bg-background shadow-lg">
                        <CardContent className="p-8 md:p-12 text-center">
                            <Quote className="w-10 h-10 text-primary mx-auto mb-6" />
                            <p className="font-headline text-2xl md:text-3xl font-medium">"{project.testimonial}"</p>
                            <p className="mt-6 font-semibold">{project.client}</p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        )}

      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.images.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img
                        src={image.url}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className="w-full object-cover"
                        data-ai-hint={image.aiHint}
                    />
                </div>
            ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16 text-center">
            <h2 className="font-headline text-3xl font-bold mb-4">¿Te gusta lo que ves?</h2>
            <p className="text-lg text-muted-foreground mb-8">Veamos cómo podemos crear algo increíble para tu marca.</p>
            <Button asChild size="lg">
                <Link href="/contact">Contacta conmigo</Link>
            </Button>
      </section>
    </div>
  );
}
