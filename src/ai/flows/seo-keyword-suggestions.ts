// 'use server';

/**
 * @fileOverview An AI agent that suggests SEO keywords based on website content.
 *
 * - seoKeywordSuggestions - A function that suggests SEO keywords.
 * - SEOKeywordSuggestionsInput - The input type for the seoKeywordSuggestions function.
 * - SEOKeywordSuggestionsOutput - The return type for the seoKeywordSuggestions function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SEOKeywordSuggestionsInputSchema = z.object({
  websiteContent: z
    .string()
    .describe('The content of the website to analyze for keyword suggestions.'),
  targetAudienceProfile: z
    .string()
    .describe(
      'A description of the target audience for the website, e.g., "Fundadoras de startups de consumo consciente".'
    ),
});
export type SEOKeywordSuggestionsInput = z.infer<
  typeof SEOKeywordSuggestionsInputSchema
>;

const SEOKeywordSuggestionsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('An array of relevant SEO keywords for the website.'),
  explanation: z
    .string()
    .describe(
      'An explanation of why these keywords are relevant and how they can be used to improve SEO.'
    ),
});
export type SEOKeywordSuggestionsOutput = z.infer<
  typeof SEOKeywordSuggestionsOutputSchema
>;

export async function seoKeywordSuggestions(
  input: SEOKeywordSuggestionsInput
): Promise<SEOKeywordSuggestionsOutput> {
  return seoKeywordSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seoKeywordSuggestionsPrompt',
  input: {schema: SEOKeywordSuggestionsInputSchema},
  output: {schema: SEOKeywordSuggestionsOutputSchema},
  prompt: `You are an SEO expert tasked with suggesting relevant keywords for a website.

  Analyze the following website content and target audience profile to generate a list of SEO keywords that can help improve search engine rankings.

  Website Content: {{{websiteContent}}}
  Target Audience Profile: {{{targetAudienceProfile}}}

  Provide an explanation of why these keywords are relevant and how they can be used to improve SEO.

  Format the keywords as a JSON array of strings, and the explanation as a string.
  `,
});

const seoKeywordSuggestionsFlow = ai.defineFlow(
  {
    name: 'seoKeywordSuggestionsFlow',
    inputSchema: SEOKeywordSuggestionsInputSchema,
    outputSchema: SEOKeywordSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
