import { PortfolioClient } from '@/components/portfolio/PortfolioClient';
import { getPortfolioProjects } from '@/services/portfolioService';
import type { PortfolioProject } from '@/lib/types';

export default async function PortfolioPage() {
  const projects: PortfolioProject[] = await getPortfolioProjects();
  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Portafolio</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Aquí puedes explorar una selección de mis proyectos. Cada uno es una historia de colaboración, estrategia y creatividad, diseñada para resolver un desafío único.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <PortfolioClient projects={projects} categories={categories} />
      </section>
    </div>
  );
}
