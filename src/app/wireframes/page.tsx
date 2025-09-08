import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WireframeBox = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`border-2 border-dashed border-gray-400 p-4 rounded-lg bg-gray-50/50 ${className}`}
  >
    <h3 className="text-sm font-semibold text-gray-600 mb-4 text-center">
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Placeholder = ({
  label,
  h = 'h-8',
  w = 'w-full',
}: {
  label: string;
  h?: string;
  w?: string;
}) => (
  <div
    className={`flex items-center justify-center bg-gray-200 rounded text-gray-500 text-xs ${h} ${w}`}
  >
    {label}
  </div>
);

export default function WireframesPage() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline text-gray-800">
          Application Wireframes
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Visual flow of the Credit ClearView application.
        </p>
        <Button asChild className="mt-4">
            <Link href="/">Back to App</Link>
        </Button>
      </div>

      <div className="space-y-12">
        {/* Flow 1: Single Prediction */}
        <div>
          <h2 className="text-2xl font-semibold font-headline mb-6 text-gray-700">
            1. Single Prediction Flow
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <WireframeBox title="Initial State: Input Form" className="w-full md:w-1/2">
              <div className="flex gap-2">
                <Placeholder label="Tab: Single Prediction" h="h-6" w="w-1/2" />
                <Placeholder label="Tab: Batch Prediction" h="h-6" w="w-1/2" />
              </div>
              <Placeholder label="Feature Group 1" h="h-20" />
              <Placeholder label="Feature Group 2" h="h-20" />
              <Placeholder label="[ ... More fields ... ]" h="h-10" />
              <div className="flex gap-2">
                <Placeholder label="Button: Generate Random" h="h-10" w="w-1/2" />
                <Placeholder label="Button: Get Prediction" h="h-10" w="w-1/2" />
              </div>
            </WireframeBox>

            <ArrowRight className="h-12 w-12 text-gray-400 shrink-0 rotate-90 md:rotate-0" />

            <WireframeBox title="Result State: Prediction Displayed" className="w-full md:w-1/2">
              <Placeholder label="[ Input Form remains above ]" h="h-10" />
              <Placeholder label="Result: Prediction Chart" h="h-40" />
              <Placeholder label="Result: AI Explanation" h="h-24" />
            </WireframeBox>
          </div>
        </div>

        {/* Flow 2: Batch Prediction */}
        <div>
          <h2 className="text-2xl font-semibold font-headline mb-6 text-gray-700">
            2. Batch Prediction Flow
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <WireframeBox title="Initial State: Upload" className="w-full md:w-1/2">
              <div className="flex gap-2">
                <Placeholder label="Tab: Single Prediction" h="h-6" w="w-1/2" />
                <Placeholder label="Tab: Batch Prediction" h="h-6" w="w-1/2" />
              </div>
              <Placeholder label="Button: Download Template" h="h-10" />
              <Placeholder label="Input: File Upload" h="h-10" />
              <Placeholder label="Button: Upload & Predict" h="h-10" />
            </WireframeBox>

             <ArrowRight className="h-12 w-12 text-gray-400 shrink-0 rotate-90 md:rotate-0" />

            <WireframeBox title="Result State: Results Table" className="w-full md:w-1/2">
                <Placeholder label="[ Upload UI remains above ]" h="h-10" />
                <Placeholder label="Table of Batch Results" h="h-48" />
            </WireframeBox>
          </div>
        </div>
        
        {/* Flow 3: Sidebar */}
        <div>
            <h2 className="text-2xl font-semibold font-headline mb-6 text-gray-700">3. Sidebar Details</h2>
            <div className="flex items-center justify-center">
                 <WireframeBox title="Sidebar: Model Information" className="w-full md:w-1/3">
                    <Placeholder label="Model Details" h="h-24" />
                    <Placeholder label="Performance Metrics" h="h-16" />
                    <Placeholder label="Button: Retrain Model" h="h-10" />
                 </WireframeBox>
            </div>
        </div>

      </div>
    </div>
  );
}
