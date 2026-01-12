import type { Metadata } from 'next';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/CartContext';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'Eikocolors Studio',
  description:
    'Portafolio y estudio de diseño de Eikocolors. Ayudamos a marcas a traducir sus valores en una identidad visual memorable.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={cn('min-h-screen bg-background font-body antialiased', ptSans.variable, playfairDisplay.variable)}>
        <CartProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1 pt-24">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
