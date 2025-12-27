'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { ServiceCategory, ServiceItem } from '@/lib/types';
import { Search, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface ServicesClientProps {
  categories: ServiceCategory[];
}

interface EnrichedServiceItem extends ServiceItem {
  categoryId: string;
  categoryTitle: string;
  categoryDescription?: string;
  isCategoryCard?: boolean;
}

export function ServicesClient({ categories }: ServicesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const allCategoryNames = ['Todos', ...categories.map(c => c.title)];

  const allServices = useMemo(() => {
    return categories.flatMap(category => {
      if (category.items.length === 0) {
        return [{
          name: category.title,
          details: category.description,
          categoryId: category.id,
          categoryTitle: category.title,
          isCategoryCard: true,
        }] as EnrichedServiceItem[];
      }
      return category.items.map(item => ({
        ...item,
        categoryId: category.id,
        categoryTitle: category.title,
        isCategoryCard: false,
      }));
    });
  }, [categories]);


  const filteredServices = useMemo(() => {
    let filtered = allServices;

    if (activeFilter !== 'Todos') {
      filtered = filtered.filter(service => service.categoryTitle === activeFilter);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        service =>
          service.name.toLowerCase().includes(lowercasedTerm) ||
          service.details.toLowerCase().includes(lowercasedTerm)
      );
    }

    return filtered;
  }, [allServices, searchTerm, activeFilter]);

  return (
    <div>
      <div className="mb-12 space-y-6">
        <div className="relative w-full max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="¿Qué servicio buscas?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {allCategoryNames.map(name => (
            <Button
              key={name}
              variant={activeFilter === name ? 'default' : 'outline'}
              onClick={() => setActiveFilter(name)}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <Card key={`${service.categoryId}-${index}`} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{service.name}</CardTitle>
              {!service.isCategoryCard && <Badge variant="secondary" className="w-fit">{service.categoryTitle}</Badge>}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">{service.details}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" variant="outline" asChild>
                <a
                  href={`https://wa.me/524521012562?text=Hola,%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(service.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  Cotizar por WhatsApp
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No se encontraron servicios que coincidan con tu búsqueda.</p>
          <p className="text-muted-foreground mt-2">Intenta con otros términos o limpia los filtros.</p>
        </div>
      )}

      <div className="text-center mt-16">
        <h2 className="font-headline text-3xl font-bold mb-4">¿No encuentras lo que buscas o tienes una idea especial?</h2>
        <p className="text-lg text-muted-foreground mb-8">¡No te preocupes! Me especializo en diseños personalizados. Contáctame y hagamos realidad tu proyecto.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Solicitar un servicio personalizado</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a
              href="https://wa.me/524521012562?text=Hola,%20tengo%20una%20idea%20especial%20y%20me%20gustar%C3%ADa%20cotizarla"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              Contactar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
