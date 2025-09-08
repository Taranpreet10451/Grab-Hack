// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides explanations for credit score predictions by highlighting influential factors.
 *
 * - creditScoreExplanation - A function that generates explanations for credit score predictions.
 * - CreditScoreExplanationInput - The input type for the creditScoreExplanation function.
 * - CreditScoreExplanationOutput - The return type for the creditScoreExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditScoreExplanationInputSchema = z.object({
  featureValues: z.record(z.number()).describe('A map of feature names to their corresponding values.'),
  prediction: z.string().describe('The credit score prediction (e.g., Good, Fair, Poor).'),
  probabilities: z.record(z.number()).describe('A map of credit score categories to their predicted probabilities.'),
});
export type CreditScoreExplanationInput = z.infer<typeof CreditScoreExplanationInputSchema>;

const CreditScoreExplanationOutputSchema = z.object({
  explanation: z.string().describe('A human-readable explanation of the factors influencing the credit score prediction.'),
});
export type CreditScoreExplanationOutput = z.infer<typeof CreditScoreExplanationOutputSchema>;

export async function creditScoreExplanation(input: CreditScoreExplanationInput): Promise<CreditScoreExplanationOutput> {
  return creditScoreExplanationFlow(input);
}

const creditScoreExplanationPrompt = ai.definePrompt({
  name: 'creditScoreExplanationPrompt',
  input: {schema: CreditScoreExplanationInputSchema},
  output: {schema: CreditScoreExplanationOutputSchema},
  prompt: `You are a financial expert explaining credit score predictions to users.

  Given the following feature values and the credit score prediction, provide a concise explanation of the factors that most influenced the prediction.
  Highlight which features had the most positive and negative impact on the credit score.

  Feature Values:
  {{#each featureValues}}
  - {{@key}}: {{this}}
  {{/each}}

  Prediction: {{prediction}}
  Probabilities: 
  {{#each probabilities}}
  - {{@key}}: {{this}}
  {{/each}}

  Explanation (2-3 sentences):
  `,
});

const creditScoreExplanationFlow = ai.defineFlow(
  {
    name: 'creditScoreExplanationFlow',
    inputSchema: CreditScoreExplanationInputSchema,
    outputSchema: CreditScoreExplanationOutputSchema,
  },
  async input => {
    const {output} = await creditScoreExplanationPrompt(input);
    return output!;
  }
);
