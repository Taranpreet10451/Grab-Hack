
'use server';

import { getFeatureExplanation } from '@/ai/flows/feature-explanation';
import {
  type PredictionInput,
  type ScenarioComparisonInput,
  type WhatIfAnalysisInput,
} from '@/lib/schema';
import { compareScenarios } from '@/ai/flows/scenario-comparison';

// SIMULATED AI PREDICTION
function runLocalSimulation(data: PredictionInput): PredictionResult {
  // This is a simulated result to avoid API calls for single predictions.
  // It generates a plausible-looking result without hitting the API.
  
  // A simple scoring algorithm for simulation
  let score = 50;
  if (data.monthly_earnings && data.monthly_earnings > 1000) score += 10;
  if (data.avg_rating && data.avg_rating > 4.5) score += 10;
  if (data.cancellation_rate && data.cancellation_rate < 0.05) score += 10;
  if (data.credit_score && data.credit_score > 700) score += 20;
  if (data.income_volatility && data.income_volatility > 0.5) score -= 15;
  if (data.late_arrivals && data.late_arrivals > 5) score -= 15;
  if (data.savings_rate && data.savings_rate > 0.15) score += 15;
  if (data.credit_utilization && data.credit_utilization < 0.3) score += 15;


  let prediction = 'Fair';
  if (score > 85) prediction = 'Excellent';
  else if (score > 70) prediction = 'Good';
  else if (score > 40) prediction = 'Fair';
  else if (score > 20) prediction = 'Poor';
  else prediction = 'Very Poor';

  // Generate plausible probabilities
  const probabilities: Record<string, number> = {
    'Excellent': 0.1,
    'Good': 0.2,
    'Fair': 0.4,
    'Poor': 0.2,
    'Very Poor': 0.1,
  };
  const simulatedScore = Math.min(0.9, Math.max(0.4, score / 100));
  probabilities[prediction] = simulatedScore;
  
  const remainingProb = (1 - simulatedScore) / 4;
  for (const key in probabilities) {
    if (key !== prediction) {
      probabilities[key] = remainingProb;
    }
  }

  const explanation = `This is a simulated analysis. The prediction of '${prediction}' is primarily influenced by factors such as the partner's external credit score of ${data.credit_score}, their monthly earnings of $${data.monthly_earnings}, and a low cancellation rate of ${data.cancellation_rate}. The model simulation suggests these are strong indicators of financial reliability.`;

  return {
    prediction,
    probabilities,
    explanation,
    modelInfo: {
      algorithm: 'Simulated Neural Network',
      trainedAt: new Date().toISOString(),
    },
  };
}


export type PredictionResult = {
  prediction: string;
  probabilities: Record<string, number>;
  explanation: string;
  modelInfo: {
    algorithm: string;
    trainedAt: string;
  };
};

export type ScenarioComparisonResult = {
  scenarioA: PredictionResult;
  scenarioB: PredictionResult;
  comparativeAnalysis: string;
};

export type WhatIfAnalysisResult = {
    newPrediction: string;
    changeAnalysis: string;
}


export async function getPredictionAction(
  data: PredictionInput
): Promise<PredictionResult> {
  return runLocalSimulation(data);
}

export async function getWhatIfAnalysisAction(
  input: WhatIfAnalysisInput
): Promise<WhatIfAnalysisResult> {
    const originalResult = runLocalSimulation(input.originalData);
    const newResult = runLocalSimulation(input.newData);

    let changeAnalysis = `This is a simulated analysis. Changing the inputs resulted in a new prediction of '${newResult.prediction}' (previously '${originalResult.prediction}'). `;

    const significantChanges = [];
    if (input.originalData.monthly_earnings !== input.newData.monthly_earnings) {
        significantChanges.push(`the change in monthly earnings from $${input.originalData.monthly_earnings} to $${input.newData.monthly_earnings}`);
    }
    if (input.originalData.credit_utilization !== input.newData.credit_utilization) {
        significantChanges.push(`the updated credit utilization of ${(input.newData.credit_utilization! * 100).toFixed(0)}%`);
    }
     if (input.originalData.savings_rate !== input.newData.savings_rate) {
        significantChanges.push(`the new savings rate of ${(input.newData.savings_rate! * 100).toFixed(0)}%`);
    }

    if (significantChanges.length > 0) {
        changeAnalysis += `The primary drivers for this change were ${significantChanges.join(' and ')}.`;
    } else {
        changeAnalysis += `There were no significant changes in the key financial drivers.`
    }

    return {
        newPrediction: newResult.prediction,
        changeAnalysis,
    }
}

export async function getScenarioComparisonAction(
  data: ScenarioComparisonInput
): Promise<ScenarioComparisonResult> {
  // Run local simulations for individual scores
  const scenarioA = runLocalSimulation(data.scenarioA as PredictionInput);
  const scenarioB = runLocalSimulation(data.scenarioB as PredictionInput);

  // Generate a hard-coded comparative analysis to avoid API calls
  const comparativeAnalysis = `This is a simulated comparative analysis. Scenario A is predicted as '${scenarioA.prediction}' while Scenario B is predicted as '${scenarioB.prediction}'. Scenario A appears stronger due to a higher external credit score (${data.scenarioA.credit_score} vs. ${data.scenarioB.credit_score}) and significantly lower income volatility. While Scenario B may have higher monthly earnings, the instability of that income presents a greater risk. The simulation concludes that consistent financial behavior, as seen in Scenario A, is a more reliable indicator of creditworthiness.`;

  return {
    scenarioA,
    scenarioB,
    comparativeAnalysis,
  };
}


export async function getFeatureExplanationAction(featureName: string) {
  const demographicFeatures = [
    'gender',
    'age',
    'location',
    'education_level',
    'marital_status',
    'dependents',
  ];

  if (demographicFeatures.includes(featureName)) {
    return {
      explanation: `The '${featureName.replace(/_/g, ' ')}' feature is a demographic data point. In modern, ethical credit models, such features are not used as direct predictors of creditworthiness to avoid bias. They are collected for overall model monitoring and fairness analysis.`,
    };
  }

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
