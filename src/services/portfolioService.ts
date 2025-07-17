/**
 * @fileoverview Servicio para interactuar con la base de datos de Firestore.
 * 
 * Este archivo gestiona la obtención de datos para las diferentes secciones de la aplicación,
 * como proyectos del portafolio, testimonios y paquetes de servicios.
 * 
 * ESTRUCTURA DE DATOS EN FIRESTORE:
 * 
 * 1. Colección `portfolioProjects`:
 *    - Cada documento representa un proyecto del portafolio.
 *    - Campos del documento (ejemplo):
 *      - slug: "nombre-proyecto-url-amigable" (string)
 *      - title: "Nombre del Proyecto" (string)
 *      - category: "Identidad de Marca" (string)
 *      - imageUrl: "https://url-de-la-imagen.com/imagen.png" (string)
 *      - aiHint: "palabra clave" (string)
 *      - client: "Nombre del Cliente" (string)
 *      - challenge: "Descripción del desafío." (string)
 *      - process: "Descripción del proceso." (string)
 *      - solution: "Descripción de la solución." (string)
 *      - impact: "Descripción del impacto." (string)
 *      - testimonial: "Cita del testimonio." (string, opcional)
 *      - images: [
 *          { url: "...", alt: "...", aiHint: "..." },
 *          { url: "...", alt: "...", aiHint: "..." }
 *        ] (array de objetos)
 * 
 * 2. Colección `testimonials`:
 *    - Cada documento representa un testimonio.
 *    - Campos del documento (ejemplo):
 *      - quote: "El testimonio del cliente." (string)
 *      - name: "Nombre del Cliente" (string)
 *      - title: "Cargo del Cliente" (string)
 *      - avatarUrl: "https://url-del-avatar.com/avatar.png" (string)
 * 
 * 3. Colección `servicePackages`:
 *    - Cada documento representa un paquete de servicio.
 *    - Campos del documento (ejemplo):
 *      - title: "Nombre del Paquete" (string)
 *      - idealFor: "Descripción para quién es ideal." (string)
 *      - benefits: ["Beneficio 1", "Beneficio 2"] (array de strings)
 *      - deliverables: ["Entregable 1", "Entregable 2"] (array de strings)
 */
import type { PortfolioProject } from '@/lib/types';

const mockProjects: PortfolioProject[] = [
    {
    id: '1',
    slug: 'cafe-origen',
    title: 'Café Origen',
    category: 'Identidad de Marca',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'coffee branding',
    client: 'Café Origen',
    challenge: 'Crear una identidad visual que refleje la calidad artesanal y el origen sostenible de su café, diferenciándose en un mercado competitivo.',
    process: 'Iniciamos con una investigación de mercado y talleres con el cliente. Desarrollamos un concepto basado en la tierra y el grano, lo que nos llevó a una paleta de colores terrosos y una tipografía robusta pero elegante.',
    solution: 'Diseñamos un logotipo que fusiona un grano de café con una gota de agua, simbolizando pureza y origen. La identidad se aplicó a empaques, papelería y una guía de estilo para redes sociales.',
    impact: 'La nueva identidad aumentó el reconocimiento de marca en un 40% y las ventas online crecieron un 25% en los primeros seis meses.',
    testimonial: 'Eikocolors capturó la esencia de nuestra marca a la perfección. El diseño no solo es hermoso, sino que cuenta nuestra historia y conecta con nuestros clientes.',
    images: [
      { url: 'https://placehold.co/800x600.png', alt: 'Empaque de Café Origen', aiHint: 'coffee bag' },
      { url: 'https://placehold.co/800x600.png', alt: 'Taza de Café Origen', aiHint: 'coffee cup' },
      { url: 'https://placehold.co/800x600.png', alt: 'Papelería de Café Origen', aiHint: 'brand stationery' },
    ],
  },
  {
    id: '2',
    slug: 'piel-pura',
    title: 'Piel Pura',
    category: 'Packaging',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'skincare product',
    client: 'Piel Pura Cosméticos',
    challenge: 'Diseñar un packaging para una nueva línea de productos de cuidado de la piel que comunicara lujo, naturalidad y sostenibilidad.',
    process: 'Se realizaron pruebas con materiales reciclados y tintas ecológicas. El diseño se centró en el minimalismo, utilizando ilustraciones botánicas sutiles para representar los ingredientes clave de cada producto.',
    solution: 'Creamos una serie de envases con un diseño limpio y tipografía serif. Cada producto se diferencia por una ilustración botánica única y una paleta de colores pastel. Los envases son 100% reciclables.',
    impact: 'El nuevo packaging fue clave para entrar en tiendas departamentales de lujo y recibió un premio de diseño. La percepción de la marca mejoró significativamente.',
    testimonial: 'El trabajo de Eikocolors elevó nuestra marca. El packaging es ahora uno de nuestros principales diferenciadores y un punto de atracción para los clientes.',
    images: [
      { url: 'https://placehold.co/800x600.png', alt: 'Línea de productos Piel Pura', aiHint: 'skincare line' },
      { url: 'https://placehold.co/800x600.png', alt: 'Detalle de envase Piel Pura', aiHint: 'product bottle' },
      { url: 'https://placehold.co/800x600.png', alt: 'Caja de producto Piel Pura', aiHint: 'product box' },
    ],
  },
   {
    id: '3',
    slug: 'dataflow-inc',
    title: 'DataFlow Inc.',
    category: 'Diseño Web',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'saas dashboard',
    client: 'DataFlow Inc.',
    challenge: 'Rediseñar la interfaz de su plataforma de análisis de datos para que fuera más intuitiva, fácil de usar y visualmente atractiva para usuarios no técnicos.',
    process: 'Realizamos un análisis de la experiencia de usuario (UX) actual, identificando puntos de fricción. Se crearon wireframes y prototipos interactivos que se validaron con usuarios reales antes de pasar al diseño visual (UI).',
    solution: 'Se implementó un nuevo dashboard con una navegación simplificada, visualizaciones de datos claras y un sistema de diseño coherente. Se introdujo un modo oscuro y se mejoró la accesibilidad.',
    impact: 'El tiempo para completar tareas clave se redujo en un 30%. La satisfacción del usuario aumentó en un 50% y la tasa de abandono disminuyó.',
    testimonial: 'Transformó nuestra herramienta. Ahora es potente, fácil de usar y visualmente atractiva, lo que ha sido clave para la retención de clientes.',
    images: [
      { url: 'https://placehold.co/800x600.png', alt: 'Dashboard de DataFlow', aiHint: 'analytics dashboard' },
      { url: 'https://placehold.co/800x600.png', alt: 'Gráficos de la plataforma', aiHint: 'data charts' },
      { url: 'https://placehold.co/800x600.png', alt: 'Versión móvil de la interfaz', aiHint: 'mobile interface' },
    ],
  },
];


export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
    return mockProjects;
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
    const project = mockProjects.find(p => p.slug === slug);
    return project || null;
}

export async function getProjectById(id: string): Promise<PortfolioProject | null> {
    const project = mockProjects.find(p => p.id === id);
    return project || null;
}
