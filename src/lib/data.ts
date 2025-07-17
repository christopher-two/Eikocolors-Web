import type { Testimonial, ServicePackage } from './types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Eikocolors capturó la esencia de nuestra marca a la perfección. El diseño no solo es hermoso, sino que cuenta nuestra historia y conecta con nuestros clientes.',
    name: 'Ana García',
    title: 'Fundadora, Café Origen',
    avatarUrl: 'https://placehold.co/100x100.png',
  },
  {
    id: '2',
    quote: 'El trabajo de Eikocolors elevó nuestra marca. El packaging es ahora uno de nuestros principales diferenciadores y un punto de atracción para los clientes.',
    name: 'Carlos Mendoza',
    title: 'CEO, Piel Pura',
    avatarUrl: 'https://placehold.co/100x100.png',
  },
  {
    id: '3',
    quote: 'Transformó nuestra herramienta. Ahora es potente, fácil de usar y visualmente atractiva, lo que ha sido clave para la retención de clientes.',
    name: 'Sofia Reyes',
    title: 'Directora de Marketing, DataFlow Inc.',
    avatarUrl: 'https://placehold.co/100x100.png',
  },
];


export const servicePackages: ServicePackage[] = [
    {
        id: '1',
        title: "Identidad de Marca Completa",
        idealFor: "Startups y marcas en evolución que buscan una base visual sólida y coherente.",
        benefits: [
            "Coherencia total en todos los puntos de contacto.",
            "Diferenciación clara en tu mercado.",
            "Una base sólida para crecer y escalar.",
            "Conexión emocional con tu audiencia."
        ],
        deliverables: [
            "Logo principal, secundario y submarcas.",
            "Paleta de colores y tipografías.",
            "Manual de marca completo.",
            "Diseño de papelería básica (tarjetas, etc).",
            "Plantillas para redes sociales."
        ],
    },
    {
        id: '2',
        title: "Diseño de Packaging Estratégico",
        idealFor: "Marcas de productos de consumo que quieren enamorar desde el estante.",
        benefits: [
            "Destaca frente a la competencia.",
            "Comunica la calidad y los valores de tu producto.",
            "Mejora la experiencia de unboxing del cliente.",
            "Diseño optimizado para producción."
        ],
        deliverables: [
            "Diseño de etiquetas, cajas o envases.",
            "Selección de materiales y acabados.",
            "Mockups 3D realistas.",
            "Archivos finales listos para imprenta.",
            "Guía de aplicación del diseño."
        ],
    },
    {
        id: '3',
        title: "Ilustraciones con Alma",
        idealFor: "Empresas que necesitan un toque único y personal para su web, contenido o productos.",
        benefits: [
            "Estilo visual único y diferenciador.",
            "Comunica conceptos complejos de forma simple.",
            "Añade personalidad y calidez a tu marca.",
            "Contenido 100% original y a medida."
        ],
        deliverables: [
            "Serie de ilustraciones personalizadas.",
            "Iconografía a medida para web o apps.",
            "Ilustraciones para packaging o editorial.",
            "Adaptación a diferentes formatos.",
            "Entrega en formatos vectoriales y rasterizados."
        ],
    }
];
