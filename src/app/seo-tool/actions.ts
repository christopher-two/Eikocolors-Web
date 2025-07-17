'use server'

import { seoKeywordSuggestions, type SEOKeywordSuggestionsOutput } from '@/ai/flows/seo-keyword-suggestions';

interface FormState {
    data: SEOKeywordSuggestionsOutput | null;
    error: string | null;
}

export async function handleSeoSuggestion(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const websiteContent = formData.get('websiteContent') as string;
    const targetAudienceProfile = formData.get('targetAudienceProfile') as string;

    if (!websiteContent || !targetAudienceProfile) {
        return { data: null, error: 'Por favor, completa todos los campos.' };
    }
    
    try {
        const result = await seoKeywordSuggestions({
            websiteContent,
            targetAudienceProfile,
        });
        return { data: result, error: null };
    } catch (error) {
        console.error("Error generating SEO suggestions:", error);
        return { data: null, error: 'Hubo un error al generar las sugerencias. Por favor, intenta de nuevo.' };
    }
}
