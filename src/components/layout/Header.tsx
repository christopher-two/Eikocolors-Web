'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Sobre Mí' },
  { href: '/portfolio', label: 'Portafolio' },
  { href: '/services', label: 'Servicios' },
  { href: '/store',label: 'Tienda' },
  { href: '/contact', label: 'Contacto' },
  { href: '/assistant', label: 'Eikobot', icon: <Bot className="h-4 w-4 mr-1 text-accent" /> },
];

const Logo = () => (
    <Link href="/" className="flex items-center space-x-2">
        <span className="font-headline text-2xl font-bold text-primary">Eikocolors</span>
    </Link>
)

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
            <Logo />
        </div>
        
        <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between border-b pb-4">
                       <Logo />
                        <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">Cerrar menú</span>
                        </Button>
                    </div>
                    <nav className="flex flex-col items-start space-y-4 mt-6">
                        {navLinks.map(({ href, label, icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                    "text-lg font-medium transition-colors hover:text-primary",
                                    pathname === href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <div className="flex items-center">{icon}{label}</div>
                            </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
            </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none md:hidden">
              <Logo />
          </div>
          <nav className="hidden items-center space-x-6 md:flex">
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center",
                  pathname === href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {icon}{label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
