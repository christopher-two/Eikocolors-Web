'use client';

import { useEffect, useState } from 'react';
import { getAllProducts, getCategories } from "@/lib/shop";
import { StoreClient } from "@/components/store/StoreClient";
import { ShopProduct, Category } from "@/lib/types";

export default function StorePage() {
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getAllProducts(),
                    getCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch shop data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse text-primary">Cargando tienda...</div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen">
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Catálogo de Productos</h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Explora nuestra selección de productos personalizados y servicios de diseño.
                    </p>
                </div>

                <StoreClient initialProducts={products} categories={categories} />
            </section>
        </div>
    );
}
