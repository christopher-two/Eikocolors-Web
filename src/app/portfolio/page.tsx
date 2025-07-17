import { PortfolioClient } from '@/components/portfolio/PortfolioClient';
import { portfolioProjects } from '@/lib/data';

export default function PortfolioPage() {
  const categories = [...new Set(portfolioProjects.map(p => p.category))];

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
        <PortfolioClient projects={portfolioProjects} categories={categories} />
      </section>
    </div>
  );
}
