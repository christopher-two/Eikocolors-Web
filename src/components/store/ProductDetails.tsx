'use client';

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    // Ensure selected image is set if not already (safeguard)
    if (!selectedImage && product.images.length > 0) {
        setSelectedImage(product.images[0]);
    }

    return (
        <div className="bg-background min-h-screen pb-16">
            <div className="container mx-auto px-4 md:px-6 py-8">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/store">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver a la tienda
                    </Link>
                </Button>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Gallery Section */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg border bg-secondary/20">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className={cn(
                                        "aspect-square relative overflow-hidden rounded-md border-2 transition-all",
                                        selectedImage === image ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary/50"
                                    )}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col justify-center">
                        <div>
                            <span className="text-primary font-medium tracking-wide text-sm uppercase">
                                {product.category}
                            </span>
                            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-2 mb-4">
                                {product.name}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t">
                            <h3 className="font-semibold mb-4">Selecciona un diseño:</h3>
                            <div className="text-sm text-muted-foreground mb-6">
                                <p>Estás viendo el diseño: <span className="font-medium text-foreground">
                                    {product.images.indexOf(selectedImage) + 1} de {product.images.length}
                                </span></p>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="flex-1 text-lg h-14"
                                    onClick={() => addToCart(product, 1, selectedImage)}
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Agregar al Carrito
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                * Este producto se agregará al carrito con el diseño seleccionado.
                                El pago y los detalles finales se acordarán por WhatsApp.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
