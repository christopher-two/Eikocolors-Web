import { Package } from "lucide-react";

export default function StorePage() {
    return (
        <div className="bg-background">
            <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
                    <Package className="h-16 w-16 text-primary mb-6" />
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Tienda Próximamente</h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Estoy trabajando en una selección de productos digitales y físicos para ayudarte a potenciar tu marca. ¡Vuelve pronto para descubrir plantillas, láminas, y mucho más!
                    </p>
                </div>
            </section>
        </div>
    );
}
