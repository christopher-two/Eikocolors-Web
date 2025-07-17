import { SeoToolClient } from "@/components/seo/SeoToolClient";

export default function SeoToolPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Herramienta SEO con IA</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Analiza el contenido de un sitio web para generar sugerencias de palabras clave SEO relevantes para servicios de diseño y perfiles de público objetivo específicos.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
            <SeoToolClient />
        </div>
      </section>
    </div>
  );
}
