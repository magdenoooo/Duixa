"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function AppProvider({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchInterval: false,
        refetchOnMount: false,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
