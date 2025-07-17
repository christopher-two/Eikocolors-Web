import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { servicePackages } from "@/lib/data";
import { Check } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    return (
        <div className="bg-background">
            <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Soluciones de diseño para hacer crecer tu marca</h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Ofrezco paquetes de servicios diseñados para resolver problemas específicos y entregar resultados tangibles. Cada paquete es una colaboración estratégica para llevar tu marca al siguiente nivel.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {servicePackages.map((pkg, index) => (
                        <Card key={index} className="flex flex-col h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">{pkg.title}</CardTitle>
                                <CardDescription className="pt-2">{pkg.idealFor}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="mb-6">
                                    <h4 className="font-bold mb-3">Beneficios:</h4>
                                    <ul className="space-y-2">
                                        {pkg.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start">
                                                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-3">¿Qué incluye?</h4>
                                    <ul className="space-y-2">
                                        {pkg.deliverables.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full font-bold text-lg" size="lg">
                                    <Link href="/contact">Solicitar este servicio</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}
