'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinkItems = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Sobre Mí' },
  { href: '/portfolio', label: 'Portafolio' },
  { href: '/services', label: 'Servicios' },
  { href: '/store',label: 'Tienda' },
  { href: '/contact', label: 'Contacto' },
  { href: '/assistant', label: 'Eikobot', icon: Bot },
];

const Logo = () => (
    <Link href="/" className="flex items-center space-x-2">
        <span className="font-headline text-2xl font-bold text-primary">Eikocolors</span>
    </Link>
)

const NavLink = ({ href, label, icon: Icon, onClick, isMobile = false }: { href: string; label: string; icon?: React.ElementType, onClick?: () => void, isMobile?: boolean }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "font-medium transition-colors hover:text-primary flex items-center",
                isMobile ? "text-lg" : "text-sm",
                isActive ? "text-primary" : "text-muted-foreground"
            )}
        >
            {Icon && <Icon className={cn("h-4 w-4 mr-1", isActive ? "text-accent" : "")} />}
            {label}
        </Link>
    );
};

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
                        {navLinkItems.map((item) => (
                            <NavLink
                                key={item.href}
                                {...item}
                                isMobile={true}
                                onClick={() => setMenuOpen(false)}
                            />
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
            {navLinkItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
