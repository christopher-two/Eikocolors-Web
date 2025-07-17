'use server'

import { askAssistant, type AskAssistantOutput } from '@/ai/flows/assistant-flow';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export interface AssistantState {
    messages: Message[];
    error: string | null;
}

export async function handleAssistantQuery(
    prevState: AssistantState,
    formData: FormData
): Promise<AssistantState> {
    const question = formData.get('question') as string;

    if (!question) {
        return { 
            ...prevState,
            error: 'Por favor, introduce una pregunta.',
         };
    }
    
    const newMessages: Message[] = [...prevState.messages, { role: 'user', content: question }];

    try {
        const result = await askAssistant({ question });
        return { 
            messages: [...newMessages, { role: 'assistant', content: result.answer }],
            error: null,
        };
    } catch (error) {
        console.error("Error con el asistente de IA:", error);
        const errorMessage = 'Hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.';
        return { 
            messages: [...newMessages, { role: 'assistant', content: errorMessage }],
            error: errorMessage 
        };
    }
}
