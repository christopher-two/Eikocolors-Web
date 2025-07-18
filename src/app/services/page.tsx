import { serviceCategories } from "@/lib/data";
import { ServicesClient } from "@/components/services/ServicesClient";

export default function ServicesPage() {
    return (
        <div className="bg-background">
            <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Mis Servicios</h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Descubre la variedad de soluciones de diseño y personalización que ofrezco para dar vida a tus ideas y potenciar tu marca. Desde la identidad visual hasta el último detalle para tus eventos.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
                <ServicesClient categories={serviceCategories} />
            </section>
        </div>
    )
}
