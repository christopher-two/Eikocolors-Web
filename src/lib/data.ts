import type { Testimonial, ServicePackage, ServiceCategory } from './types';

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
