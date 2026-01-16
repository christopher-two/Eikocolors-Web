'use client';

import { useState, useMemo } from 'react';
import { Category, ShopProduct, ShopCollection } from '@/lib/types';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductFilters } from '@/components/store/ProductFilters';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, ChevronLeft, LayoutGrid } from 'lucide-react';

interface StoreClientProps {
    initialProducts: ShopProduct[];
    categories: Category[];
    collections: ShopCollection[];
}

export function StoreClient({ initialProducts, categories, collections }: StoreClientProps) {
    const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);

    const hasCollections = collections.length > 0;
    const showCollectionGrid = hasCollections && selectedCollectionId === null;

    // Determine max price dynamically
    const maxPrice = useMemo(() => {
        const numericPrices = initialProducts
            .map(p => Number(p.price))
            .filter((v) => Number.isFinite(v) && v >= 0);
        return numericPrices.length ? Math.max(...numericPrices) : 1000;
    }, [initialProducts]);

    const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

    // Filter products based on collection and filters
    const filteredProducts = useMemo(() => {
        const active = collections.find(c => c.id === selectedCollectionId);

        return initialProducts.filter(product => {
            const matchCollection = !selectedCollectionId || product.collectionId === selectedCollectionId || (active?.productIds?.includes(product.id));
            const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const upper = Number.isFinite(priceRange[1]) ? priceRange[1] : Infinity;
            const matchPrice = product.price >= priceRange[0] && product.price <= upper;
            const matchStock = !inStockOnly || product.inStock;

            return matchCollection && matchCategory && matchPrice && matchStock;
        });
    }, [initialProducts, selectedCollectionId, selectedCategory, priceRange, inStockOnly, collections]);

    const activeCollection = useMemo(() =>
        collections.find(c => c.id === selectedCollectionId),
        [collections, selectedCollectionId]
    );

    const headerTitle = activeCollection?.name || 'Todos los productos';

    const handleClearFilters = () => {
        setSelectedCategory('all');
        setPriceRange([0, maxPrice]);
        setInStockOnly(false);
    };

    // If no collection is selected and there are collections, show the Collection grid
    if (showCollectionGrid) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {collections.map((collection) => (
                    <Card
                        key={collection.id}
                        className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-primary/10 hover:border-primary/40 bg-card/50 backdrop-blur-sm"
                        onClick={() => setSelectedCollectionId(collection.id)}
                    >
                        <CardContent className="p-0">
                            <div className="relative h-48 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-background to-secondary/30">
                                <span className="text-xs font-bold tracking-[0.2em] text-primary/60 mb-3 uppercase">Colección Especial</span>
                                <h3 className="text-2xl md:text-3xl font-bold font-headline tracking-tight group-hover:scale-105 transition-transform duration-500">
                                    {collection.name}
                                </h3>
                                <div className="mt-6 h-1 w-12 bg-primary/20 group-hover:w-24 group-hover:bg-primary transition-all duration-500 rounded-full" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Store Header / Back Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                <div>
                    {hasCollections && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCollectionId(null)}
                            className="mb-2 -ml-2 text-muted-foreground hover:text-primary"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Volver a Colecciones
                        </Button>
                    )}
                    <h2 className="text-3xl font-bold font-headline">{headerTitle}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{filteredProducts.length} Productos</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Mobile Filters Trigger */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full flex gap-2">
                                <Filter className="w-4 h-4" />
                                Filtrar Productos
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <ProductFilters
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                priceRange={priceRange}
                                onPriceRangeChange={setPriceRange}
                                inStockOnly={inStockOnly}
                                onInStockChange={setInStockOnly}
                                maxPrice={maxPrice}
                                onClearFilters={handleClearFilters}
                            />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Filters Sidebar */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <ProductFilters
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            priceRange={priceRange}
                            onPriceRangeChange={setPriceRange}
                            inStockOnly={inStockOnly}
                            onInStockChange={setInStockOnly}
                            maxPrice={maxPrice}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border rounded-lg bg-muted/50">
                            <p className="text-lg font-medium">No se encontraron productos</p>
                            <p className="text-muted-foreground">Intenta ajustar tus filtros</p>
                            <Button variant="link" onClick={handleClearFilters} className="mt-2">
                                Limpiar filtros
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
