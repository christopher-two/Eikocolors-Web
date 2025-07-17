'use server';
/**
 * @fileOverview Un asistente de IA que puede responder preguntas sobre Eikocolors Studio.
 *
 * - askAssistant - Una función que maneja las preguntas al asistente.
 * - AskAssistantInput - El tipo de entrada para la función askAssistant.
 * - AskAssistantOutput - El tipo de retorno para la función askAssistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { servicePackages, portfolioProjects } from '@/lib/data';

const AskAssistantInputSchema = z.object({
  question: z.string().describe('La pregunta del usuario para el asistente.'),
});
export type AskAssistantInput = z.infer<typeof AskAssistantInputSchema>;

const AskAssistantOutputSchema = z.object({
  answer: z
    .string()
    .describe('La respuesta del asistente a la pregunta del usuario.'),
});
export type AskAssistantOutput = z.infer<typeof AskAssistantOutputSchema>;

export async function askAssistant(
  input: AskAssistantInput
): Promise<AskAssistantOutput> {
  return assistantFlow(input);
}

const studioContext = `
# Sobre Eikocolors Studio:
Eikocolors es un estudio de diseño gráfico estratégico dirigido por una diseñadora llamada Eikocolors. Su misión es ayudar a marcas de consumo consciente a traducir sus valores en una identidad visual memorable que conecte con su audiencia, cuente su historia y potencie sus ventas.
Los valores fundamentales son la Sostenibilidad, el Minimalismo y la Innovación.

# Servicios Ofrecidos:
${servicePackages
  .map(
    (p) => `## Paquete: ${p.title}
- Ideal para: ${p.idealFor}
- Beneficios: ${p.benefits.join(', ')}
- Entregables: ${p.deliverables.join(', ')}`
  )
  .join('\n')}

# Proyectos del Portafolio:
${portfolioProjects
  .map(
    (p) => `## Proyecto: ${p.title}
- Cliente: ${p.client}
- Categoría: ${p.category}
- Desafío: ${p.challenge}
- Solución: ${p.solution}`
  )
  .join('\n')}

# Información de Contacto:
- Email: hola@eikocolors.com
- Horario: Lunes a Viernes, 9:00 AM - 6:00 PM.
- Tiempo de respuesta: 24-48 horas hábiles.
`;

const prompt = ai.definePrompt({
  name: 'assistantPrompt',
  input: { schema: AskAssistantInputSchema },
  output: { schema: AskAssistantOutputSchema },
  system: `Eres un asistente de IA amigable y profesional para Eikocolors Studio, un estudio de diseño. Tu nombre es "Eiko-bot".
  Tu propósito es actuar como un recepcionista virtual, respondiendo preguntas de potenciales clientes de manera útil y conversacional.
  Usa el siguiente contexto para responder las preguntas. Sé conciso y directo, pero mantén un tono cálido y accesible. Si no sabes la respuesta, amablemente indica que no tienes esa información y sugiere al usuario que contacte directamente al estudio a través del formulario de contacto.
  No inventes información que no esté en el contexto. Responde siempre en español.

  Contexto del Estudio:
  ${studioContext}
  `,
  prompt: `Pregunta del usuario: {{{question}}}`,
});

const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AskAssistantInputSchema,
    outputSchema: AskAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
