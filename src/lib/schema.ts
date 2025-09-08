
import { z } from 'zod';
import { FEATURES, type Feature } from './features';

const schemaObject = FEATURES.reduce(
  (acc, feature: Feature) => {
    let fieldSchema;

    switch (feature.type) {
      case 'identifier':
        // partner_id is optional as it's not needed for prediction itself.
        acc[feature.name] = z.string().optional();
        return acc;
      
      case 'numeric':
        // Coerce to a number, but allow it to be null if the input is empty or null.
        // This is critical for CSV parsing where optional fields can be blank.
        fieldSchema = z.coerce.number().nullable();
        break;

      case 'categorical':
        fieldSchema = z.enum(feature.options as [string, ...string[]], {
          errorMap: () => ({ message: 'Please select an option.' }),
        });
        break;

      case 'boolean':
        // The action will handle string-to-boolean conversion.
        // The schema expects a proper boolean or null for empty values.
        fieldSchema = z.boolean().nullable();
        break;

      default:
        fieldSchema = z.string();
    }
    
    acc[feature.name] = fieldSchema;

    return acc;
  },
  {} as Record<string, z.ZodType<any, any>>
);

export const predictionSchema = z.object(schemaObject);
export type PredictionInput = z.infer<typeof predictionSchema>;
