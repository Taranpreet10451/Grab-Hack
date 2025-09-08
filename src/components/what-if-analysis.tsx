
'use client';

import { useState, useMemo } from 'react';
import { PredictionForm } from '@/components/prediction-form';
import { ResultsDisplay } from '@/components/results-display';
import {
  getPredictionAction,
  getWhatIfAnalysisAction,
  type PredictionResult,
  type WhatIfAnalysisResult,
} from '@/app/actions';
import type { PredictionInput } from '@/lib/schema';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Lightbulb } from 'lucide-react';

const getBadgeVariant = (prediction: string) => {
  switch (prediction) {
    case 'Excellent':
      return 'default';
    case 'Good':
      return 'secondary';
    case 'Fair':
      return 'outline';
    case 'Poor':
    case 'Very Poor':
      return 'destructive';
    default:
      return 'default';
  }
};


export function WhatIfAnalysis() {
  const [baseResult, setBaseResult] = useState<PredictionResult | null>(null);
  const [whatIfResult, setWhatIfResult] = useState<WhatIfAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [baseData, setBaseData] = useState<PredictionInput | null>(null);

  // State for sliders
  const [monthlyEarnings, setMonthlyEarnings] = useState<number | undefined>();
  const [creditUtilization, setCreditUtilization] = useState<number | undefined>();
  const [savingsRate, setSavingsRate] = useState<number | undefined>();

  const handleGetBasePrediction = async (data: PredictionInput) => {
    setIsLoading(true);
    setBaseResult(null);
    setWhatIfResult(null);
    const result = await getPredictionAction(data);
    setBaseResult(result);
    setBaseData(data);
    
    // Initialize sliders
    setMonthlyEarnings(data.monthly_earnings);
    setCreditUtilization(data.credit_utilization);
    setSavingsRate(data.savings_rate);
    
    setIsLoading(false);
  };

  const handleClear = () => {
    setBaseResult(null);
    setWhatIfResult(null);
    setBaseData(null);
  };

  const handleWhatIfChange = useMemo(
    () => async (newData: Partial<PredictionInput>) => {
      if (!baseData) return;

      const updatedData = { ...baseData, ...newData };
      
      const result = await getWhatIfAnalysisAction({
          originalData: baseData,
          newData: updatedData
      });
      setWhatIfResult(result);
    },
    [baseData]
  );
  
  return (
    <div className="space-y-8">
      <PredictionForm
        onSubmit={handleGetBasePrediction}
        onClear={handleClear}
        submitButtonText="Get Baseline Score"
      />

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      )}
      
      {baseResult && baseData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
                <h2 className="text-2xl font-bold mb-4 font-headline text-center">Baseline Result</h2>
                <ResultsDisplay result={baseResult} />
            </div>
             <div>
                <h2 className="text-2xl font-bold mb-4 font-headline text-center">What-If Simulation</h2>
                 <Card>
                    <CardHeader>
                        <CardTitle>Interactive Adjustments</CardTitle>
                        <CardDescription>
                            Use the sliders to see how changes might affect the credit score.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="monthly_earnings_slider">Monthly Earnings: ${monthlyEarnings?.toFixed(2)}</Label>
                            <Slider
                                id="monthly_earnings_slider"
                                value={[monthlyEarnings || 0]}
                                min={0}
                                max={5000}
                                step={100}
                                onValueChange={(value) => setMonthlyEarnings(value[0])}
                                onValueCommit={(value) => handleWhatIfChange({ monthly_earnings: value[0] })}
                            />
                        </div>
                         <div className="space-y-3">
                            <Label htmlFor="credit_utilization_slider">Credit Utilization: {(creditUtilization! * 100).toFixed(0)}%</Label>
                            <Slider
                                id="credit_utilization_slider"
                                value={[creditUtilization || 0]}
                                min={0}
                                max={1}
                                step={0.01}
                                onValueChange={(value) => setCreditUtilization(value[0])}
                                onValueCommit={(value) => handleWhatIfChange({ credit_utilization: value[0] })}
                            />
                        </div>
                         <div className="space-y-3">
                            <Label htmlFor="savings_rate_slider">Savings Rate: {(savingsRate! * 100).toFixed(0)}%</Label>
                            <Slider
                                id="savings_rate_slider"
                                value={[savingsRate || 0]}
                                min={0}
                                max={0.5}
                                step={0.01}
                                onValueChange={(value) => setSavingsRate(value[0])}
                                onValueCommit={(value) => handleWhatIfChange({ savings_rate: value[0] })}
                            />
                        </div>
                    </CardContent>
                 </Card>
                 
                {whatIfResult && (
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                New Predicted Score
                                <Badge variant={getBadgeVariant(whatIfResult.newPrediction)} className="text-lg">
                                {whatIfResult.newPrediction}
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                This is the potential outcome based on your adjustments.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <Lightbulb className="h-5 w-5 text-accent mt-1 shrink-0" />
                                <p className="text-sm leading-relaxed">{whatIfResult.changeAnalysis}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

             </div>
        </div>
      )}
    </div>
  );
}
