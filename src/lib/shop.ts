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

// Normalize product shape to avoid undefined prices breaking filters/client logic
const normalizeProduct = (raw: any, id: string, collectionId?: string): ShopProduct => {
    const priceNum = Number(raw?.price ?? 0);
    const images = Array.isArray(raw?.images) ? raw.images : [];
    const image = raw?.image || images[0] || '';

    return {
        id,
        collectionId,
        name: raw?.name || 'Producto sin nombre',
        price: Number.isFinite(priceNum) ? priceNum : 0,
        category: raw?.category || 'Sin categoría',
        image,
        images,
        description: raw?.description || '',
        inStock: typeof raw?.inStock === 'boolean' ? raw.inStock : true,
        createdAt: raw?.createdAt || raw?.timeStamp || new Date().toISOString(),
    };
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

        return querySnapshot.docs.map((doc) => {
            const data = serializeData(doc.data());
            return normalizeProduct(data, doc.id, collectionId);
        });
    } catch (error) {
        console.error(`Error fetching products for collection ${collectionId}:`, error);
        return [];
    }
}

export async function getAllProducts(): Promise<ShopProduct[]> {
    const productsMap = new Map<string, ShopProduct>();

    try {
        // Get all collection IDs first from the 'collections' metadata
        const collectionsSnapshot = await getDocs(collection(db, "collections"));
        const collectionIds: string[] = collectionsSnapshot.docs.map(doc => doc.id);

        console.log("Found collections:", collectionIds);

        // Fetch products from each collection's items subcollection
        // Structure: products/{collectionId}/items/{productId}
        const fetchPromises = collectionIds.map(async (collectionId) => {
            try {
                const itemsRef = collection(db, "products", collectionId, "items");
                const itemsSnapshot = await getDocs(itemsRef);

                console.log(`Collection ${collectionId}: found ${itemsSnapshot.docs.length} products`);

                itemsSnapshot.docs.forEach((doc) => {
                    const data = serializeData(doc.data());
                    productsMap.set(doc.id, normalizeProduct(data, doc.id, collectionId));
                });
            } catch (err) {
                console.error(`Error fetching products for collection ${collectionId}:`, err);
            }
        });

        await Promise.all(fetchPromises);

        // If no collections exist, try fetching from a default 'general' collection
        if (collectionIds.length === 0) {
            console.log("No collections found, trying 'general' collection...");
            try {
                const generalItemsRef = collection(db, "products", "general", "items");
                const generalSnapshot = await getDocs(generalItemsRef);

                generalSnapshot.docs.forEach((doc) => {
                    const data = serializeData(doc.data());
                    productsMap.set(doc.id, normalizeProduct(data, doc.id, "general"));
                });
            } catch (err) {
                console.error("Error fetching from general collection:", err);
            }
        }

    } catch (error) {
        console.error("Error fetching all products from Firebase:", error);
    }

    console.log("Total products fetched:", productsMap.size);
    return Array.from(productsMap.values());
}

export async function getProduct(collectionId: string, productId: string): Promise<ShopProduct | null> {
    try {
        const docRef = doc(db, "products", collectionId, "items", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = serializeData(docSnap.data());
            return normalizeProduct(data, docSnap.id, collectionId);
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
            const data = serializeData(doc.data());
            return normalizeProduct(data, doc.id, collectionId);
        }

        // Method 2: Search in 'products' root collection (if Method 1 failed)
        // Note: 'where("id", "==", productId)' implies the doc ID matches the field 'id'
        // OR we can just try to get the doc by ID if we assume doc.id == productId
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = serializeData(docSnap.data());
            return normalizeProduct(data, docSnap.id, data?.collectionId);
        }

        return null;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
}
