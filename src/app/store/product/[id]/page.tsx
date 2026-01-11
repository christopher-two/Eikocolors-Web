import { products as hardcodedProducts } from "@/lib/data";
import { getAllProducts, getProductById } from "@/lib/shop";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/store/ProductDetails";
import { Product } from "@/lib/types";

// Standard Next.js page component for server-side rendering
// This component is NOT a client component, so it can export generateStaticParams

export async function generateStaticParams() {
    try {
        const shopProducts = await getAllProducts();

        const shopParams = shopProducts.map((product) => ({
            id: product.id,
        }));

        const hardcodedParams = hardcodedProducts.map((product) => ({
            id: product.id,
        }));

        // Merge unique IDs
        const allIds = new Set([...shopParams.map(p => p.id), ...hardcodedParams.map(p => p.id)]);

        return Array.from(allIds).map(id => ({ id }));
    } catch (error) {
        console.error("Error generating static params:", error);
        // Fallback to hardcoded only if Firebase fails
        return hardcodedProducts.map((product) => ({
            id: product.id,
        }));
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    // Try to find in hardcoded first (fast)
    let product: Product | null | undefined = hardcodedProducts.find((p) => p.id === params.id);

    // If not found, try Firebase
    if (!product) {
        const shopProduct = await getProductById(params.id);
        if (shopProduct) {
            product = shopProduct as unknown as Product;
        }
    }

    if (!product) {
        return notFound();
    }

    return <ProductDetails product={product} />;
}

