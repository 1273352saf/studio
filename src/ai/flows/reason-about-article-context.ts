'use server';

/**
 * @fileOverview A Genkit flow for performing sentiment analysis on news articles, considering the article's context.
 *
 * - reasonAboutArticleContext - A function that analyzes the sentiment of a news article considering its context.
 * - ReasonAboutArticleContextInput - The input type for the reasonAboutArticleContext function.
 * - ReasonAboutArticleContextOutput - The return type for the reasonAboutArticleContext function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ReasonAboutArticleContextInputSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  summary: z.string().describe('A brief summary of the news article.'),
  source: z.string().describe('The source of the news article.'),
});
export type ReasonAboutArticleContextInput = z.infer<typeof ReasonAboutArticleContextInputSchema>;

const ReasonAboutArticleContextOutputSchema = z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral']).describe('The sentiment of the news article.'),
  score: z.number().describe('A numerical score representing the sentiment strength, between -1 and 1.'),
  reasoning: z.string().describe('The reasoning behind the sentiment analysis, considering the article context.'),
});
export type ReasonAboutArticleContextOutput = z.infer<typeof ReasonAboutArticleContextOutputSchema>;

export async function reasonAboutArticleContext(
  input: ReasonAboutArticleContextInput
): Promise<ReasonAboutArticleContextOutput> {
  return reasonAboutArticleContextFlow(input);
}

const reasonAboutArticleContextPrompt = ai.definePrompt({
  name: 'reasonAboutArticleContextPrompt',
  input: {
    schema: z.object({
      title: z.string().describe('The title of the news article.'),
      summary: z.string().describe('A brief summary of the news article.'),
      source: z.string().describe('The source of the news article.'),
    }),
  },
  output: {
    schema: z.object({
      sentiment: z
        .enum(['positive', 'negative', 'neutral'])
        .describe('The sentiment of the news article.'),
      score: z.number().describe('A numerical score representing the sentiment strength, between -1 and 1.'),
      reasoning: z
        .string()
        .describe('The reasoning behind the sentiment analysis, considering the article context.'),
    }),
  },
  prompt: `Analyze the sentiment of the following news article, considering its title, summary, and source. Provide a sentiment (positive, negative, or neutral), a sentiment score between -1 and 1, and a brief explanation of your reasoning.

Title: {{{title}}}
Summary: {{{summary}}}
Source: {{{source}}}

Consider the source's reputation and potential biases when determining the sentiment. For example, a headline like "Company X Announces Record Profits" from a business journal is likely positive, whereas the same headline from a consumer advocacy group might be viewed with skepticism. Similarly, consider how the title and summary might reflect different viewpoints or nuances depending on the context. The sentiment score should reflect the strength and certainty of your analysis.

Output a JSON object with keys \"sentiment\", \"score\", and \"reasoning\".`,
});

const reasonAboutArticleContextFlow = ai.defineFlow<
  typeof ReasonAboutArticleContextInputSchema,
  typeof ReasonAboutArticleContextOutputSchema
>({
  name: 'reasonAboutArticleContextFlow',
  inputSchema: ReasonAboutArticleContextInputSchema,
  outputSchema: ReasonAboutArticleContextOutputSchema,
},
async input => {
  const {output} = await reasonAboutArticleContextPrompt(input);
  return output!;
});

