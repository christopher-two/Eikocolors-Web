import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, query, orderBy, collectionGroup, where, limit } from "firebase/firestore";
import { Category, ShopCollection, ShopProduct } from "./types";

// Categories
export async function getCategories(): Promise<Category[]> {
    const querySnapshot = await getDocs(collection(db, "categories"));
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Category[];
}

// Collections
export async function getShopCollections(): Promise<ShopCollection[]> {
    const querySnapshot = await getDocs(collection(db, "collections"));
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as ShopCollection[];
}

export async function getShopCollection(id: string): Promise<ShopCollection | null> {
    const docRef = doc(db, "collections", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as ShopCollection;
    } else {
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
    const productsQuery = query(collectionGroup(db, "items"));
    const querySnapshot = await getDocs(productsQuery);
    return querySnapshot.docs.map((doc) => {
        // Path is "products/{collectionId}/items/{productId}"
        const parentId = doc.ref.parent.parent?.id;
        return {
            id: doc.id,
            collectionId: parentId,
            ...doc.data(),
        };
    }) as ShopProduct[];
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
