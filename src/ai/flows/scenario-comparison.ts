
'use server';
/**
 * @fileOverview Compares two financial scenarios for credit risk.
 *
 * - compareScenarios - A function that provides a comparative analysis of two profiles.
 * - ScenarioComparisonInput - The input type for the compareScenarios function.
 * - ScenarioComparisonOutput - The return type for the compareScenarios function.
 */

import {ai} from '@/ai/genkit';
import {
  ScenarioComparisonInputSchema,
  ScenarioComparisonOutputSchema,
  type ScenarioComparisonInput,
  type ScenarioComparisonOutput,
} from '@/lib/schema';

export async function compareScenarios(input: ScenarioComparisonInput): Promise<ScenarioComparisonOutput> {
  return scenarioComparisonFlow(input);
}

const scenarioComparisonPrompt = ai.definePrompt({
  name: 'scenarioComparisonPrompt',
  input: { schema: ScenarioComparisonInputSchema },
  output: { schema: ScenarioComparisonOutputSchema },
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are a financial risk analyst. You will be given two scenarios, "Scenario A" and "Scenario B", each with a set of features for a gig economy partner.

Your task is to perform a detailed comparative analysis. Do not just list the features. Instead, write a 2-3 paragraph narrative that explains the relative creditworthiness of the two profiles.

- Identify the stronger profile and clearly state why.
- Highlight the 2-3 most critical features that differentiate them. For example, one might have higher earnings but also much higher income volatility, making them riskier.
- Conclude with a summary of the trade-offs between the two profiles.

Analyze the following two scenarios:

**Scenario A:**
{{#each scenarioA}}
- {{@key}}: {{this}}
{{/each}}

**Scenario B:**
{{#each scenarioB}}
- {{@key}}: {{this}}
{{/each}}
`,
});

const scenarioComparisonFlow = ai.defineFlow(
  {
    name: 'scenarioComparisonFlow',
    inputSchema: ScenarioComparisonInputSchema,
    outputSchema: ScenarioComparisonOutputSchema,
  },
  async (input) => {
    const { output } = await scenarioComparisonPrompt(input);
    return output!;
  }
);
