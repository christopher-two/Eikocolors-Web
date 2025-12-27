import { Mail, Phone, Facebook, Instagram, Clock, MapPin, MessageCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export default function ContactPage() {
    const contactItems = [
        {
            icon: Mail,
            title: "Email",
            subtitle: "eiko.colors@gmail.com",
            href: "mailto:eiko.colors@gmail.com",
            target: "_self"
        },
        {
            icon: MessageCircle,
            title: "WhatsApp",
            subtitle: "+52 452 101 2562",
            href: "https://wa.me/524521012562",
            target: "_blank"
        },
        {
            icon: Facebook,
            title: "Facebook",
            subtitle: "Eikocolors",
            href: "#",
            target: "_blank"
        },
        {
            icon: Instagram,
            title: "Instagram",
            subtitle: "@eikocolors",
            href: "#",
            target: "_blank"
        },
        {
            icon: Clock,
            title: "Horario",
            subtitle: "Lun - Sab: 9 AM - 9 PM",
            href: null,
            target: null
        },
        {
            icon: MapPin,
            title: "Ubicación",
            subtitle: "Uruapan, Michoacán",
            href: null,
            target: null
        }
    ];

    return (
        <div className="bg-background min-h-[80vh] flex flex-col items-center justify-center">
            <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="text-center mb-16">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Conecta Conmigo</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {contactItems.map((item, index) => (
                        item.href ? (
                            <Link
                                key={index}
                                href={item.href}
                                target={item.target || undefined}
                                rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                                className="block group"
                            >
                                <Card className="h-full bg-card hover:bg-zinc-900/50 transition-colors border-zinc-800">
                                    <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[200px]">
                                        <item.icon className="h-8 w-8 mb-4 text-purple-500" />
                                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground text-sm break-all">{item.subtitle}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ) : (
                            <div key={index} className="block">
                                <Card className="h-full bg-card border-zinc-800">
                                    <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full min-h-[200px]">
                                        <item.icon className="h-8 w-8 mb-4 text-purple-500" />
                                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground text-sm break-all">{item.subtitle}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    ))}
                </div>
            </section>
        </div>
    );
}
