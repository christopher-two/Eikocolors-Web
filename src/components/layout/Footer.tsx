
'use client';

import { Facebook, Github, Instagram } from 'lucide-react';
import Link from 'next/link';

const footerNav = [
    {
        title: "Estudio",
        items: [
            { label: "Sobre Mí", href: "/about" },
            { label: "Portafolio", href: "/portfolio" },
            { label: "Contacto", href: "/contact" },
        ]
    },
    {
        title: "Servicios",
        items: [
            { label: "Identidad de Marca", href: "/services" },
            { label: "Packaging", href: "/services" },
            { label: "Diseño Web", href: "/services" },
        ]
    },
    {
        title: "Legal",
        items: [
            { label: "Política de Privacidad", href: "#" },
            { label: "Términos y Condiciones", href: "#" },
        ]
    }
]

const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'GitHub', icon: Github, url: '#' },
]

const Logo = () => (
    <Link href="/" className="flex items-center space-x-2">
        <span className="font-headline text-2xl font-bold">Eikocolors</span>
    </Link>
)


export function Footer() {
  return (
    <footer className="bg-secondary text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="bg-card text-card-foreground rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 pr-8">
                    <Logo />
                    <p className="mt-4 text-muted-foreground">
                        Diseño gráfico estratégico para marcas de consumo consciente.
                    </p>
                </div>

                {footerNav.map((section) => (
                    <div key={section.title}>
                        <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                        <ul className="space-y-3">
                            {section.items.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                 <div>
                    <h3 className="font-semibold text-foreground mb-4">Social</h3>
                    <div className="flex items-center space-x-4">
                        {socialLinks.map((social) => (
                            <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <social.icon className="h-6 w-6" />
                                <span className="sr-only">{social.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Eikocolors. Todos los derechos reservados.</p>
                <p className="mt-4 sm:mt-0">
                    Desarrollado por{' '}
                    <Link href="https://christopher.com.mx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Christophertwo
                    </Link>
                    {' '}x{' '}
                    <Link href="https://override.com.mx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Override
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
}
