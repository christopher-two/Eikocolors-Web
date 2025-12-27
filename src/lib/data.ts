import type { Testimonial, ServicePackage, ServiceCategory, Client } from './types';

export const clients: Client[] = [
  {
    id: '1',
    name: 'Café Origen',
    logoUrl: 'https://placehold.co/200x100?text=Cafe+Origen',
    description: 'Diseño de identidad de marca completa, incluyendo logo, paleta de colores y packaging para su nueva línea de café orgánico.',
    websiteUrl: 'https://example.com/cafe-origen',
  },
  {
    id: '2',
    name: 'Piel Pura',
    logoUrl: 'https://placehold.co/200x100?text=Piel+Pura',
    description: 'Rediseño de etiquetas y packaging para productos de cuidado de la piel, enfocándose en una imagen minimalista y sostenible.',
    websiteUrl: 'https://example.com/piel-pura',
  },
  {
    id: '3',
    name: 'DataFlow',
    logoUrl: 'https://placehold.co/200x100?text=DataFlow',
    description: 'Creación de ilustraciones personalizadas y diseño de interfaz para su plataforma de análisis de datos.',
    websiteUrl: 'https://example.com/dataflow',
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

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'design',
    title: 'Diseño Gráfico Integral',
    description: 'Ofrecemos servicios de diseño gráfico en general, creando soluciones visuales que comunican tu mensaje de manera efectiva y atractiva. Cada proyecto es abordado con un enfoque personalizado para asegurar que tu marca destaque.',
    items: []
  },
  {
    id: 'custom-items',
    title: 'Artículos Personalizados',
    description: 'Dale un toque único a tus objetos cotidianos y promocionales con nuestros servicios de personalización:',
    items: [
      { name: 'Tazas, Termos, Vasos y Tequileros', details: 'Personalizados con diversas técnicas como DTF, sublimado, vinil, DTF UV y serigrafía. Incluye diseño a medida y el artículo de tu preferencia.' },
      { name: 'Playeras, Sudaderas, Gorras y Mandiles', details: 'Diseños exclusivos para cualquier tamaño, con el diseño ya incluido en el costo.' },
      { name: 'Pañaleros Personalizados', details: 'Diseños creativos incluidos para cualquier tamaño, perfectos para los más pequeños.' },
      { name: 'Cojines', details: 'Con diseño personalizado y el tipo de cojín que prefieras.' },
      { name: 'Velas', details: 'Diseño personalizado y el tipo de vela que elijas.' },
    ]
  },
  {
    id: 'printing-cutting',
    title: 'Impresión y Corte Especializado',
    description: 'Contamos con soluciones de impresión y corte para tus necesidades:',
    items: [
      { name: 'Corte de Vinil', details: 'Incluye diseño personalizado y el tipo de vinil que prefieras.' },
      { name: 'Lonas Personalizadas', details: 'Con diseño a medida y el tamaño que necesites.' },
      { name: 'Sellos (Madera, Textil y Automático)', details: 'Diseño personalizado y el tipo de sello de tu elección.' },
      { name: 'Etiqueta Textil', details: 'Diseño personalizado y el tipo de etiqueta que prefieras.' },
      { name: 'Etiquetas Escolares', details: 'Con diseño personalizado y el tamaño que el cliente prefiera.' },
      { name: 'Etiquetas Personalizadas', details: 'Diseño a medida y el tamaño que desees.' },
    ]
  },
  {
    id: 'stationery',
    title: 'Papelería y Documentos',
    description: 'Profesionaliza tu imagen con nuestra papelería personalizada:',
    items: [
      { name: 'Tarjetas de Presentación (una o dos vistas)', details: 'Incluye diseño personalizado. El diseño está incluido en el costo a partir de un millar. Para paquetes de 50, 100 o 200 unidades, el diseño no está incluido en el costo.' },
      { name: 'Notas de Venta', details: 'Disponibles al tamaño requerido, a partir de 100 unidades, con diseño incluido.' },
      { name: 'Papelería Empresarial en General', details: 'Soluciones completas para todas tus necesidades de papelería corporativa.' },
      { name: 'Calendarios', details: 'Diseño personalizado y el tipo de calendario que prefieras.' },
    ]
  },
  {
    id: 'events',
    title: 'Eventos y Celebraciones',
    description: 'Haz tus momentos especiales aún más memorables con nuestros artículos personalizados para eventos:',
    items: [
      { name: 'Recuerdos Personalizados', details: 'Ideales para revelación de género, baby shower, bautizo, presentación, primera comunión, servilletas, confirmación, XV años, bodas, despedidas de soltero/a, cumpleaños en general, y fechas especiales.' },
      { name: 'Dulceros Personalizados', details: 'Incluye diseño y estilo a preferencia del cliente.' },
      { name: 'Invitaciones', details: 'Con diseño personalizado y el tipo de invitación que prefieras.' },
      { name: 'Servicios Luctuosos', details: 'Diseño personalizado y el tipo de servicio que el cliente prefiera.' },
    ]
  },
  {
    id: 'bags',
    title: 'Bolsas Personalizadas',
    description: 'Bolsas para toda ocasión con un toque único:',
    items: [
      { name: 'Bolsas', details: 'Diseño personalizado y el tipo de bolsa que prefieras.' },
      { name: 'Bolsas de Papel Craft', details: 'Diseño personalizado y el tipo de bolsa que elijas.' },
    ]
  }
];

export const products: import('./types').Product[] = [
  {
    id: '1',
    name: 'Taza Personalizada',
    description: 'Taza de cerámica de alta calidad con diseño personalizado. Perfecta para regalos o uso corporativo.',
    category: 'Artículos Personalizados',
    images: [
      'https://placehold.co/600x600?text=Taza+1',
      'https://placehold.co/600x600?text=Taza+2',
      'https://placehold.co/600x600?text=Taza+3'
    ]
  },
  {
    id: '2',
    name: 'Playera Estampada',
    description: 'Playera de algodón con estampado duradero. Disponible en varias tallas y colores.',
    category: 'Artículos Personalizados',
    images: [
      'https://placehold.co/600x600?text=Playera+1',
      'https://placehold.co/600x600?text=Playera+2'
    ]
  },
  {
    id: '3',
    name: 'Paquete de Branding Básico',
    description: 'Incluye diseño de logotipo, paleta de colores y tarjeta de presentación.',
    category: 'Diseño Gráfico',
    images: [
      'https://placehold.co/600x600?text=Branding+1',
      'https://placehold.co/600x600?text=Branding+2'
    ]
  },
  {
    id: '4',
    name: 'Tarjetas de Presentación (1000 pzas)',
    description: 'Impresión de tarjetas de presentación a color, laminado mate, una o dos caras.',
    category: 'Papelería',
    images: [
      'https://placehold.co/600x600?text=Tarjetas+1',
      'https://placehold.co/600x600?text=Tarjetas+2'
    ]
  },
  {
    id: '5',
    name: 'Invitación Digital',
    description: 'Invitación interactiva para eventos, lista para enviar por WhatsApp.',
    category: 'Eventos',
    images: [
      'https://placehold.co/600x600?text=Invitacion+1',
      'https://placehold.co/600x600?text=Invitacion+2'
    ]
  },
  {
    id: '6',
    name: 'Bolsa Kraft Personalizada',
    description: 'Bolsas de papel kraft con tu logo impreso, ideales para tiendas y boutiques.',
    category: 'Bolsas',
    images: [
      'https://placehold.co/600x600?text=Bolsa+1',
      'https://placehold.co/600x600?text=Bolsa+2'
    ]
  }
];
