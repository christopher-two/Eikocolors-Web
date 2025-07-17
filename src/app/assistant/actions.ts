'use server'

import { askAssistant, type AskAssistantOutput } from '@/ai/flows/assistant-flow';

interface FormState {
    data: AskAssistantOutput | null;
    error: string | null;
    question: string | null;
}

export async function handleAssistantQuery(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const question = formData.get('question') as string;

    if (!question) {
        return { data: null, error: 'Por favor, introduce una pregunta.', question: null };
    }
    
    try {
        const result = await askAssistant({ question });
        return { data: result, error: null, question };
    } catch (error) {
        console.error("Error con el asistente de IA:", error);
        return { data: null, error: 'Hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.', question };
    }
}
