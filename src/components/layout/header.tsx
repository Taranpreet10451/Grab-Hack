'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-semibold font-headline tracking-tight">
          Credit ClearView
        </h1>
      </div>
    </header>
  );
}
