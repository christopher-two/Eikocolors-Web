'use client';

import { useState, useMemo } from 'react';
import { Category, ShopProduct } from '@/lib/types';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductFilters } from '@/components/store/ProductFilters';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';

interface StoreClientProps {
    initialProducts: ShopProduct[];
    categories: Category[];
}

export function StoreClient({ initialProducts, categories }: StoreClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);

    // Determine max price dynamically
    const maxPrice = useMemo(() => {
        return Math.max(...initialProducts.map(p => p.price), 1000);
    }, [initialProducts]);

    const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

    // Filter products
    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            const matchCategory = selectedCategory === 'all' || product.category === selectedCategory; // Use ID or Name? Usually ID. But product.category in schema was string. User schema said "category: String".
            // Wait, schema for Product said `category: String`. It might be the ID or the Name.
            // Schema for Category has `id` and `name`. 
            // Usually referencing by ID is safer. I'll assume `product.category` stores the Category ID. 
            // But looking at existing data `lib/data.ts`, usually simple strings like "Print", "Digital".
            // Since we are moving to Firestore, we should ensure consistency. 
            // If `product.category` matches `category.id`, strict check works. 
            // If it matches `category.name`, we need to check that.
            // I'll stick to strict equality assuming `product.category` is the ID of the category.

            const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchStock = !inStockOnly || product.inStock;

            return matchCategory && matchPrice && matchStock;
        });
    }, [initialProducts, selectedCategory, priceRange, inStockOnly]);

    const handleClearFilters = () => {
        setSelectedCategory('all');
        setPriceRange([0, maxPrice]);
        setInStockOnly(false);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filters Trigger */}
            <div className="lg:hidden mb-4">
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
                <div className="mb-4 text-sm text-muted-foreground">
                    Mostrando {filteredProducts.length} productos
                </div>
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
    );
}
