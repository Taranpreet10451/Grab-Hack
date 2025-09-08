import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { PT_Sans, Space_Grotesk } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Credit ClearView',
  description: 'An AI-powered credit scoring analysis tool.',
};

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased min-h-screen', ptSans.variable, spaceGrotesk.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
