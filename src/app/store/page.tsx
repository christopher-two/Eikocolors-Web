import { Package } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/store/ProductCard";

export default function StorePage() {
    return (
        <div className="bg-background min-h-screen">
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Catálogo de Productos</h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Explora nuestra selección de productos personalizados y servicios de diseño.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}
