'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PortfolioProject } from '@/lib/types';


interface PortfolioClientProps {
  projects: PortfolioProject[];
  categories: string[];
}

export function PortfolioClient({ projects, categories }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProjects = activeCategory === 'Todos'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        <Button
          variant={activeCategory === 'Todos' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('Todos')}
        >
          Todos
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <Card key={project.slug} className="overflow-hidden group">
            <CardHeader className="p-0">
              <Link href={`/portfolio/${project.slug}`}>
                <div className="aspect-w-3 aspect-h-2">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={project.aiHint}
                  />
                </div>
              </Link>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{project.category}</p>
              <h3 className="font-headline text-2xl font-semibold mt-1">{project.title}</h3>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="p-0 h-auto font-semibold">
                <Link href={`/portfolio/${project.slug}`}>
                  Ver caso de estudio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
