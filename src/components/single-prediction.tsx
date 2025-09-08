'use client';

import { useState } from 'react';
import { PredictionForm } from '@/components/prediction-form';
import { ResultsDisplay } from '@/components/results-display';
import type { PredictionResult } from '@/app/actions';
import { Skeleton } from './ui/skeleton';

export function SinglePrediction() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediction = (predictionResult: PredictionResult) => {
    setResult(predictionResult);
    setIsLoading(false);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
    if(loading) {
      setResult(null);
    }
  };

  return (
    <div className="space-y-8">
      <PredictionForm onPredict={handlePrediction} onLoading={handleLoading} />
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
