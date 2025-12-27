import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/store/ProductDetails";

// Standard Next.js page component for server-side rendering
// This component is NOT a client component, so it can export generateStaticParams

export function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        return notFound();
    }

    return <ProductDetails product={product} />;
}
