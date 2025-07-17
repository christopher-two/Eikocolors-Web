
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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

const NavLink = ({ href, label, icon: Icon, onClick }: { href: string; label: string; icon?: React.ElementType, onClick?: () => void }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "font-medium transition-all duration-300 hover:text-primary flex items-center text-sm px-4 py-2 rounded-full",
                isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
            )}
        >
            {Icon && <Icon className={cn("h-4 w-4 mr-1", isActive ? "text-accent" : "")} />}
            {label}
        </Link>
    );
};


export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-max px-4">
      <div className="container flex h-16 items-center justify-center p-0">
        
        <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm rounded-full">
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
                    {isClient && (
                      <nav className="flex flex-col items-start space-y-2 mt-6">
                          {navLinkItems.map((item) => (
                              <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setMenuOpen(false)}
                                  className={cn(
                                    "font-medium transition-colors hover:text-primary flex items-center text-lg w-full p-4 rounded-md",
                                    pathname === item.href ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
                                  )}
                              >
                                {item.icon && <item.icon className="h-5 w-5 mr-2" />}
                                {item.label}
                              </Link>
                          ))}
                      </nav>
                    )}
                </div>
            </SheetContent>
            </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-center">
          {isClient && !isMobile && (
            <nav className="hidden items-center space-x-2 md:flex bg-background/80 backdrop-blur-sm p-2 rounded-full border shadow-sm">
              {navLinkItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
