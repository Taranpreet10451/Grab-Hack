'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { ModelInfo } from '@/components/model-info';
import { Header } from '@/components/layout/header';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <SidebarProvider
      defaultOpen={isClient ? !isMobile : true}
    >
      <Sidebar
        variant="inset"
        className={cn(
          'bg-card border-r transition-all duration-300 ease-in-out'
        )}
      >
        <SidebarHeader className="p-4">
          <h2 className="font-headline text-lg font-semibold">Model Details</h2>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <ModelInfo />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Credit ClearView
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
