
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FEATURES, featureGroups } from '@/lib/features';
import { predictionSchema, type PredictionInput } from '@/lib/schema';
import { Loader2, Zap } from 'lucide-react';
import { FeatureExplanation } from './feature-explanation';
import React from 'react';

type PredictionFormProps = {
  onSubmit: (data: PredictionInput) => Promise<void>;
  onClear: () => void;
  submitButtonText?: string;
};

const getRandomValue = (min: number, max: number, precision: number = 0) => {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(precision));
};

export function PredictionForm({ onSubmit, onClear, submitButtonText = "Get Score / Analysis" }: PredictionFormProps) {
  const defaultValues = FEATURES.reduce((acc, feature) => {
    acc[feature.name] = feature.defaultValue;
    return acc;
  }, {} as Record<string, any>);

  const form = useForm<PredictionInput>({
    resolver: zodResolver(predictionSchema),
    defaultValues,
    mode: 'onBlur'
  });

  const { isSubmitting } = form.formState;

  const handleGenerateRandomData = () => {
    const randomData: Record<string, any> = {};
    FEATURES.forEach(feature => {
      switch (feature.name) {
        case 'partner_id':
          randomData[feature.name] = `partner_${Math.floor(1000 + Math.random() * 9000)}`;
          break;
        case 'age':
          randomData[feature.name] = getRandomValue(18, 65);
          break;
        case 'dependents':
          randomData[feature.name] = getRandomValue(0, 5);
          break;
        case 'months_with_platform':
          randomData[feature.name] = getRandomValue(1, 60);
          break;
        case 'days_active':
            randomData[feature.name] = getRandomValue(1, 1000);
            break;
        case 'vehicle_age':
          randomData[feature.name] = getRandomValue(0, 15);
          break;
        case 'vehicle_maintenance_score':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'total_trips':
          randomData[feature.name] = getRandomValue(0, 5000);
          break;
        case 'total_orders':
          randomData[feature.name] = getRandomValue(0, 1000);
          break;
        case 'avg_rating':
          randomData[feature.name] = getRandomValue(1, 5, 1);
          break;
        case 'avg_speed':
          randomData[feature.name] = getRandomValue(20, 70, 1);
          break;
        case 'hard_braking_incidents':
          randomData[feature.name] = getRandomValue(0, 20);
          break;
        case 'late_arrivals':
          randomData[feature.name] = getRandomValue(0, 10);
          break;
        case 'cancellation_rate':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'base_monthly_income':
          randomData[feature.name] = getRandomValue(300, 2000);
          break;
        case 'monthly_earnings':
          randomData[feature.name] = getRandomValue(400, 3000);
          break;
        case 'income_volatility':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'earnings_std':
          randomData[feature.name] = getRandomValue(50, 500, 1);
          break;
        case 'earnings_cv':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'avg_order_value':
          randomData[feature.name] = getRandomValue(0, 50, 2);
          break;
        case 'on_time_payments':
          randomData[feature.name] = getRandomValue(0, 50);
          break;
        case 'payment_delay_days':
          randomData[feature.name] = getRandomValue(0, 30);
          break;
        case 'savings_rate':
          randomData[feature.name] = getRandomValue(0, 0.5, 2);
          break;
        case 'credit_utilization':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'credit_score':
          randomData[feature.name] = getRandomValue(300, 850);
          break;
        case 'income_to_volatility_ratio':
          randomData[feature.name] = getRandomValue(1, 10, 2);
          break;
        case 'financial_stability_score':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'avg_session_duration':
          randomData[feature.name] = getRandomValue(10, 120, 1);
          break;
        case 'avg_response_time':
          randomData[feature.name] = getRandomValue(1, 10, 1);
          break;
        case 'peak_hours_utilization':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'support_tickets':
          randomData[feature.name] = getRandomValue(0, 10);
          break;
        case 'resolution_time':
          randomData[feature.name] = getRandomValue(1, 48, 1);
          break;
        case 'referral_count':
          randomData[feature.name] = getRandomValue(0, 10);
          break;
        case 'app_opens_per_day':
          randomData[feature.name] = getRandomValue(1, 20, 1);
          break;
        case 'notification_response_rate':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'platform_efficiency':
          randomData[feature.name] = getRandomValue(0, 1, 2);
          break;
        case 'has_credit':
          randomData[feature.name] = Math.random() > 0.5;
          break;
        case 'gender':
        case 'location':
        case 'education_level':
        case 'marital_status':
        case 'partner_type':
          if (feature.options) {
            randomData[feature.name] = feature.options[Math.floor(Math.random() * feature.options.length)];
          }
          break;
        default:
          break;
      }
    });
    form.reset(randomData);
    onClear();
  };

  const handleFormSubmit = form.handleSubmit(async (data: PredictionInput) => {
    await onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Partner Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featureGroups.map((group) => (
                <div key={group} className="space-y-4 rounded-lg border p-4">
                  <h3 className="font-medium text-lg">{group}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FEATURES.filter((f) => f.group === group).map((feature) => (
                      <FormField
                        key={feature.name}
                        control={form.control}
                        name={feature.name as any}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormLabel>{feature.label}</FormLabel>
                              <FeatureExplanation featureName={feature.name} />
                            </div>
                            <FormControl>
                              {feature.type === 'numeric' ? (
                                <Input
                                  type="number"
                                  step="any"
                                  placeholder={feature.placeholder}
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  value={field.value ?? ''}
                                />
                              ) : feature.type === 'categorical' ? (
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={`Select ${feature.label}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {feature.options?.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : feature.type === 'boolean' ? (
                                <div className="flex items-center space-x-2 h-10">
                                   <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </div>
                              ) : (
                                <Input
                                  placeholder={feature.placeholder}
                                  {...field}
                                  value={field.value ?? ''}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-4">
          <Button type="button" variant="outline" className="w-full" onClick={handleGenerateRandomData}>
            <Zap className="mr-2 h-4 w-4" />
            Generate Random Data
          </Button>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
