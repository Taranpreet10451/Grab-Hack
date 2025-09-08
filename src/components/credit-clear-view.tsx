'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SinglePrediction } from '@/components/single-prediction';
import { BatchPrediction } from '@/components/batch-prediction';
import { LayoutGrid, LineChart, Presentation } from 'lucide-react';
import Link from 'next/link';

export function CreditClearView() {
  return (
    <Tabs defaultValue="single" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="single">
          <LineChart className="mr-2" />
          Single Prediction
        </TabsTrigger>
        <TabsTrigger value="batch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="M4 15h16" />
            <path d="M4 18h16" />
            <path d="M4 8h16" />
            <path d="M4 5h16" />
            <path d="m14 11-3 3-3-3" />
            <path d="M11 14V2" />
          </svg>
          Batch Prediction
        </TabsTrigger>
      </TabsList>
      <TabsContent value="single" className="mt-6">
        <SinglePrediction />
      </TabsContent>
      <TabsContent value="batch" className="mt-6">
        <BatchPrediction />
      </TabsContent>
    </Tabs>
  );
}
