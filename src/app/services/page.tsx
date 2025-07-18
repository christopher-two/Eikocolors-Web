import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { serviceCategories } from "@/lib/data";
import { Check } from "lucide-react";
import Link from "next/link";

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
                <div className="max-w-4xl mx-auto">
                     <Accordion type="single" collapsible className="w-full">
                        {serviceCategories.map((category) => (
                             <AccordionItem value={category.id} key={category.id}>
                                <AccordionTrigger className="font-headline text-2xl hover:no-underline">{category.title}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground mb-6">{category.description}</p>
                                    <ul className="space-y-4">
                                        {category.items.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold">{item.name}</h4>
                                                    <p className="text-muted-foreground text-sm">{item.details}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                     </Accordion>
                </div>
                 <div className="text-center mt-16">
                    <h2 className="font-headline text-3xl font-bold mb-4">¿Lista para empezar?</h2>
                    <p className="text-lg text-muted-foreground mb-8">Contáctame y hagamos que tu proyecto sea una realidad.</p>
                    <Button asChild size="lg">
                        <Link href="/contact">Solicitar un servicio</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
