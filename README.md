# Credit ClearView

Credit ClearView is an advanced, AI-powered credit risk assessment tool specifically designed for the gig economy. It provides a more equitable and accurate method for evaluating the financial health of non-traditional earners by analyzing alternative data points beyond traditional credit history.

## Key Features

- **AI-Powered Predictions**: Leverages a simulated Deep Neural Network via Google's Gemini model to provide nuanced credit score predictions (Excellent, Good, Fair, Poor, Very Poor).
- **Explainable AI (XAI)**: For each prediction, the system generates a human-readable explanation, detailing the key factors that influenced the outcome.
- **Single Prediction Mode**: An interactive form allows for on-demand credit assessment of a single individual by inputting various data points.
- **Batch Prediction Mode**: Supports bulk processing by uploading a CSV file of partner data, returning a table of predictions for all valid records.
- **Dynamic & Responsive UI**: Built with Next.js, Shadcn/UI, and Tailwind CSS for a modern, clean, and responsive user experience on all devices.
- **Simulated Model Retraining**: A feature to simulate the process of retraining the AI model, demonstrating a complete MLOps lifecycle.

## Technology Stack

This project is built with a modern, type-safe, and performant technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **AI/Generative Backend**: [Genkit AI Framework](https://firebase.google.com/docs/genkit) with [Google's Gemini Model](https://ai.google.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/) or another package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project and add your Google AI API key:
   ```
   GEMINI_API_KEY=YOUR_API_KEY_HERE
   ```
   You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Development Server

To run the application in development mode, you need to start both the Next.js frontend and the Genkit AI server.

1. **Start the Genkit AI development server**:
   This command watches for changes in your AI flows.
   ```bash
   npm run genkit:watch
   ```

2. **Start the Next.js development server**:
   In a separate terminal, run:
   ```bash
   npm run dev
   ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the application.

## Project Structure

- `src/app/`: Contains the main pages and layouts of the Next.js application.
- `src/components/`: Shared React components, including UI components from Shadcn.
- `src/ai/`: Home for all AI-related code.
  - `src/ai/flows/`: Genkit flows that define the AI logic for prediction and explanation.
  - `src/ai/genkit.ts`: Genkit configuration.
- `src/lib/`: Contains utility functions, data schemas (`zod`), and feature definitions.
- `src/app/actions.ts`: Next.js Server Actions that connect the frontend to the AI flows.
