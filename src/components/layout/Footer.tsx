import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15.2 9.4a2.6 2.6 0 0 1-2.2 0H8.5v5.3h4.5a2.6 2.6 0 0 0 2.2-4.4Z"/>
        <path d="M8.5 9.4h2.2a2.6 2.6 0 0 1 0 5.3H8.5Z"/>
        <path d="M2.8 14.1a3.5 3.5 0 0 0 3.3 3.3H18a3.5 3.5 0 0 0 3.3-3.3V9.8a3.5 3.5 0 0 0-3.3-3.3H6.1a3.5 3.5 0 0 0-3.3 3.3Z"/>
        <path d="M15.8 7.4h.7"/>
    </svg>
)

const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'Behance', icon: BehanceIcon, url: '#' },
]

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <span className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Eikocolors Studio. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                    <Link href={social.url} target="_blank" rel="noopener noreferrer">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.name}</span>
                    </Link>
                </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
