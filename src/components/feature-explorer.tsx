
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { featureGroups, FEATURES } from '@/lib/features';
import { FeatureExplanation } from './feature-explanation';

export function FeatureExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Explorer</CardTitle>
        <CardDescription>
          Click on any feature to learn more about what it is, how it affects credit risk, and how a partner can improve it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {featureGroups.map((group) => (
            <AccordionItem key={group} value={group}>
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                {group}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {FEATURES.filter((f) => f.group === group).map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <span className="font-mono text-sm">{feature.label}</span>
                      <FeatureExplanation featureName={feature.name} />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

