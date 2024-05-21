import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/features/store';
import { Next13ProgressBar } from 'next13-progressbar';
import { TooltipProvider } from '@/components/ui/tooltip';
// import { Next13ProgressBar } from 'next13-progressbar';

interface ProvidersProps {
  children: any;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <TooltipProvider>
        <Provider store={store}>{children}</Provider>
        <Next13ProgressBar
          height='4px'
          color='blue'
          options={{ showSpinner: true }}
          showOnShallow
        />
      </TooltipProvider>
    </>
  );
}
