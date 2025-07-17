import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import type { PortfolioProject } from '@/lib/types';

// This data is used as a fallback if Firebase is not connected or fails.
const fallbackProjects: PortfolioProject[] = [
    {
        id: '1',
        slug: 'marca-consciente-cafe',
        title: 'Café Origen',
        category: 'Identidad de Marca',
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'coffee branding',
        client: 'Café Origen',
        challenge: 'Crear una identidad de marca para un café de especialidad que refleje su compromiso con la sostenibilidad y el comercio justo, diferenciándose en un mercado competitivo.',
        process: 'Iniciamos con una inmersión profunda en la historia y valores de Café Origen. Realizamos talleres de marca con los fundadores, análisis de competencia y definimos un arquetipo de marca claro. El proceso de diseño se centró en materiales naturales y una paleta de colores terrosos.',
        solution: 'Desarrollamos un logotipo que fusiona un grano de café con una hoja, simbolizando la conexión con la naturaleza. La paleta de colores se inspiró en los tonos del café y la tierra. El packaging utiliza materiales reciclados y un diseño minimalista que destaca la calidad del producto.',
        impact: 'La nueva identidad visual aumentó el reconocimiento de marca en un 40% y las ventas online en un 25% en los primeros seis meses. El packaging recibió elogios por su diseño sostenible y atractivo.',
        testimonial: 'Eikocolors capturó la esencia de nuestra marca a la perfección. El diseño no solo es hermoso, sino que cuenta nuestra historia y conecta con nuestros clientes.',
        images: [
            { url: 'https://placehold.co/800x600.png', alt: 'Papelería de Café Origen', aiHint: 'coffee stationery' },
            { url: 'https://placehold.co/800x600.png', alt: 'Empaque de Café Origen', aiHint: 'coffee packaging' },
            { url: 'https://placehold.co/800x600.png', alt: 'Taza de Café Origen', aiHint: 'coffee mug' },
        ],
    },
    {
        id: '2',
        slug: 'packaging-cosmetica-natural',
        title: 'Piel Pura',
        category: 'Packaging',
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'cosmetics packaging',
        client: 'Piel Pura Cosmética',
        challenge: 'Diseñar una línea de packaging para productos de cosmética natural que comunique lujo, pureza y sostenibilidad, y que destaque en puntos de venta premium.',
        process: 'La estrategia se centró en la experiencia del consumidor. Investigamos tendencias en packaging de lujo y sostenibilidad. Optamos por un enfoque minimalista y táctil, utilizando materiales con texturas y acabados especiales que invitaran al tacto.',
        solution: 'Creamos un sistema de packaging modular con cajas de cartón reciclado texturizado y envases de vidrio ámbar para proteger los ingredientes. El diseño utiliza una tipografía elegante y un pequeño detalle botánico en dorado que añade un toque de sofisticación.',
        impact: 'El nuevo packaging contribuyó a asegurar contratos con dos de las principales tiendas departamentales de lujo del país. La percepción de marca mejoró, permitiendo un aumento del 15% en el precio de venta al público.',
        testimonial: 'El trabajo de Eikocolors elevó nuestra marca. El packaging es ahora uno de nuestros principales diferenciadores y un punto de atracción para los clientes.',
        images: [
            { url: 'https://placehold.co/800x600.png', alt: 'Cajas de productos Piel Pura', aiHint: 'product boxes' },
            { url: 'https://placehold.co/800x600.png', alt: 'Detalle de etiqueta de Piel Pura', aiHint: 'label design' },
            { url: 'https://placehold.co/800x600.png', alt: 'Línea de productos Piel Pura', aiHint: 'cosmetic line' },
        ],
    },
    {
        id: '3',
        slug: 'diseno-web-app-gestion',
        title: 'DataFlow',
        category: 'Diseño Web',
        imageUrl: 'https://placehold.co/600x400.png',
        aiHint: 'dashboard analytics',
        client: 'DataFlow Inc.',
        challenge: 'Rediseñar una aplicación de gestión de datos compleja para hacerla más intuitiva, amigable y visualmente atractiva para usuarios no técnicos, sin sacrificar su potencia.',
        process: 'Adoptamos una metodología de Diseño Centrado en el Usuario (UCD). Comenzamos con entrevistas a usuarios y mapeo de journeys para identificar puntos de dolor. Creamos wireframes y prototipos interactivos que fueron iterados en base a pruebas de usabilidad.',
        solution: 'Diseñamos una interfaz limpia y organizada, con un dashboard personalizable que presenta la información más relevante de forma clara. Se creó un sistema de diseño coherente, con una iconografía a medida y visualizaciones de datos interactivas que facilitan la comprensión.',
        impact: 'El rediseño resultó en una reducción del 30% en las solicitudes de soporte y un aumento del 50% en la tasa de adopción de nuevas funcionalidades. La satisfacción del usuario (medida con encuestas NPS) mejoró en 20 puntos.',
        testimonial: 'Transformó nuestra herramienta. Ahora es potente, fácil de usar y visualmente atractiva, lo que ha sido clave para la retención de clientes.',
        images: [
            { url: 'https://placehold.co/800x600.png', alt: 'Dashboard de la aplicación', aiHint: 'dashboard ui' },
            { url: 'https://placehold.co/800x600.png', alt: 'Vista de análisis de datos', aiHint: 'data analysis' },
            { url: 'https://placehold.co/800x600.png', alt: 'Versión móvil de la aplicación', aiHint: 'mobile app' },
        ],
    },
];

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
    try {
        const projectsCol = collection(db, 'portfolioProjects');
        const projectsSnapshot = await getDocs(projectsCol);
        if (projectsSnapshot.empty) {
            console.log("No projects found in Firestore, returning fallback data.");
            return fallbackProjects;
        }
        const projectsList = projectsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as PortfolioProject));
        return projectsList;
    } catch (error) {
        console.error("Firebase error fetching projects, returning fallback data:", error);
        return fallbackProjects;
    }
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
    try {
        const q = query(collection(db, "portfolioProjects"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log(`Project with slug "${slug}" not found in Firestore, checking fallback data.`);
            return fallbackProjects.find(p => p.slug === slug) || null;
        }
        const projectDoc = querySnapshot.docs[0];
        return { id: projectDoc.id, ...projectDoc.data() } as PortfolioProject;
    } catch (error) {
        console.error(`Firebase error fetching project with slug "${slug}", returning fallback data:`, error);
        return fallbackProjects.find(p => p.slug === slug) || null;
    }
}

export async function getProjectById(id: string): Promise<PortfolioProject | null> {
    try {
        const docRef = doc(db, 'portfolioProjects', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as PortfolioProject;
        } else {
            console.log(`Project with id "${id}" not found in Firestore, checking fallback data.`);
            return fallbackProjects.find(p => p.id === id) || null;
        }
    } catch (error) {
        console.error(`Firebase error fetching project with id "${id}", returning fallback data:`, error);
        return fallbackProjects.find(p => p.id === id) || null;
    }
}
