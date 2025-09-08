'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Info, Loader2 } from 'lucide-react';
import { getFeatureExplanationAction } from '@/app/actions';

type FeatureExplanationProps = {
  featureName: string;
};

export function FeatureExplanation({ featureName }: FeatureExplanationProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchExplanation = useCallback(async () => {
    if (!explanation && !isLoading) {
      setIsLoading(true);
      try {
        const result = await getFeatureExplanationAction(featureName);
        setExplanation(result.explanation);
      } catch (error) {
        setExplanation('Failed to load explanation.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [featureName, explanation, isLoading]);

  useEffect(() => {
    if (isOpen) {
      fetchExplanation();
    }
  }, [isOpen, fetchExplanation]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="cursor-pointer text-muted-foreground hover:text-primary">
          <Info className="h-4 w-4" />
          <span className="sr-only">About {featureName}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none capitalize">
            {featureName.replace(/_/g, ' ')}
          </h4>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{explanation}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
