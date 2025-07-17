import { AssistantClient } from "@/components/assistant/AssistantClient";
import { Bot } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Bot className="h-16 w-16 text-primary" />
          </div>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Asistente Virtual de Eikocolors</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Hola, soy Eiko-bot. Estoy aquí para ayudarte a responder cualquier pregunta que tengas sobre los servicios, proyectos o el proceso de diseño de Eikocolors Studio. ¿En qué puedo ayudarte hoy?
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
            <AssistantClient />
        </div>
      </section>
    </div>
  );
}
