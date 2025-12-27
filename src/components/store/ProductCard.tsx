'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow bg-card border-2 border-transparent hover:border-primary/20 group">
            <div className="relative aspect-square overflow-hidden bg-secondary/20">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <CardHeader className="p-4">
                <div className="text-sm text-primary font-medium mb-1">{product.category}</div>
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 gap-2">
                <Button asChild className="w-full" variant="outline">
                    <Link href={`/store/product/${product.id}`}>Ver Detalles</Link>
                </Button>
                <Button size="icon" onClick={() => addToCart(product)}>
                    <ShoppingCart className="h-4 w-4" />
                    <span className="sr-only">Agregar al carrito</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
