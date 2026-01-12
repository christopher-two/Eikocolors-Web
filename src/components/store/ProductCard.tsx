'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { ShopProduct } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils'; // Assuming this utility exists or I will create it/inline it

interface ProductCardProps {
    product: ShopProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow bg-card border-2 border-transparent hover:border-primary/20 group">
            <div className="relative aspect-square overflow-hidden bg-secondary/20">
                <NextImage
                    src={product.images?.[0] || product.image || '/placeholder.png'}
                    alt={product.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                    <div className="text-sm text-primary font-medium mb-1">{product.category}</div>
                    <div className="font-bold text-lg">
                        ${product.price}
                    </div>
                </div>
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 gap-2">
                <Button asChild className="w-full" variant="outline">
                    <Link href={`/store/product/${product.id}`}>Ver Detalles</Link>
                </Button>
                <Button size="icon" onClick={() => addToCart(product)} disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4" />
                    <span className="sr-only">Agregar al carrito</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
