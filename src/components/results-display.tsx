'use client';

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import type { PredictionResult } from '@/app/actions';
import { Lightbulb } from 'lucide-react';

type ResultsDisplayProps = {
  result: PredictionResult;
};

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

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { prediction, probabilities, explanation } = result;

  const chartData = Object.entries(probabilities)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Prediction Result
            <Badge variant={getBadgeVariant(prediction)} className="text-lg">
              {prediction}
            </Badge>
          </CardTitle>
          <CardDescription>
            The model predicts the creditworthiness of the partner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                  formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Probability']}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="value"
                    position="top"
                    formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                    className="fill-foreground text-xs"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-accent" />
            AI-Powered Explanation
          </CardTitle>
          <CardDescription>
            Factors influencing this credit score prediction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{explanation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
