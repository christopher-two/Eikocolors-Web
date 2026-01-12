import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, query, orderBy, collectionGroup, where, limit } from "firebase/firestore";
import { Category, ShopCollection, ShopProduct } from "./types";
import { products as hardcodedProducts } from "./data";

// Categories
export async function getCategories(): Promise<Category[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Category[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []; // Fallback to empty if not in hardcoded
    }
}

// Collections
export async function getShopCollections(): Promise<ShopCollection[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "collections"));
        const collections = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as ShopCollection[];

        if (collections.length === 0) {
            return [{ id: 'general', name: 'Catálogo General', timeStamp: new Date().toISOString(), productIds: [] }];
        }
        return collections;
    } catch (error) {
        console.error("Error fetching collections:", error);
        return [{ id: 'general', name: 'Catálogo General', timeStamp: new Date().toISOString(), productIds: [] }];
    }
}

export async function getShopCollection(id: string): Promise<ShopCollection | null> {
    try {
        const docRef = doc(db, "collections", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as ShopCollection;
        }
        return null;
    } catch (error) {
        console.error("Error fetching collection:", error);
        return null;
    }
}

// Products
// Structure: products/{collectionId}/items/{productId}

export async function getProducts(collectionId: string): Promise<ShopProduct[]> {
    const itemsRef = collection(db, "products", collectionId, "items");
    const querySnapshot = await getDocs(itemsRef);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        collectionId,
        ...doc.data(),
    })) as ShopProduct[];
}

export async function getAllProducts(): Promise<ShopProduct[]> {
    let firebaseProducts: ShopProduct[] = [];
    try {
        const productsQuery = query(collectionGroup(db, "items"));
        const querySnapshot = await getDocs(productsQuery);
        firebaseProducts = querySnapshot.docs.map((doc) => {
            const parentId = doc.ref.parent.parent?.id;
            return {
                id: doc.id,
                collectionId: parentId,
                ...doc.data(),
            };
        }) as ShopProduct[];
    } catch (error) {
        console.error("Error fetching all products from Firebase:", error);
    }

    // Convert hardcoded products to ShopProduct format if they aren't already
    const processedHardcoded = hardcodedProducts.map(p => ({
        ...p,
        price: (p as any).price || 0,
        image: (p as any).image || p.images[0] || '',
        inStock: (p as any).inStock ?? true,
        createdAt: (p as any).createdAt || new Date().toISOString(),
        collectionId: (p as any).collectionId || 'general' // Default collection for hardcoded
    })) as ShopProduct[];

    // Merge and remove duplicates by ID
    const allProductsMap = new Map<string, ShopProduct>();
    processedHardcoded.forEach(p => allProductsMap.set(p.id, p));
    firebaseProducts.forEach(p => allProductsMap.set(p.id, p));

    return Array.from(allProductsMap.values());
}

export async function getProduct(collectionId: string, productId: string): Promise<ShopProduct | null> {
    const docRef = doc(db, "products", collectionId, "items", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, collectionId, ...docSnap.data() } as ShopProduct;
    } else {
        return null;
    }
}

export async function getProductById(productId: string): Promise<ShopProduct | null> {
    // Optimized: Use a collectionGroup query to find the specific product
    // Note: This requires a Firestore index. If the index doesn't exist, 
    // it will throw an error with a link to create it.
    try {
        const productQuery = query(
            collectionGroup(db, "items"),
            where("id", "==", productId),
            limit(1)
        );
        const querySnapshot = await getDocs(productQuery);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const collectionId = doc.ref.parent.parent?.id;
            return { id: doc.id, collectionId, ...doc.data() } as ShopProduct;
        }

        return null;
    } catch (error) {
        console.error("Error fetching product by ID with query:", error);
        // Fallback for small catalogs if index is not ready
        const allProducts = await getAllProducts();
        return allProducts.find((p: ShopProduct) => p.id === productId) || null;
    }
}
