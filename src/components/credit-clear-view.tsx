
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SinglePrediction } from '@/components/single-prediction';
import { WhatIfAnalysis } from '@/components/what-if-analysis';
import { FeatureExplorer } from '@/components/feature-explorer';

export function CreditClearView() {
  return (
    <Tabs defaultValue="single-prediction" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="single-prediction">Single Prediction</TabsTrigger>
        <TabsTrigger value="what-if-analysis">What-If Analysis</TabsTrigger>
        <TabsTrigger value="feature-explorer">Feature Explorer</TabsTrigger>
      </TabsList>
      <TabsContent value="single-prediction">
        <SinglePrediction />
      </TabsContent>
      <TabsContent value="what-if-analysis">
        <WhatIfAnalysis />
      </TabsContent>
      <TabsContent value="feature-explorer">
        <FeatureExplorer />
      </TabsContent>
    </Tabs>
  );
}
