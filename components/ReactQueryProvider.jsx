"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: (failureCount, error) => {
          // لا تعيد المحاولة للأخطاء 404
          if (error?.status === 404) return false;
          // أعد المحاولة حتى 3 مرات للأخطاء الأخرى
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        // إضافة error handling محسن
        onError: (error) => {
          console.error('React Query Error:', error);
        },
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
        onError: (error) => {
          console.error('React Query Mutation Error:', error);
        },
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools 
        initialIsOpen={false} 
        buttonPosition="bottom-left"
        position="bottom"
      />
    </QueryClientProvider>
  );
}