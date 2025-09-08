'use server';
/**
 * @fileOverview Provides explanations for credit scoring features.
 *
 * - getFeatureExplanation - A function that returns an explanation of a given feature.
 * - FeatureExplanationInput - The input type for the getFeatureExplanation function.
 * - FeatureExplanationOutput - The return type for the getFeatureExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeatureExplanationInputSchema = z.object({
  featureName: z.string().describe('The name of the feature to explain.'),
});
export type FeatureExplanationInput = z.infer<typeof FeatureExplanationInputSchema>;

const FeatureExplanationOutputSchema = z.object({
  explanation: z.string().describe('A short explanation of the feature and its potential impact on credit score.'),
});
export type FeatureExplanationOutput = z.infer<typeof FeatureExplanationOutputSchema>;

export async function getFeatureExplanation(input: FeatureExplanationInput): Promise<FeatureExplanationOutput> {
  return featureExplanationFlow(input);
}

const featureExplanationPrompt = ai.definePrompt({
  name: 'featureExplanationPrompt',
  input: {schema: FeatureExplanationInputSchema},
  output: {schema: FeatureExplanationOutputSchema},
  prompt: `You are a credit scoring expert designing a model for the gig economy. The user wants to understand a specific feature from your model.

Feature Name: "{{featureName}}"

Please provide a concise, 1-2 sentence explanation for this feature. Your explanation should cover:
1.  What the feature represents in the context of a gig economy worker (e.g., driver, merchant).
2.  Why it is relevant for assessing credit risk.
3.  For numeric features, mention whether a higher or lower value is generally better.
`,
  model: 'googleai/gemini-1.5-flash-latest',
});

const featureExplanationFlow = ai.defineFlow(
  {
    name: 'featureExplanationFlow',
    inputSchema: FeatureExplanationInputSchema,
    outputSchema: FeatureExplanationOutputSchema,
  },
  async input => {
    const {output} = await featureExplanationPrompt(input);
    return output!;
  }
);
