'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useFormState } from 'react-dom'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { handleSeoSuggestion } from "@/app/seo-tool/actions"
import { Badge } from "../ui/badge"
import { Lightbulb, Loader2 } from "lucide-react"

const formSchema = z.object({
  websiteContent: z.string().min(50, { message: "El contenido debe tener al menos 50 caracteres." }),
  targetAudienceProfile: z.string().min(10, { message: "El perfil debe tener al menos 10 caracteres." }),
})

const initialState = {
    data: null,
    error: null,
};

export function SeoToolClient() {
    const [state, formAction] = useFormState(handleSeoSuggestion, initialState)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            websiteContent: "Ej: Sitio web para una marca de moda sostenible que vende ropa de lino orgánico. Los valores son la ética, la producción local y el diseño minimalista.",
            targetAudienceProfile: "Ej: Fundadoras de startups de consumo consciente, interesadas en la sostenibilidad, el diseño y la calidad.",
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Generador de Palabras Clave</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={formAction} onSubmit={form.handleSubmit(formAction)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="websiteContent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contenido del Sitio Web</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Pega aquí el contenido principal de tu sitio web o una descripción detallada..."
                                        className="resize-y"
                                        {...field}
                                        rows={8}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="targetAudienceProfile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Perfil de la Audiencia Objetivo</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Describe a tu cliente ideal..."
                                        className="resize-y"
                                        {...field}
                                        rows={4}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generar Sugerencias
                        </Button>
                    </form>
                </Form>

                {form.formState.isSubmitting && (
                    <div className="mt-8 flex items-center justify-center text-muted-foreground">
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        <span className="text-lg">Analizando y generando ideas...</span>
                    </div>
                )}
                
                {state.error && (
                    <Card className="mt-8 bg-destructive/10 border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Error</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p>{state.error}</p>
                        </CardContent>
                    </Card>
                )}

                {state.data && (
                    <div className="mt-8 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Palabras Clave Sugeridas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {state.data.keywords.map((keyword, index) => (
                                        <Badge key={index} variant="secondary" className="text-base px-3 py-1">{keyword}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-accent"/> Explicación y Estrategia</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-wrap text-muted-foreground">{state.data.explanation}</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
