# **App Name**: Credit ClearView

## Core Features:

- Single Prediction: Accepts a single partner feature object and returns model prediction and probabilities.
- Batch Prediction: Accepts an array of partner feature objects and returns an array of predictions, supports CSV upload/download.
- Model Retraining: Retrains the model using a local CSV file and saves the updated model artifacts.
- Input Form Rendering: Dynamically renders input forms based on available partner features with validation and type-specific UI components.
- Results Display: Clearly displays predicted class and class probabilities in a user-friendly format.
- Model Information: Displays essential model metadata, including algorithm, training date, and evaluation metrics. A tool can decide to include or exclude certain pieces of information in its output.
- CSV Template Download: Generates and allows downloading a CSV template with the required feature columns for batch prediction.

## Style Guidelines:

- Primary color: Deep sky blue (#3498db), evoking trust and stability, crucial for financial applications.
- Background color: Light gray (#ecf0f1), offering a clean, neutral backdrop that reduces visual strain.
- Accent color: Sea green (#2ecc71) for positive feedback and key actions, providing a sense of progress and reliability.
- Body text: 'PT Sans', a versatile and legible humanist sans-serif, is used for clarity and ease of reading, paired with 'Space Grotesk' as the headline font.
- Note: currently only Google Fonts are supported.
- Simple, consistent icons representing data categories to aid quick recognition and comprehension.
- Clean, intuitive layout emphasizing data clarity, separating inputs from results for ease of use.
- Subtle transition animations on data updates and form interactions for a smoother user experience.