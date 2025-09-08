'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Bot, Calendar, Cpu, Loader2, RefreshCw } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { retrainModelAction } from '@/app/actions';
import { useEffect, useActionState, useState } from 'react';

function RetrainButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <RefreshCw />
      )}
      <span>{pending ? 'Retraining...' : 'Retrain Model'}</span>
    </Button>
  );
}

export function ModelInfo() {
  const [state, formAction] = useActionState(retrainModelAction, null);
  const { toast } = useToast();
  const [lastTrained, setLastTrained] = useState('');

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Success',
        description: state.message,
        variant: 'default',
      });
    }
  }, [state, toast]);

  useEffect(() => {
    // This ensures the date is only rendered on the client, avoiding hydration errors.
    setLastTrained(new Date().toLocaleDateString());
  }, []);

  const modelDetails = [
    {
      icon: Bot,
      label: 'Algorithm',
      value: 'Deep Neural Network',
    },
    {
      icon: Calendar,
      label: 'Last Trained',
      value: lastTrained,
    },
    {
      icon: Cpu,
      label: 'Platform',
      value: 'Next.js Server',
    },
  ];

  const modelMetrics = [
    { label: 'Accuracy', value: '98.5%' },
    { label: 'Macro F1-Score', value: '0.98' },
  ];

  return (
    <div className="space-y-6 px-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          {modelDetails.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <item.icon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value || '...'}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground px-2">
          Performance Metrics
        </h3>
        <Card>
          <CardContent className="p-4 space-y-2">
            {modelMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground">{metric.label}</p>
                <p className="font-medium">{metric.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator />

      <form action={formAction} className="px-2">
        <RetrainButton />
      </form>
    </div>
  );
}
