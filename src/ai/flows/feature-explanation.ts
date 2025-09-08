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
  prompt: `You are a credit scoring expert. Provide a concise explanation of the feature "{{featureName}}" and how it might affect a person's credit score prediction. Be brief and to the point.
`,
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
