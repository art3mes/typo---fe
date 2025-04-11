import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client';
import '../globals.css'
import Home from '../src/pages/Home'
import { AppSettingsProvider } from './providers/appSettings.provider';
import { TooltipProvider } from './components/ui/tooltip';
import { EngineProvider } from './providers/engineProvider';

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} >
    <AppSettingsProvider />
    <TooltipProvider delayDuration={100} >
      <Home />
      <EngineProvider />
    </TooltipProvider>
  </QueryClientProvider>
);
