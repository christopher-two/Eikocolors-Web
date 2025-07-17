import { Mail, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
    return (
        <div className="bg-background">
            <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold">Hagamos algo increíble juntos</h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                        ¿Tienes una idea, un proyecto o simplemente quieres saludar? Me encantaría saber de ti. Rellena el formulario o contáctame a través de los canales a continuación.
                    </p>
                </div>
            </section>
            
            <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
                <div className="grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-3">
                       <ContactForm />
                    </div>
                    <div className="md:col-span-2">
                        <div className="bg-secondary p-8 rounded-lg">
                            <h3 className="font-headline text-2xl font-semibold mb-6">Información de Contacto</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 mr-3 text-primary"/>
                                    <a href="mailto:hola@eikocolors.com" className="hover:text-primary transition-colors">hola@eikocolors.com</a>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-3 text-primary"/>
                                    <span>(Disponible bajo petición)</span>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t">
                                <h4 className="font-semibold mb-3">Horario de oficina:</h4>
                                <p className="text-muted-foreground">Lunes a Viernes<br/>9:00 AM - 6:00 PM</p>
                            </div>
                             <div className="mt-8 pt-6 border-t">
                                <h4 className="font-semibold mb-3">Tiempo de respuesta:</h4>
                                <p className="text-muted-foreground">Normalmente respondo en 24-48 horas hábiles.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
