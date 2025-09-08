
'use client';

import { useState } from 'react';
import { PredictionForm } from '@/components/prediction-form';
import { ResultsDisplay } from '@/components/results-display';
import { getPredictionAction, type PredictionResult } from '@/app/actions';
import { Skeleton } from './ui/skeleton';
import { PredictionInput } from '@/lib/schema';

export function SinglePrediction() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = async (data: PredictionInput) => {
    setIsLoading(true);
    const predictionResult = await getPredictionAction(data);
    setResult(predictionResult);
    setIsLoading(false);
  };

  const handleClear = () => {
    setResult(null);
  }

  return (
    <div className="space-y-8">
      <PredictionForm 
        onSubmit={handlePrediction} 
        onClear={handleClear}
        submitButtonText="Get Score"
      />
      <div>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : (
          result && result.prediction && <ResultsDisplay result={result} />
        )}
      </div>
    </div>
  );
}
