
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, Loader2, Upload } from 'lucide-react';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { getBatchPredictionsAction, type PredictionResult } from '@/app/actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { FEATURES } from '@/lib/features';

type BatchResult = PredictionResult & { partnerId?: string };

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

export function BatchPrediction() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BatchResult[]>([]);
  const { toast } = useToast();

  const handleDownloadTemplate = () => {
    const header = FEATURES.map((f) => f.name).join(',');
    const blob = new Blob([header], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'prediction_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a CSV file to upload.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResults([]);

    const reader = new FileReader();
    
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const csvData = event.target?.result as string;
      if (!csvData) {
        toast({
          title: 'File Read Error',
          description: 'Could not read the file content.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      try {
        const batchResults = await getBatchPredictionsAction(csvData);
        setResults(batchResults);
        
        if (batchResults.length > 0) {
          toast({
            title: 'Batch prediction complete',
            description: `Processed ${batchResults.length} records.`,
          });
        } else {
          toast({
            title: 'No valid records found',
            description: 'The CSV file might be empty or formatted incorrectly. Please check the file and try again.',
            variant: 'destructive',
          });
        }
      } catch (error: any) {
        toast({
          title: 'An error occurred',
          description: error.message || 'Failed to process batch predictions.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      toast({
        title: 'File Read Error',
        description: 'There was an error reading the file.',
        variant: 'destructive',
      });
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Batch Credit Scoring</CardTitle>
          <CardDescription>
            Upload a CSV file with partner data to get predictions in bulk.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleDownloadTemplate} variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2" />
              Download CSV Template
            </Button>
            <div className="flex-1 grid w-full max-w-sm items-center gap-1.5">
              <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            <Button onClick={handleUpload} disabled={isLoading || !file} className="w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <Upload className="mr-2" />
              )}
              Upload and Predict
            </Button>
          </div>
          {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Batch Results</CardTitle>
            <CardDescription>
              Showing predictions for {results.length} partners.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner ID</TableHead>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Top Probability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((res, index) => (
                    <TableRow key={res.partnerId || index}>
                      <TableCell className="font-medium">{res.partnerId || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(res.prediction)}>
                          {res.prediction}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {`${(Math.max(...Object.values(res.probabilities)) * 100).toFixed(1)}%`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
