import { getAllProducts, getCategories, getShopCollections } from "@/lib/shop";
import { StoreClient } from "@/components/store/StoreClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StorePage() {
    const [products, categories, fetchedCollections] = await Promise.all([
        getAllProducts(),
        getCategories(),
        getShopCollections()
    ]);

    // Robustness: Derive collections from products if metadata is missing
    const collectionsMap = new Map(fetchedCollections.map(c => [c.id, c]));

    // Get all unique collection IDs from products
    const productCollectionIds = Array.from(new Set(products.map(p => p.collectionId).filter(Boolean))) as string[];

    productCollectionIds.forEach(id => {
        if (!collectionsMap.has(id)) {
            // Create a virtual collection if it doesn't exist in metadata
            collectionsMap.set(id, {
                id,
                name: id === 'general' ? 'Catálogo General' : (id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ')),
                timeStamp: new Date().toISOString(),
                productIds: [] // We don't need this populated for the grid view as it uses products list
            });
        }
    });

    const collections = Array.from(collectionsMap.values());

    console.log('StorePage', { products: products.length, collections: collections.length });

    return (
        <div className="min-h-screen bg-background py-8">
            <section className="container mx-auto px-4">
                <StoreClient
                    initialProducts={products}
                    categories={categories}
                    collections={collections}
                />
            </section>
        </div>
    );
}
