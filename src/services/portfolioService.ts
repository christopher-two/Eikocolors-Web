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
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import type { PortfolioProject } from '@/lib/types';

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
    const projectsCol = collection(db, 'portfolioProjects');
    const projectsSnapshot = await getDocs(projectsCol);
    if (projectsSnapshot.empty) {
        console.log("No projects found in Firestore. Returning empty array.");
        return [];
    }
    const projectsList = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as PortfolioProject));
    return projectsList;
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
    const q = query(collection(db, "portfolioProjects"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.log(`Project with slug "${slug}" not found in Firestore.`);
        return null;
    }
    const projectDoc = querySnapshot.docs[0];
    return { id: projectDoc.id, ...projectDoc.data() } as PortfolioProject;
}

export async function getProjectById(id: string): Promise<PortfolioProject | null> {
    const docRef = doc(db, 'portfolioProjects', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as PortfolioProject;
    } else {
        console.log(`Project with id "${id}" not found in Firestore.`);
        return null;
    }
}
