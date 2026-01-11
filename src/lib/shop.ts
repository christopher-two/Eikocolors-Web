import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, query, orderBy, collectionGroup, where } from "firebase/firestore";
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
        ...doc.data(),
    })) as ShopProduct[];
}

export async function getAllProducts(): Promise<ShopProduct[]> {
    const productsQuery = query(collectionGroup(db, "items"));
    const querySnapshot = await getDocs(productsQuery);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as ShopProduct[];
}

export async function getProduct(collectionId: string, productId: string): Promise<ShopProduct | null> {
    const docRef = doc(db, "products", collectionId, "items", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as ShopProduct;
    } else {
        return null;
    }
}

export async function getProductById(productId: string): Promise<ShopProduct | null> {
    // Optimization Note:
    // We are fetching all products and filtering in memory to avoid needing a specific 
    // COLLECTION_GROUP index in Firebase (which requires manual console setup).
    // For a larger store, you should create the index and use:
    // query(collectionGroup(db, "items"), where("id", "==", productId));

    // Attempt to fetch all products
    try {
        const allProducts = await getAllProducts();
        return allProducts.find(p => p.id === productId) || null;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
}


