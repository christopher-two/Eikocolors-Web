'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    priceRange: [number, number];
    onPriceRangeChange: (range: [number, number]) => void;
    inStockOnly: boolean;
    onInStockChange: (inStock: boolean) => void;
    maxPrice: number;
    onClearFilters: () => void;
}

export function ProductFilters({
    categories,
    selectedCategory,
    onSelectCategory,
    priceRange,
    onPriceRangeChange,
    inStockOnly,
    onInStockChange,
    maxPrice,
    onClearFilters
}: ProductFiltersProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Filtros</h3>
                <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2 lg:px-3">
                    Limpiar todo
                </Button>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select value={selectedCategory} onValueChange={onSelectCategory}>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label>Precio</Label>
                        <span className="text-sm text-muted-foreground">
                            ${priceRange[0]} - ${priceRange[1]}
                        </span>
                    </div>
                    <Slider
                        min={0}
                        max={maxPrice}
                        step={10}
                        value={[priceRange[0], priceRange[1]]}
                        onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                        className="w-full"
                    />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                        id="instock"
                        checked={inStockOnly}
                        onCheckedChange={(checked) => onInStockChange(checked as boolean)}
                    />
                    <Label htmlFor="instock" className="cursor-pointer">
                        Solo en stock
                    </Label>
                </div>
            </div>
        </div>
    );
}
