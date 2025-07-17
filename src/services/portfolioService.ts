import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import type { PortfolioProject } from '@/lib/types';

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
    const projectsCol = collection(db, 'portfolioProjects');
    const projectsSnapshot = await getDocs(projectsCol);
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
        return null;
    }
}
