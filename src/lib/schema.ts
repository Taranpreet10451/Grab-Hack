
import { z } from 'zod';
import { FEATURES, type Feature } from './features';

const schemaObject = FEATURES.reduce(
  (acc, feature: Feature) => {
    let fieldSchema;

    switch (feature.type) {
      case 'identifier':
        // partner_id is optional as it's not needed for prediction itself.
        acc[feature.name] = z.string().optional();
        return acc;
      
      case 'numeric':
        // Coerce to a number, but allow it to be null if the input is empty or null.
        // This is critical for CSV parsing where optional fields can be blank.
        fieldSchema = z.coerce.number().nullable().optional();
        break;

      case 'categorical':
        fieldSchema = z.enum(feature.options as [string, ...string[]], {
          errorMap: () => ({ message: 'Please select an option.' }),
        }).nullable().optional();
        break;

      case 'boolean':
        // The action will handle string-to-boolean conversion.
        // The schema expects a proper boolean or null for empty values.
        fieldSchema = z.boolean().nullable().optional();
        break;

      default:
        fieldSchema = z.string().nullable().optional();
    }
    
    acc[feature.name] = fieldSchema;

    return acc;
  },
  {} as Record<string, z.ZodType<any, any>>
);

export const predictionSchema = z.object(schemaObject);
export type PredictionInput = z.infer<typeof predictionSchema>;

// Define the input as an object containing two scenarios, each conforming to the predictionSchema
export const ScenarioComparisonInputSchema = z.object({
  scenarioA: predictionSchema.describe('The first scenario to compare.'),
  scenarioB: predictionSchema.describe('The second scenario to compare.'),
});
export type ScenarioComparisonInput = z.infer<typeof ScenarioComparisonInputSchema>;

// Define the output for the comparative analysis
export const ScenarioComparisonOutputSchema = z.object({
  comparativeAnalysis: z.string().describe('A detailed narrative comparing the two scenarios, highlighting key differences and predicting which is financially stronger and why.'),
});
export type ScenarioComparisonOutput = z.infer<typeof ScenarioComparisonOutputSchema>;

// Define the input for the "what-if" analysis
export const WhatIfAnalysisInputSchema = z.object({
    originalData: predictionSchema.describe('The original set of features for the partner.'),
    newData: predictionSchema.describe('The modified set of features reflecting the what-if scenario.'),
});
export type WhatIfAnalysisInput = z.infer<typeof WhatIfAnalysisInputSchema>;

// Define the output for the "what-if" analysis
export const WhatIfAnalysisOutputSchema = z.object({
    newPrediction: z.string().describe('The new credit score prediction (e.g., Good, Fair).'),
    changeAnalysis: z.string().describe('A 1-2 sentence explanation of why the prediction changed, focusing on the key modified variables.'),
});
export type WhatIfAnalysisOutput = z.infer<typeof WhatIfAnalysisOutputSchema>;
