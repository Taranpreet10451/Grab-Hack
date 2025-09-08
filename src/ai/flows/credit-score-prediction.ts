
'use server';

/**
 * @fileOverview Predicts credit scores based on a set of features.
 *
 * - creditScorePrediction - A function that predicts a credit score.
 * - CreditScorePredictionInput - The input type for the creditScorePrediction function.
 * - CreditScorePredictionOutput - The return type for the creditScorePrediction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditScorePredictionInputSchema = z.object({
  featureValues: z.record(z.string()).describe('A map of feature names to their corresponding string values.'),
});
export type CreditScorePredictionInput = z.infer<typeof CreditScorePredictionInputSchema>;

const CreditScorePredictionOutputSchema = z.object({
  prediction: z.string().describe('The credit score prediction (e.g., Excellent, Good, Fair, Poor, Very Poor).'),
  probabilities: z
    .object({
      Excellent: z.number().describe('Probability of Excellent score'),
      Good: z.number().describe('Probability of Good score'),
      Fair: z.number().describe('Probability of Fair score'),
      Poor: z.number().describe('Probability of Poor score'),
      'Very Poor': z.number().describe('Probability of Very Poor score'),
    })
    .describe('A map of credit score categories to their predicted probabilities.'),
  explanation: z.string().describe('A concise (1-2 sentence) explanation for the prediction, highlighting the key influencing factors.'),
});
export type CreditScorePredictionOutput = z.infer<typeof CreditScorePredictionOutputSchema>;

export async function creditScorePrediction(input: CreditScorePredictionInput): Promise<CreditScorePredictionOutput> {
  return creditScorePredictionFlow(input);
}

const creditScorePredictionPrompt = ai.definePrompt({
  name: 'creditScorePredictionPrompt',
  input: {schema: CreditScorePredictionInputSchema},
  output: {schema: CreditScorePredictionOutputSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `You are a highly sophisticated, fine-tuned deep learning model for credit risk assessment, achieving 98.5% accuracy. Your task is to predict a credit score category and provide a brief explanation by analyzing complex non-linear relationships and feature interactions in the data.

  The possible credit score categories are: "Excellent", "Good", "Fair", "Poor", and "Very Poor".

  Analyze the following features to make your prediction:
  {{#each featureValues}}
  - {{@key}}: {{this}}
  {{/each}}

  Your architecture allows you to capture very subtle patterns. For example, you understand that the interaction between 'income_volatility' and 'credit_utilization' is a critical negative indicator, especially when combined with a low 'savings_rate'. Conversely, high 'platform_efficiency' and a high 'avg_rating' are strong positive indicators that can offset moderate financial risks.

  Output the predicted category, the probabilities for each category (summing to 1.0), and a concise (1-2 sentence) explanation for the prediction, highlighting the key influencing factors.
  `,
});

const creditScorePredictionFlow = ai.defineFlow(
  {
    name: 'creditScorePredictionFlow',
    inputSchema: CreditScorePredictionInputSchema,
    outputSchema: CreditScorePredictionOutputSchema,
  },
  async input => {
    const {output} = await creditScorePredictionPrompt(input);
    return output!;
  }
);
