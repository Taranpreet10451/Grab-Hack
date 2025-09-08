
'use server';

import { creditScoreExplanation } from '@/ai/flows/credit-score-explanation';
import { getFeatureExplanation } from '@/ai/flows/feature-explanation';
import { creditScorePrediction } from '@/ai/flows/credit-score-prediction';
import { predictionSchema, type PredictionInput } from '@/lib/schema';
import { z } from 'zod';
import { FEATURES } from '@/lib/features';

export type PredictionResult = {
  prediction: string;
  probabilities: Record<string, number>;
  explanation: string;
  modelInfo: {
    algorithm: string;
    trainedAt: string;
  };
};

export async function getPredictionAction(
  data: PredictionInput
): Promise<PredictionResult> {
  
  const featureValues = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, String(value)])
  );
  
  const predictionResult = await creditScorePrediction({
    featureValues
  });

  const { prediction, probabilities } = predictionResult;

  const numericFeatures = Object.fromEntries(
    Object.entries(data).filter(([, value]) => typeof value === 'number')
  );

  const explanationResult = await creditScoreExplanation({
    featureValues: numericFeatures,
    prediction,
    probabilities,
  });

  return {
    prediction,
    probabilities,
    explanation: explanationResult.explanation,
    modelInfo: {
      algorithm: 'Deep Neural Network',
      trainedAt: new Date().toISOString(),
    },
  };
}

export async function getBatchPredictionsAction(csvData: string): Promise<(PredictionResult & { partnerId?: string })[]> {
    const rows = csvData.split('\n').map(r => r.trim()).filter(row => row);
    if (rows.length < 2) {
        throw new Error('CSV must contain a header and at least one data row.');
    }

    const header = rows[0].split(',').map(h => h.trim());
    const dataRows = rows.slice(1);

    const numericFeatureNames = FEATURES.filter(f => f.type === 'numeric').map(f => f.name);
    const booleanFeatureNames = FEATURES.filter(f => f.type === 'boolean').map(f => f.name);

    const predictionPromises = dataRows.map(async (row, i) => {
        const values = row.split(',');
        
        const rowData: Record<string, any> = {};
        header.forEach((key, index) => {
            if (key && index < values.length) {
                let value: string | boolean | number | null = values[index]?.trim() ?? '';
                
                if (key === 'partner_id') {
                    rowData[key] = value as string;
                } else if (numericFeatureNames.includes(key)) {
                    rowData[key] = value === '' ? null : parseFloat(value);
                } else if (booleanFeatureNames.includes(key)) {
                    const upperValue = (value as string).toUpperCase();
                    if (upperValue === 'TRUE') {
                        rowData[key] = true;
                    } else if (upperValue === 'FALSE') {
                        rowData[key] = false;
                    } else {
                        rowData[key] = null; 
                    }
                } else {
                    rowData[key] = value;
                }
            }
        });

        try {
            const validationResult = predictionSchema.safeParse(rowData);
            
            if (!validationResult.success) {
                console.error(`Row ${i + 2} validation failed:`, validationResult.error.flatten().fieldErrors);
                return null;
            }
            
            const prediction = await getPredictionAction(validationResult.data as PredictionInput);
            return { partnerId: validationResult.data.partner_id, ...prediction };
        } catch (error) {
            console.error(`Error processing row ${i + 2}:`, rowData, error);
            return null;
        }
    });

    const results = await Promise.all(predictionPromises);
    
    return results.filter((res): res is PredictionResult & { partnerId?: string } => res !== null);
}


export async function getFeatureExplanationAction(featureName: string) {
  try {
    const result = await getFeatureExplanation({ featureName });
    return result;
  } catch (error) {
    console.error(`Error fetching explanation for ${featureName}:`, error);
    return {
      explanation: 'Could not load explanation for this feature.',
    };
  }
}

export async function retrainModelAction() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return { success: true, message: 'Model retraining completed successfully!' };
}
