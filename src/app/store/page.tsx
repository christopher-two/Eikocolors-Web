import { getAllProducts, getCategories, getShopCollections } from "@/lib/shop";
import { StoreClient } from "@/components/store/StoreClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StorePage() {
    const [products, categories, collections] = await Promise.all([
        getAllProducts(),
        getCategories(),
        getShopCollections()
    ]);

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
