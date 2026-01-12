import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, query, orderBy, collectionGroup, where, limit, Timestamp } from "firebase/firestore";
import { Category, ShopCollection, ShopProduct } from "./types";

// Helper to serialize Firestore data (convert Timestamps to strings)
const serializeData = (data: any): any => {
    if (!data) return data;
    const serialized = { ...data };

    // Convert common timestamp fields
    if (serialized.createdAt instanceof Timestamp) {
        serialized.createdAt = serialized.createdAt.toDate().toISOString();
    }
    if (serialized.timeStamp instanceof Timestamp) {
        serialized.timeStamp = serialized.timeStamp.toDate().toISOString();
    }
    // Deep check for other timestamps if necessary, but these are our main ones

    return serialized;
};

// Categories
export async function getCategories(): Promise<Category[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...serializeData(doc.data()),
        })) as Category[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

// Collections
export async function getShopCollections(): Promise<ShopCollection[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "collections"));
        const collections = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...serializeData(doc.data()),
        })) as ShopCollection[];

        return collections;
    } catch (error) {
        console.error("Error fetching collections:", error);
        return [];
    }
}

export async function getShopCollection(id: string): Promise<ShopCollection | null> {
    try {
        const docRef = doc(db, "collections", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...serializeData(docSnap.data()) } as ShopCollection;
        }
        return null;
    } catch (error) {
        console.error("Error fetching collection:", error);
        return null;
    }
}

// Products
export async function getProducts(collectionId: string): Promise<ShopProduct[]> {
    try {
        const itemsRef = collection(db, "products", collectionId, "items");
        const querySnapshot = await getDocs(itemsRef);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            collectionId,
            ...serializeData(doc.data()),
        })) as ShopProduct[];
    } catch (error) {
        console.error(`Error fetching products for collection ${collectionId}:`, error);
        return [];
    }
}

export async function getAllProducts(): Promise<ShopProduct[]> {
    const productsMap = new Map<string, ShopProduct>();

    try {
        // Strategy 1: Subcollections named 'items' (nested structure)
        const productsQuery = query(collectionGroup(db, "items"));
        const querySnapshot = await getDocs(productsQuery);

        querySnapshot.docs.forEach((doc) => {
            const parentId = doc.ref.parent.parent?.id;
            const data = serializeData(doc.data());
            productsMap.set(doc.id, {
                id: doc.id,
                collectionId: parentId,
                ...data,
            } as ShopProduct);
        });

        // Strategy 2: Root 'products' collection (flat structure)
        // Fetch only if Strategy 1 didn't find much, or fetch anyway to merge.
        // Usually apps use one or the other, but we support both for robustness.
        const rootProductsQuery = query(collection(db, "products"));
        const rootSnapshot = await getDocs(rootProductsQuery);

        rootSnapshot.docs.forEach((doc) => {
            // Avoid overwriting if found via subcollection (subcollection is likely more specific if used)
            if (!productsMap.has(doc.id)) {
                const data = serializeData(doc.data());
                productsMap.set(doc.id, {
                    id: doc.id,
                    // If flat, collectionId might be in the data, or inferred. 
                    // If not present, it defaults to undefined, which our robust page.tsx handles.
                    ...data,
                } as ShopProduct);
            }
        });

    } catch (error) {
        console.error("Error fetching all products from Firebase:", error);
    }

    // WE DO NOT MERGE HARDCODED PRODUCTS ANYMORE.
    // If Firebase returns nothing, the user sees nothing.
    // This allows them to verify if their DB connection is working.

    return Array.from(productsMap.values());
}

export async function getProduct(collectionId: string, productId: string): Promise<ShopProduct | null> {
    try {
        const docRef = doc(db, "products", collectionId, "items", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, collectionId, ...serializeData(docSnap.data()) } as ShopProduct;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export async function getProductById(productId: string): Promise<ShopProduct | null> {
    try {
        // Method 1: Search in 'items' subcollections
        const productQuery = query(
            collectionGroup(db, "items"),
            where("id", "==", productId),
            limit(1)
        );
        const querySnapshot = await getDocs(productQuery);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const collectionId = doc.ref.parent.parent?.id;
            return { id: doc.id, collectionId, ...serializeData(doc.data()) } as ShopProduct;
        }

        // Method 2: Search in 'products' root collection (if Method 1 failed)
        // Note: 'where("id", "==", productId)' implies the doc ID matches the field 'id'
        // OR we can just try to get the doc by ID if we assume doc.id == productId
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...serializeData(docSnap.data()) } as ShopProduct;
        }

        return null;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
}
