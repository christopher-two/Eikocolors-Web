'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { ServiceCategory } from '@/lib/types';
import { Check, Search } from 'lucide-react';
import Link from 'next/link';

interface ServicesClientProps {
  categories: ServiceCategory[];
}

export function ServicesClient({ categories }: ServicesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const allCategoryNames = ['Todos', ...categories.map(c => c.title)];

  const filteredCategories = useMemo(() => {
    let filtered = categories;

    if (activeFilter !== 'Todos') {
      filtered = filtered.filter(category => category.title === activeFilter);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered
        .map(category => {
          const matchingItems = category.items.filter(
            item =>
              item.name.toLowerCase().includes(lowercasedTerm) ||
              item.details.toLowerCase().includes(lowercasedTerm)
          );
          
          if (matchingItems.length > 0) {
            return { ...category, items: matchingItems };
          }
          
          if (category.title.toLowerCase().includes(lowercasedTerm) || category.description.toLowerCase().includes(lowercasedTerm)) {
            return category;
          }

          return null;
        })
        .filter((category): category is ServiceCategory => category !== null);
    }
    
    return filtered;
  }, [categories, searchTerm, activeFilter]);

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
        {filteredCategories.map(category => (
          <Card key={category.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {category.items.length > 0 ? (
                <ul className="space-y-4">
                  {category.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">{item.details}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">Esta categoría no tiene artículos detallados.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
         <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No se encontraron servicios que coincidan con tu búsqueda.</p>
            <p className="text-muted-foreground mt-2">Intenta con otros términos o limpia los filtros.</p>
          </div>
      )}

      <div className="text-center mt-16">
          <h2 className="font-headline text-3xl font-bold mb-4">¿No encuentras lo que buscas o tienes una idea especial?</h2>
          <p className="text-lg text-muted-foreground mb-8">¡No te preocupes! Me especializo en diseños personalizados. Contáctame y hagamos realidad tu proyecto.</p>
          <Button asChild size="lg">
              <Link href="/contact">Solicitar un servicio personalizado</Link>
          </Button>
      </div>
    </div>
  );
}
